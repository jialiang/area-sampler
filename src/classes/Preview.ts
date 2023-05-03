import Color from "./Color.ts";
import { debounce, toast, isNil } from "./Util.ts";

export default class Preview {
  readonly preview: HTMLCanvasElement;
  readonly uploader: HTMLInputElement;

  private internalCanvas: OffscreenCanvas;
  private internalContext: OffscreenCanvasRenderingContext2D;

  private context: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private imageValues: Uint8ClampedArray | undefined;
  private colors: Promise<{ r: number; g: number; b: number; a: number }[]> | undefined;

  private loadingToast: (() => void) | undefined;

  private opacity: number | undefined;
  private backgroundColor: Color | undefined;

  constructor(previewElement: HTMLCanvasElement, uploaderElement: HTMLInputElement) {
    const image = new Image();

    image.addEventListener("load", () => {
      delete this.imageValues;
      this.handleUpdateImage();
    });

    uploaderElement.addEventListener("change", this.handleReadUpload);

    this.preview = previewElement;
    this.uploader = uploaderElement;

    const context = previewElement.getContext("2d");
    if (!context) throw "Failed to get 2D context from canvas element.";

    this.context = context;
    this.image = image;

    const internalCanvas = new OffscreenCanvas(0, 0);
    const internalContext = internalCanvas.getContext("2d");

    if (!internalContext) throw "Failed to get 2D context from offscreen canvas.";

    this.internalCanvas = internalCanvas;
    this.internalContext = internalContext;
  }

  handleReadUpload = () => {
    const { uploader, image } = this;

    this.loadingToast = toast("Loading selected image...", true);

    if (!uploader.files) throw "Asked to read image file but found no file was uploaded.";

    image.src = URL.createObjectURL(uploader.files[0]);
  };

  _handleUpdateImage = debounce((resolve) => {
    const { preview, context, internalCanvas, internalContext, image } = this;
    const { opacity, backgroundColor } = this;

    let { width, height } = image;

    width = width || 300;
    height = height || 200;

    width = preview.width = internalCanvas.width = width || 300;
    height = preview.height = internalCanvas.height = height || 200;

    const done = (imageData?: Uint8ClampedArray) => {
      const { loadingToast } = this;

      if (loadingToast) loadingToast();

      delete this.loadingToast;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const _imageData = imageData || context.getImageData(0, 0, width, height).data;
          const colors = [];

          for (let i = 0; i < _imageData.length; i += 4) {
            const r = _imageData[i + 0];
            const g = _imageData[i + 1];
            const b = _imageData[i + 2];
            const a = _imageData[i + 3];

            colors.push({ r, g, b, a });
          }

          resolve(colors);
        });
      });
    };

    context.clearRect(0, 0, width, height);

    if (!this.imageValues || (isNil(opacity) && isNil(backgroundColor))) {
      context.drawImage(image, 0, 0);
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
        context.drawImage(image, 0, 0);
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

    this.image.src = "./example.png";
  };

  getColorsAt = async (startX: number, startY: number, width: number, height: number) => {
    const { preview } = this;

    if (!this.colors) return [];

    let colors;
    let resolvedColors = [] as { r: number; g: number; b: number; a: number }[];

    while (colors !== this.colors) {
      colors = this.colors;
      resolvedColors = await colors;
    }

    const targetColors = [];

    for (let y = startY; y < startY + height; y++) {
      for (let x = startX; x < startX + width; x++) {
        const i = y * preview.width + x;

        if (i < 0 || i > resolvedColors.length) continue;

        targetColors.push(resolvedColors[i]);
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
