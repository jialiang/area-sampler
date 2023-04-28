import Color from "./Color";
import { clamp } from "./Util";

export default class Preview {
  readonly preview: HTMLCanvasElement;
  readonly uploader: HTMLInputElement;

  private context: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private colors: Color[];

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

    const fileReader = new FileReader();

    fileReader.addEventListener("load", (e) => {
      if (!e.target || !e.target.result) throw "Failed to read uploaded file.";

      image.src = e.target.result.toString();
    });

    if (!uploader.files) throw "Asked to read image file but found no file was uploaded.";

    fileReader.readAsDataURL(uploader.files[0]);
  };

  handleUpdateImage = () => {
    const { preview, context, image, opacity, backgroundColor } = this;
    let { width, height } = image;

    if (!width) width = 300;
    if (!height) height = 200;

    const imageDataToColorArray = (imageData: Uint8ClampedArray) => {
      const colors = [];

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i + 0];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        colors.push(new Color(r, g, b, a));
      }

      return colors;
    };

    preview.width = width;
    preview.height = height;

    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, width, height);
    const values = imageData.data;

    if (opacity == null && backgroundColor == null) {
      this.colors = imageDataToColorArray(values);
      return true;
    }

    // Handle Opacity

    if (opacity != null) {
      for (let i = 0; i < values.length; i += 4) {
        const alpha = values[i + 3] * opacity;
        const clampedAlpha = clamp(alpha, 0, 255);

        values[i + 3] = clampedAlpha;
      }

      context.putImageData(imageData, 0, 0);

      if (!backgroundColor) {
        this.colors = imageDataToColorArray(values);
        return true;
      }
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

      this.colors = imageDataToColorArray(context.getImageData(0, 0, width, height).data);
    }
  };

  loadExampleImage = () => {
    this.image.src = "./example.png";
  };

  getColorsAt = (startX: number, startY: number, width: number, height: number) => {
    const { preview, colors } = this;

    const targetColors = [];

    for (let y = startY; y < startY + height; y++) {
      for (let x = startX; x < startX + width; x++) {
        const i = y * preview.width + x;

        if (i < 0 || i > colors.length) continue;

        targetColors.push(colors[i]);
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
