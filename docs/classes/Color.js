import { round } from "./Util.js";
class Color {
    constructor(a, b, c, d) {
        this.r = 0; // 0-255
        this.g = 0; // 0-255;
        this.b = 0; // 0-255;
        this.a = 0; // 0-255;
        this.hex = (value) => ("0" + Math.round(value).toString(16)).slice(-2);
        this.getHsl = () => {
            const { r, g, b } = this;
            const nR = r / 255;
            const nG = g / 255;
            const nB = b / 255;
            const max = Math.max(nR, nG, nB);
            const min = Math.min(nR, nG, nB);
            const delta = max - min;
            let hue, lightness, saturation;
            // hue
            if (delta === 0)
                hue = 0;
            else if (nR === max)
                hue = ((nG - nB) / delta) % 6;
            else if (nG === max)
                hue = (nB - nR) / delta + 2;
            else
                hue = (nR - nG) / delta + 4;
            hue = Math.round(hue * 60);
            if (hue < 0)
                hue += 360;
            // lightness
            lightness = (max + min) / 2;
            // saturation
            if (delta === 0)
                saturation = 0;
            else
                saturation = delta / (1 - Math.abs(2 * lightness - 1));
            lightness = round(lightness * 100, 1);
            saturation = round(saturation * 100, 1);
            return [hue, saturation, lightness];
        };
        if (arguments.length === 1) {
            if (a instanceof Color)
                return new Color(...a.rgba);
            if (typeof a === "string" && a[0] === "#") {
                let hex = a;
                if (hex.length === 4)
                    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
                if (hex.length === 7 || hex.length === 9) {
                    this.r = parseInt(hex[1] + hex[2], 16);
                    this.g = parseInt(hex[3] + hex[4], 16);
                    this.b = parseInt(hex[5] + hex[6], 16);
                    if (hex.length === 9)
                        this.a = parseInt(hex[7] + hex[8], 16);
                    else
                        this.a = 255;
                }
                return;
            }
        }
        if (arguments.length === 3 || arguments.length === 4) {
            const alpha = d == null ? 255 : d;
            if (typeof a === "number" && typeof b === "number" && typeof c === "number") {
                this.r = a;
                this.g = b;
                this.b = c;
            }
            this.a = alpha;
        }
    }
    get rgb() {
        const { r, g, b } = this;
        return [r, g, b];
    }
    get rgba() {
        const { r, g, b, a } = this;
        return [r, g, b, a];
    }
    toRgb() {
        const { r, g, b } = this;
        const rgb = [r, g, b].map((value) => Math.round(value));
        return `rgb(${rgb.join(", ")})`;
    }
    toRgba() {
        const { r, g, b, a } = this;
        const rgba = [r, g, b].map((value) => Math.round(value));
        rgba.push(round(a / 255, 2));
        return `rgba(${rgba.join(", ")})`;
    }
    toHex6() {
        const { r, g, b, hex } = this;
        return "#" + hex(r) + hex(g) + hex(b);
    }
    toHex8() {
        const { r, g, b, a, hex } = this;
        return "#" + hex(r) + hex(g) + hex(b) + hex(a);
    }
    toHsl() {
        const [hue, saturation, lightness] = this.getHsl();
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    toHsla() {
        const { a } = this;
        const [hue, saturation, lightness] = this.getHsl();
        const alpha = round(a / 255, 2);
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
}
Color.getMeanMedian = (colors, options) => {
    const averagingMethod = options.averagingMethod;
    const numberOfPixels = colors.length;
    const mean = new Color();
    const median = new Color();
    const colorChannels = ["r", "g", "b", "a"];
    colorChannels.forEach((channel) => {
        const values = colors.map((pixel) => pixel[channel]);
        const sortedValues = values.sort();
        if (averagingMethod === "squared") {
            const totalSquaredValue = sortedValues.reduce((total, value) => total + value * value, 0);
            const meanSquaredValue = totalSquaredValue / numberOfPixels;
            const meanValue = Math.sqrt(meanSquaredValue);
            mean[channel] = meanValue;
        }
        if (averagingMethod === "simple") {
            const totalValue = sortedValues.reduce((total, value) => total + value, 0);
            const meanValue = totalValue / numberOfPixels;
            mean[channel] = meanValue;
        }
        const medianIndex = Math.floor(sortedValues.length / 2);
        median[channel] = sortedValues[medianIndex];
    });
    return [mean, median];
};
Color.getLightestDarkest = (colors) => {
    const sRGBtoLinear = (channel) => {
        if (channel <= 0.04045)
            return channel / 12.92;
        return Math.pow((channel + 0.055) / 1.055, 2.4);
    };
    const lightnessValues = colors.map((color) => {
        const lR = sRGBtoLinear(color.r / 255);
        const lG = sRGBtoLinear(color.g / 255);
        const lB = sRGBtoLinear(color.b / 255);
        const luminance = 0.2126 * lR + 0.7152 * lG + 0.0722 * lB;
        if (luminance <= 216 / 24389)
            return luminance * (24389 / 27);
        return Math.pow(luminance, 1 / 3) * 116 - 16;
    });
    const lightnestValue = Math.max(...lightnessValues);
    const darkestValue = Math.min(...lightnessValues);
    const lightestIndex = lightnessValues.indexOf(lightnestValue);
    const darkestIndex = lightnessValues.indexOf(darkestValue);
    return [colors[lightestIndex], colors[darkestIndex]];
};
Color.blendColors = (background, foreground) => {
    const normalFgAlpha = foreground.a / 255;
    const normalBgAlpha = 1 - normalFgAlpha;
    const channels = ["r", "g", "b"];
    const rgb = channels.map((c) => background[c] * normalBgAlpha + foreground[c] * normalFgAlpha);
    return new Color(...rgb);
};
export default Color;
