import Color from "./Color.ts";
import { debounce, toast, isNil } from "./Util.ts";

export default class Preview {
  readonly preview: HTMLCanvasElement;
  readonly uploader: HTMLInputElement;

  private internalCanvas: OffscreenCanvas;
  private internalContext: OffscreenCanvasRenderingContext2D;

  private context: CanvasRenderingContext2D;
  private imageBitmap: ImageBitmap | undefined;
  private imageValues: Uint8ClampedArray | undefined;
  private colors: Promise<Uint8ClampedArray> | undefined;

  private loadingToast: (() => void) | undefined;

  private opacity: number | undefined;
  private backgroundColor: Color | undefined;

  constructor(previewElement: HTMLCanvasElement, uploaderElement: HTMLInputElement) {
    uploaderElement.addEventListener("change", () => {
      const { uploader } = this;

      if (!uploader.files) return;

      this.loadingToast = toast("Loading selected image...", true);
      this.handleReadUpload(uploader.files[0]);
    });

    this.preview = previewElement;
    this.uploader = uploaderElement;

    const context = previewElement.getContext("2d");
    if (!context) throw "Failed to get 2D context from canvas element.";

    this.context = context;

    const internalCanvas = new OffscreenCanvas(0, 0);
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
      .catch(() => {
        const { loadingToast } = this;

        if (loadingToast) loadingToast();

        delete this.loadingToast;

        toast("Unable to load selected file");
      });
  };

  _handleUpdateImage = debounce((resolve) => {
    const { preview, context, internalCanvas, internalContext, imageBitmap } = this;
    const { opacity, backgroundColor } = this;

    if (!imageBitmap) return;

    let { width, height } = imageBitmap;

    width = width || 300;
    height = height || 200;

    width = preview.width = internalCanvas.width = width || 300;
    height = preview.height = internalCanvas.height = height || 200;

    const done = (colors?: Uint8ClampedArray) => {
      const { loadingToast } = this;

      if (loadingToast) loadingToast();

      delete this.loadingToast;

      resolve(colors || context.getImageData(0, 0, width, height).data);
    };

    context.clearRect(0, 0, width, height);

    if (!this.imageValues || (isNil(opacity) && isNil(backgroundColor))) {
      context.drawImage(imageBitmap, 0, 0);
    }

    if (!this.imageValues) this.imageValues = context.getImageData(0, 0, width, height).data;

    if (isNil(opacity) && isNil(backgroundColor)) return done(this.imageValues);

    const _imageValues = new Uint8ClampedArray(this.imageValues);

    if (!isNil(opacity)) {
      for (let i = 0; i < _imageValues.length; i += 4) _imageValues[i + 3] *= opacity;

      if (isNil(backgroundColor)) {
        context.putImageData(new ImageData(_imageValues, width), 0, 0);
        return done(_imageValues);
      }
    }

    if (!isNil(backgroundColor)) {
      context.fillStyle = (backgroundColor as Color).toRgba();
      context.fillRect(0, 0, width, height);

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

    image.onload = () => {
      this.handleReadUpload(image);
    };

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

    const targetColors = [];

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

  setBackgroundColor = (color: Color) => {
    if (color.a === 0) delete this.backgroundColor;
    else this.backgroundColor = color;

    this.handleUpdateImage();
  };

  setOpacity = (opacity: number) => {
    if (opacity === 1) delete this.opacity;
    else this.opacity = opacity;

    this.handleUpdateImage();
  };
}
