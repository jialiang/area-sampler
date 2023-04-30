import Colour from "./IsThisColourSimilar/Colour.ts";

import Options from "./Options.ts";
import { round } from "./Util.ts";

export default class Color {
  static squaredValues = [...Array(256).keys()].map((value) => value * value);

  static namedColorsLab = [
    {
      name: "aliceblue",
      value: [97.18, -1.34, -4.27],
    },
    {
      name: "antiquewhite",
      value: [93.73, 1.84, 11.52],
    },
    {
      name: "aqua",
      value: [91.12, -48.08, -14.14],
    },
    {
      name: "aquamarine",
      value: [92.04, -45.52, 9.71],
    },
    {
      name: "azure",
      value: [98.93, -4.88, -1.7],
    },
    {
      name: "beige",
      value: [95.95, -4.19, 12.04],
    },
    {
      name: "bisque",
      value: [92.01, 4.43, 19],
    },
    {
      name: "black",
      value: [0, 0, 0],
    },
    {
      name: "blanchedalmond",
      value: [93.92, 2.13, 17.02],
    },
    {
      name: "blue",
      value: [32.3, 79.2, -107.86],
    },
    {
      name: "blueviolet",
      value: [42.19, 69.86, -74.77],
    },
    {
      name: "brown",
      value: [37.52, 49.7, 30.54],
    },
    {
      name: "burlywood",
      value: [77.02, 7.05, 30.01],
    },
    {
      name: "cadetblue",
      value: [61.15, -19.68, -7.43],
    },
    {
      name: "chartreuse",
      value: [89.87, -68.07, 85.78],
    },
    {
      name: "chocolate",
      value: [55.99, 37.06, 56.74],
    },
    {
      name: "coral",
      value: [67.29, 45.36, 47.49],
    },
    {
      name: "cornflowerblue",
      value: [61.93, 9.34, -49.31],
    },
    {
      name: "cornsilk",
      value: [97.46, -2.21, 14.28],
    },
    {
      name: "crimson",
      value: [47.03, 70.94, 33.59],
    },
    {
      name: "cyan",
      value: [91.12, -48.08, -14.14],
    },
    {
      name: "darkblue",
      value: [14.76, 50.43, -68.68],
    },
    {
      name: "darkcyan",
      value: [52.21, -30.62, -9],
    },
    {
      name: "darkgoldenrod",
      value: [59.22, 9.87, 62.73],
    },
    {
      name: "darkgray",
      value: [69.24, 0, -0.01],
    },
    {
      name: "darkgreen",
      value: [36.2, -43.37, 41.86],
    },
    {
      name: "darkgrey",
      value: [69.24, 0, -0.01],
    },
    {
      name: "darkkhaki",
      value: [73.38, -8.79, 39.29],
    },
    {
      name: "darkmagenta",
      value: [32.6, 62.56, -38.74],
    },
    {
      name: "darkolivegreen",
      value: [42.23, -18.83, 30.6],
    },
    {
      name: "darkorange",
      value: [69.48, 36.83, 75.49],
    },
    {
      name: "darkorchid",
      value: [43.38, 65.17, -60.11],
    },
    {
      name: "darkred",
      value: [28.08, 51.01, 41.29],
    },
    {
      name: "darksalmon",
      value: [69.85, 28.18, 27.7],
    },
    {
      name: "darkseagreen",
      value: [72.09, -23.82, 18.03],
    },
    {
      name: "darkslateblue",
      value: [30.83, 26.06, -42.09],
    },
    {
      name: "darkslategray",
      value: [31.26, -11.72, -3.73],
    },
    {
      name: "darkslategrey",
      value: [31.26, -11.72, -3.73],
    },
    {
      name: "darkturquoise",
      value: [75.29, -40.04, -13.52],
    },
    {
      name: "darkviolet",
      value: [39.58, 76.34, -70.38],
    },
    {
      name: "deeppink",
      value: [55.95, 84.56, -5.71],
    },
    {
      name: "deepskyblue",
      value: [72.55, -17.65, -42.55],
    },
    {
      name: "dimgray",
      value: [44.41, 0, -0.01],
    },
    {
      name: "dimgrey",
      value: [44.41, 0, -0.01],
    },
    {
      name: "dodgerblue",
      value: [59.38, 9.97, -63.39],
    },
    {
      name: "firebrick",
      value: [39.11, 55.93, 37.65],
    },
    {
      name: "floralwhite",
      value: [98.4, -0.03, 5.37],
    },
    {
      name: "forestgreen",
      value: [50.59, -49.59, 45.02],
    },
    {
      name: "fuchsia",
      value: [60.32, 98.25, -60.84],
    },
    {
      name: "gainsboro",
      value: [87.76, 0, -0.01],
    },
    {
      name: "ghostwhite",
      value: [97.76, 1.25, -3.36],
    },
    {
      name: "gold",
      value: [86.93, -1.92, 87.14],
    },
    {
      name: "goldenrod",
      value: [70.82, 8.52, 68.76],
    },
    {
      name: "gray",
      value: [53.59, 0, -0.01],
    },
    {
      name: "green",
      value: [46.23, -51.7, 49.9],
    },
    {
      name: "greenyellow",
      value: [91.96, -52.48, 81.87],
    },
    {
      name: "grey",
      value: [53.59, 0, -0.01],
    },
    {
      name: "honeydew",
      value: [98.57, -7.56, 5.47],
    },
    {
      name: "hotpink",
      value: [65.48, 64.25, -10.66],
    },
    {
      name: "indianred",
      value: [53.39, 44.84, 22.11],
    },
    {
      name: "indigo",
      value: [20.47, 51.69, -53.32],
    },
    {
      name: "ivory",
      value: [99.64, -2.55, 7.15],
    },
    {
      name: "khaki",
      value: [90.33, -9.01, 44.97],
    },
    {
      name: "lavender",
      value: [91.83, 3.71, -9.67],
    },
    {
      name: "lavenderblush",
      value: [96.07, 5.89, -0.6],
    },
    {
      name: "lawngreen",
      value: [88.88, -67.86, 84.95],
    },
    {
      name: "lemonchiffon",
      value: [97.65, -5.42, 22.23],
    },
    {
      name: "lightblue",
      value: [83.81, -10.89, -11.49],
    },
    {
      name: "lightcoral",
      value: [66.15, 42.82, 19.55],
    },
    {
      name: "lightcyan",
      value: [97.87, -9.94, -3.38],
    },
    {
      name: "lightgoldenrodyellow",
      value: [97.37, -6.48, 19.23],
    },
    {
      name: "lightgray",
      value: [84.56, 0, -0.01],
    },
    {
      name: "lightgreen",
      value: [86.55, -46.33, 36.94],
    },
    {
      name: "lightgrey",
      value: [84.56, 0, -0.01],
    },
    {
      name: "lightpink",
      value: [81.05, 27.97, 5.03],
    },
    {
      name: "lightsalmon",
      value: [74.7, 31.48, 34.54],
    },
    {
      name: "lightseagreen",
      value: [65.79, -37.51, -6.34],
    },
    {
      name: "lightskyblue",
      value: [79.73, -10.82, -28.51],
    },
    {
      name: "lightslategray",
      value: [55.92, -2.24, -11.11],
    },
    {
      name: "lightslategrey",
      value: [55.92, -2.24, -11.11],
    },
    {
      name: "lightsteelblue",
      value: [78.45, -1.28, -15.22],
    },
    {
      name: "lightyellow",
      value: [99.28, -5.1, 14.83],
    },
    {
      name: "lime",
      value: [87.74, -86.18, 83.18],
    },
    {
      name: "limegreen",
      value: [72.61, -67.13, 61.44],
    },
    {
      name: "linen",
      value: [95.31, 1.68, 6.01],
    },
    {
      name: "magenta",
      value: [60.32, 98.25, -60.84],
    },
    {
      name: "maroon",
      value: [25.53, 48.06, 38.06],
    },
    {
      name: "mediumaquamarine",
      value: [75.69, -38.33, 8.3],
    },
    {
      name: "mediumblue",
      value: [24.98, 67.18, -91.5],
    },
    {
      name: "mediumorchid",
      value: [53.64, 59.07, -47.41],
    },
    {
      name: "mediumpurple",
      value: [54.98, 36.81, -50.1],
    },
    {
      name: "mediumseagreen",
      value: [65.27, -48.22, 24.29],
    },
    {
      name: "mediumslateblue",
      value: [52.16, 41.08, -65.41],
    },
    {
      name: "mediumspringgreen",
      value: [87.34, -70.68, 32.46],
    },
    {
      name: "mediumturquoise",
      value: [76.88, -37.35, -8.36],
    },
    {
      name: "mediumvioletred",
      value: [44.76, 71.01, -15.18],
    },
    {
      name: "midnightblue",
      value: [15.86, 31.72, -49.58],
    },
    {
      name: "mintcream",
      value: [99.16, -4.16, 1.24],
    },
    {
      name: "mistyrose",
      value: [92.66, 8.75, 4.83],
    },
    {
      name: "moccasin",
      value: [91.72, 2.44, 26.35],
    },
    {
      name: "navajowhite",
      value: [90.1, 4.51, 28.26],
    },
    {
      name: "navy",
      value: [12.98, 47.51, -64.7],
    },
    {
      name: "oldlace",
      value: [96.78, 0.18, 8.16],
    },
    {
      name: "olive",
      value: [51.87, -12.93, 56.68],
    },
    {
      name: "olivedrab",
      value: [54.65, -28.22, 49.69],
    },
    {
      name: "orange",
      value: [74.93, 23.94, 78.96],
    },
    {
      name: "orangered",
      value: [57.57, 67.8, 68.97],
    },
    {
      name: "orchid",
      value: [62.8, 55.29, -34.42],
    },
    {
      name: "palegoldenrod",
      value: [91.14, -7.35, 30.96],
    },
    {
      name: "palegreen",
      value: [90.75, -48.3, 38.52],
    },
    {
      name: "paleturquoise",
      value: [90.06, -19.63, -6.41],
    },
    {
      name: "palevioletred",
      value: [60.56, 45.53, 0.39],
    },
    {
      name: "papayawhip",
      value: [95.08, 1.27, 14.52],
    },
    {
      name: "peachpuff",
      value: [89.35, 8.09, 21.01],
    },
    {
      name: "peru",
      value: [61.75, 21.4, 47.92],
    },
    {
      name: "pink",
      value: [83.58, 24.15, 3.32],
    },
    {
      name: "plum",
      value: [73.37, 32.54, -22],
    },
    {
      name: "powderblue",
      value: [86.13, -14.09, -8.02],
    },
    {
      name: "purple",
      value: [29.78, 58.94, -36.5],
    },
    {
      name: "red",
      value: [53.23, 80.11, 67.22],
    },
    {
      name: "rosybrown",
      value: [63.61, 17.02, 6.6],
    },
    {
      name: "royalblue",
      value: [47.83, 26.27, -65.27],
    },
    {
      name: "saddlebrown",
      value: [37.47, 26.45, 40.99],
    },
    {
      name: "salmon",
      value: [67.26, 45.23, 29.09],
    },
    {
      name: "sandybrown",
      value: [73.95, 23.03, 46.79],
    },
    {
      name: "seagreen",
      value: [51.54, -39.71, 20.05],
    },
    {
      name: "seashell",
      value: [97.12, 2.17, 4.54],
    },
    {
      name: "sienna",
      value: [43.8, 29.33, 35.64],
    },
    {
      name: "silver",
      value: [77.7, 0, -0.01],
    },
    {
      name: "skyblue",
      value: [79.21, -14.83, -21.28],
    },
    {
      name: "slateblue",
      value: [45.34, 36.05, -57.78],
    },
    {
      name: "slategray",
      value: [52.84, -2.14, -10.58],
    },
    {
      name: "slategrey",
      value: [52.84, -2.14, -10.58],
    },
    {
      name: "snow",
      value: [98.64, 1.66, 0.58],
    },
    {
      name: "springgreen",
      value: [88.47, -76.9, 47.03],
    },
    {
      name: "steelblue",
      value: [52.47, -4.07, -32.2],
    },
    {
      name: "tan",
      value: [74.97, 5.02, 24.42],
    },
    {
      name: "teal",
      value: [48.26, -28.84, -8.48],
    },
    {
      name: "thistle",
      value: [80.08, 13.22, -9.24],
    },
    {
      name: "tomato",
      value: [62.2, 57.86, 46.42],
    },
    {
      name: "turquoise",
      value: [81.27, -44.08, -4.03],
    },
    {
      name: "violet",
      value: [69.69, 56.37, -36.82],
    },
    {
      name: "wheat",
      value: [89.35, 1.51, 24],
    },
    {
      name: "white",
      value: [100, 0.01, -0.01],
    },
    {
      name: "whitesmoke",
      value: [96.54, 0.01, -0.01],
    },
    {
      name: "yellow",
      value: [97.14, -21.56, 94.48],
    },
    {
      name: "yellowgreen",
      value: [76.54, -37.99, 66.59],
    },
  ] as { name: string; value: [number, number, number] }[];

  static getMeanMedian = (colors: Color[], options: Options) => {
    const averagingMethod = options.averagingMethod;
    const numberOfPixels = colors.length;

    const mean = new Color();
    const median = new Color();

    if (numberOfPixels === 0) return [mean, median];

    const colorChannels = ["r", "g", "b", "a"] as const;

    for (let i = 0; i < colorChannels.length; i++) {
      const channel = colorChannels[i];

      const values = [] as number[];

      for (let i = 0; i < colors.length; i++) values.push(colors[i][channel]);

      const sortedValues = values.sort();

      if (averagingMethod === "squared") {
        let totalSquaredValue = 0;

        for (let i = 0; i < values.length; i++) totalSquaredValue += Color.squaredValues[values[i]];

        const meanSquaredValue = totalSquaredValue / numberOfPixels;
        const meanValue = Math.sqrt(meanSquaredValue);

        mean[channel] = meanValue;
      }

      if (averagingMethod === "simple") {
        let totalValue = 0;

        for (let i = 0; i < values.length; i++) totalValue += values[i];

        const meanValue = totalValue / numberOfPixels;

        mean[channel] = meanValue;
      }

      const medianIndex = Math.floor(sortedValues.length / 2);

      median[channel] = sortedValues[medianIndex];
    }

    return [mean, median];
  };

  static getLightestDarkest = (colors: Color[]) => {
    if (colors.length === 0) return [new Color(), new Color()];

    const sRGBtoLinear = (channel: number) => {
      if (channel <= 0.04045) return channel / 12.92;

      return Math.pow((channel + 0.055) / 1.055, 2.4);
    };

    const lightnessValues = colors.map((color) => {
      const lR = sRGBtoLinear(color.r / 255);
      const lG = sRGBtoLinear(color.g / 255);
      const lB = sRGBtoLinear(color.b / 255);

      const luminance = 0.2126 * lR + 0.7152 * lG + 0.0722 * lB;

      if (luminance <= 216 / 24389) return luminance * (24389 / 27);
      return Math.pow(luminance, 1 / 3) * 116 - 16;
    });

    const lightnestValue = lightnessValues.reduce((max, v) => Math.max(max, v), -1);
    const darkestValue = lightnessValues.reduce((max, v) => Math.min(max, v), 256);

    const lightestIndex = lightnessValues.indexOf(lightnestValue);
    const darkestIndex = lightnessValues.indexOf(darkestValue);

    const lightestColor = colors[lightestIndex];
    const darkestColor = colors[darkestIndex];

    return [
      new Color(lightestColor.r, lightestColor.g, lightestColor.b, lightestColor.a),
      new Color(darkestColor.r, darkestColor.g, darkestColor.b, darkestColor.a),
    ];
  };

  static blendColors = (background: Color, foreground: Color) => {
    const normalFgAlpha = foreground.a / 255;
    const normalBgAlpha = 1 - normalFgAlpha;

    const channels = ["r", "g", "b"] as const;

    const rgb = channels.map((c) => background[c] * normalBgAlpha + foreground[c] * normalFgAlpha);

    return new Color(...rgb);
  };

  r = 0; // 0-255
  g = 0; // 0-255;
  b = 0; // 0-255;
  a = 0; // 0-255;

  constructor(a?: number | string, b?: number, c?: number, d?: number) {
    if (arguments.length === 1) {
      if (typeof a === "string" && a[0] === "#") {
        let hex = a;

        if (hex.length === 4) hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];

        if (hex.length === 7 || hex.length === 9) {
          this.r = parseInt(hex[1] + hex[2], 16);
          this.g = parseInt(hex[3] + hex[4], 16);
          this.b = parseInt(hex[5] + hex[6], 16);

          if (hex.length === 9) this.a = parseInt(hex[7] + hex[8], 16);
          else this.a = 255;
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

  getClosedNamedColor = () => {
    const { r, g, b } = this;

    const labA = Colour.rgb2lab(r, g, b);

    let smallestDeltaE = 101;
    let closestColorName = "";

    Color.namedColorsLab.forEach((namedColor) => {
      const labB = namedColor.value;
      const deltaE = Colour.deltaE00(labA[0], labA[1], labA[2], labB[0], labB[1], labB[2]);

      if (deltaE < smallestDeltaE) {
        smallestDeltaE = deltaE;
        closestColorName = namedColor.name;
      }
    });

    return closestColorName;
  };

  get rgb(): [number, number, number] {
    const { r, g, b } = this;

    return [r, g, b];
  }

  get rgba(): [number, number, number, number] {
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

  private hex = (value: number) => ("0" + Math.round(value).toString(16)).slice(-2);

  toHex6() {
    const { r, g, b, hex } = this;

    return "#" + hex(r) + hex(g) + hex(b);
  }

  toHex8() {
    const { r, g, b, a, hex } = this;

    return "#" + hex(r) + hex(g) + hex(b) + hex(a);
  }

  private getHsl = () => {
    const { r, g, b } = this;

    const nR = r / 255;
    const nG = g / 255;
    const nB = b / 255;

    const max = Math.max(nR, nG, nB);
    const min = Math.min(nR, nG, nB);
    const delta = max - min;

    let hue, lightness, saturation;

    // hue
    if (delta === 0) hue = 0;
    else if (nR === max) hue = ((nG - nB) / delta) % 6;
    else if (nG === max) hue = (nB - nR) / delta + 2;
    else hue = (nR - nG) / delta + 4;

    hue = Math.round(hue * 60);

    if (hue < 0) hue += 360;

    // lightness
    lightness = (max + min) / 2;

    // saturation
    if (delta === 0) saturation = 0;
    else saturation = delta / (1 - Math.abs(2 * lightness - 1));

    lightness = round(lightness * 100, 1);
    saturation = round(saturation * 100, 1);

    return [hue, saturation, lightness];
  };

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
