import Color from "./Color.js";
import { clamp } from "./Util.js";
export default class Preview {
    constructor(previewElement, uploaderElement) {
        this.handleReadUpload = () => {
            const { uploader, image } = this;
            const fileReader = new FileReader();
            fileReader.addEventListener("load", (e) => {
                if (!e.target || !e.target.result)
                    throw "Failed to read uploaded file.";
                image.src = e.target.result.toString();
            });
            if (!uploader.files)
                throw "Asked to read image file but found no file was uploaded.";
            fileReader.readAsDataURL(uploader.files[0]);
        };
        this.handleUpdateImage = () => {
            const { preview, context, image, opacity, backgroundColor } = this;
            const { width, height } = image;
            if (width === 0 || height === 0)
                return false;
            preview.width = width;
            preview.height = height;
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, width, height);
            const values = imageData.data;
            if (!opacity && !backgroundColor) {
                this.imageData = values;
                return true;
            }
            // Handle Opacity
            if (opacity) {
                for (let i = 0; i < values.length; i += 4) {
                    const alpha = values[i + 3] * (opacity || 1);
                    const clampedAlpha = clamp(alpha, 0, 255);
                    values[i + 3] = clampedAlpha;
                }
                context.putImageData(imageData, 0, 0);
                if (!backgroundColor) {
                    this.imageData = values;
                    return true;
                }
            }
            // Handle Background Color
            if (backgroundColor) {
                const offscreenCanvas = new OffscreenCanvas(width, height);
                const offscreenContext = offscreenCanvas.getContext("2d");
                if (!offscreenContext)
                    throw "Failed to get 2D context of offscreen canvas.";
                offscreenContext.fillStyle = backgroundColor.toRgba();
                offscreenContext.fillRect(0, 0, width, height);
                offscreenContext.drawImage(preview, 0, 0);
                context.drawImage(offscreenCanvas, 0, 0);
                this.imageData = context.getImageData(0, 0, width, height).data;
            }
        };
        this.loadExampleImage = () => {
            this.image.src = "./example.png";
        };
        this.getColorsAt = (startX, startY, width, height) => {
            const { preview, imageData } = this;
            const colors = [];
            for (let y = startY; y < startY + height; y++) {
                for (let x = startX; x < startX + width; x++) {
                    const i = (y * preview.width + x) * 4;
                    if (i < 0 || i + 3 > imageData.length)
                        continue;
                    const r = imageData[i + 0];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const a = imageData[i + 3];
                    colors.push(new Color(r, g, b, a));
                }
            }
            return colors;
        };
        this.setBackgroundColor = (color) => {
            if (color.a === 0)
                delete this.backgroundColor;
            else
                this.backgroundColor = color;
            this.handleUpdateImage();
        };
        this.setOpacity = (opacity) => {
            if (opacity === 1)
                delete this.opacity;
            else
                this.opacity = opacity;
            this.handleUpdateImage();
        };
        const image = new Image();
        image.addEventListener("load", this.handleUpdateImage);
        uploaderElement.addEventListener("change", this.handleReadUpload);
        this.preview = previewElement;
        this.uploader = uploaderElement;
        const context = previewElement.getContext("2d");
        if (!context)
            throw "Failed to get 2D context from canvas element.";
        this.context = context;
        this.image = image;
        this.imageData = new Uint8ClampedArray(0);
    }
}
