import Color from "./Color.ts";
import { debounce, toast } from "./Util.ts";

export default class Preview {
  readonly preview: HTMLCanvasElement;
  readonly uploader: HTMLInputElement;

  private context: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private colors: Promise<{ r: number; g: number; b: number; a: number }[]> | [];

  private loadingToast: (() => void) | undefined;

  private opacity: number | undefined;
  private backgroundColor: Color | undefined;

  constructor(previewElement: HTMLCanvasElement, uploaderElement: HTMLInputElement) {
    const image = new Image();
    image.addEventListener("load", this.handleUpdateImage);

    uploaderElement.addEventListener("change", this.handleReadUpload);

    this.preview = previewElement;
    this.uploader = uploaderElement;

    const context = previewElement.getContext("2d");
    if (!context) throw "Failed to get 2D context from canvas element.";

    this.context = context;
    this.image = image;
    this.colors = [];
  }

  handleReadUpload = () => {
    const { uploader, image } = this;

    this.loadingToast = toast("Loading selected image...", true);

    if (!uploader.files) throw "Asked to read image file but found no file was uploaded.";

    image.src = URL.createObjectURL(uploader.files[0]);
  };

  _handleUpdateImage = debounce((resolve) => {
    const { preview, context, image, loadingToast, opacity, backgroundColor } = this;
    let { width, height } = image;

    width = width || 300;
    height = height || 200;

    const done = (imageData: Uint8ClampedArray) => {
      if (loadingToast) loadingToast();

      delete this.loadingToast;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const colors = [];

          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i + 0];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];

            colors.push({ r, g, b, a });
          }

          resolve(colors);
        });
      });
    };

    preview.width = width;
    preview.height = height;

    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, width, height);
    const values = imageData.data;

    if (opacity == null && backgroundColor == null) return done(values);

    // Handle Opacity

    if (opacity != null) {
      for (let i = 0; i < values.length; i += 4) values[i + 3] *= opacity;

      context.putImageData(imageData, 0, 0);

      if (!backgroundColor) return done(values);
    }

    // Handle Background Color

    if (backgroundColor != null) {
      const offscreenCanvas = new OffscreenCanvas(width, height);
      const offscreenContext = offscreenCanvas.getContext("2d");

      if (!offscreenContext) throw "Failed to get 2D context of offscreen canvas.";

      offscreenContext.fillStyle = backgroundColor.toRgba();
      offscreenContext.fillRect(0, 0, width, height);
      offscreenContext.drawImage(preview, 0, 0);

      context.drawImage(offscreenCanvas, 0, 0);

      return done(context.getImageData(0, 0, width, height).data);
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
