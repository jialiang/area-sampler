import { SimpleColor } from "./Color";
import { debounce, toast, isNil } from "./Util";

export default class Preview {
  readonly preview: HTMLCanvasElement;
  readonly uploader: HTMLInputElement;

  private internalCanvas: OffscreenCanvas | HTMLCanvasElement;
  private internalContext: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

  private context: CanvasRenderingContext2D;
  private imageBitmap: ImageBitmap | undefined;
  private imageValues: Uint8ClampedArray | undefined;
  private colors: Promise<Uint8ClampedArray> | undefined;

  private loadingToast: (() => void) | undefined;

  private opacity: number | undefined;
  private backgroundColor: string | undefined;

  constructor(previewElement: HTMLCanvasElement, uploaderElement: HTMLInputElement) {
    uploaderElement.addEventListener("change", () => {
      const { uploader } = this;

      if (!uploader.files) return;

      this.loadingToast = toast("Loading selected image...", true);
      this.handleReadUpload(uploader.files[0]);
    });

    previewElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    previewElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (!e.dataTransfer) return;

      this.loadingToast = toast("Loading selected image...", true);
      this.handleReadUpload(e.dataTransfer.files[0]);
    });

    this.preview = previewElement;
    this.uploader = uploaderElement;

    const context = previewElement.getContext("2d");
    if (!context) throw "Failed to get 2D context from canvas element.";

    this.context = context;

    const internalCanvas =
      typeof OffscreenCanvas !== "undefined"
        ? new OffscreenCanvas(0, 0)
        : document.createElement("canvas");

    const internalContext = internalCanvas.getContext("2d");

    if (!internalContext) throw "Failed to get 2D context from offscreen canvas.";

    this.internalCanvas = internalCanvas;
    this.internalContext = internalContext;
  }

  handleReadUpload = (image: File | HTMLImageElement) => {
    createImageBitmap(image)
      .then((bitmap) => {
        this.imageBitmap = bitmap;
        delete this.imageValues;
        this.handleUpdateImage();
      })
      .catch((e) => {
        const { loadingToast } = this;

        if (loadingToast) loadingToast();

        delete this.loadingToast;

        toast("Unable to load selected file");
        console.error(e, "\nAttempting to read the image:\n\n", image);
      });
  };

  _handleUpdateImage = debounce((resolve) => {
    const { preview, context, internalCanvas, internalContext, imageBitmap } = this;
    const { opacity, backgroundColor } = this;

    let width = 300;
    let height = 200;

    if (imageBitmap) {
      width = imageBitmap.width;
      height = imageBitmap.height;
    }

    preview.width = internalCanvas.width = width;
    preview.height = internalCanvas.height = height;

    // Always called before exit
    const done = (colors?: Uint8ClampedArray) => {
      const { loadingToast } = this;

      if (loadingToast) loadingToast();

      delete this.loadingToast;

      resolve(colors || context.getImageData(0, 0, width, height).data);
    };

    const setBackgroundColor = () => {
      if (backgroundColor) {
        context.fillStyle = "rgba(0, 0, 0, 0)";
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
      }
    };

    context.clearRect(0, 0, width, height);

    // If no image, just set background color if any and return
    if (!imageBitmap) return setBackgroundColor(), done();

    // If no imageValues, draw first so we can get imageValue from it
    // If no processing, draw and done
    if (!this.imageValues || (isNil(opacity) && isNil(backgroundColor))) {
      context.drawImage(imageBitmap, 0, 0);
    }

    if (!this.imageValues) this.imageValues = context.getImageData(0, 0, width, height).data;

    if (isNil(opacity) && isNil(backgroundColor)) return done(this.imageValues);

    // Clone imageValue, don't want to manipulate the original
    const _imageValues = new Uint8ClampedArray(this.imageValues);

    // Set opacity
    if (!isNil(opacity)) {
      for (let i = 0; i < _imageValues.length; i += 4) _imageValues[i + 3] *= opacity;

      if (isNil(backgroundColor)) {
        context.putImageData(new ImageData(_imageValues, width), 0, 0);
        return done(_imageValues);
      }
    }

    // Set background color
    if (!isNil(backgroundColor)) {
      setBackgroundColor();

      if (isNil(opacity)) {
        context.drawImage(imageBitmap, 0, 0);
        return done();
      }

      internalContext.clearRect(0, 0, width, height);
      internalContext.putImageData(new ImageData(_imageValues, width), 0, 0);
      context.drawImage(internalCanvas, 0, 0);
      return done();
    }
  });

  handleUpdateImage = () => {
    this.colors = new Promise((resolve) => {
      this._handleUpdateImage(resolve);
    });
  };

  loadExampleImage = () => {
    this.loadingToast = toast("Loading example image...", true);

    const image = new Image();

    image.addEventListener("load", () => {
      this.handleReadUpload(image);
    });

    image.addEventListener("error", () => {
      this.handleReadUpload(image);
    });

    image.src = "./example.png";
  };

  getColorsAt = async (startX: number, startY: number, width: number, height: number) => {
    const { preview } = this;

    if (!this.colors) return [];

    let colors;
    let resolvedColors = [] as Uint8ClampedArray | [];

    while (colors !== this.colors) {
      colors = this.colors;
      resolvedColors = await colors;
    }

    const targetColors = [] as SimpleColor[];

    for (let y = startY; y < startY + height; y++) {
      for (let x = startX; x < startX + width; x++) {
        const i = (y * preview.width + x) * 4;

        if (i < 0 || i + 4 > resolvedColors.length) continue;

        targetColors.push({
          r: resolvedColors[i + 0],
          g: resolvedColors[i + 1],
          b: resolvedColors[i + 2],
          a: resolvedColors[i + 3],
        });
      }
    }

    return targetColors;
  };

  setBackgroundColor = (color: string) => {
    if (!color) delete this.backgroundColor;
    else this.backgroundColor = color;

    this.handleUpdateImage();
  };

  setOpacity = (opacity: number) => {
    if (opacity === 1) delete this.opacity;
    else this.opacity = opacity;

    this.handleUpdateImage();
  };
}
