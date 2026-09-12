// Lab coordinates for the SVG named colours, measured against the same D65
// 2 degree reference white that rgb2lab converts to.
const namedColorsLab = [
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

export default namedColorsLab;
