declare module "rgb-lab" {
  export function rgb2lab(rgb: [number, number, number]): [number, number, number];
  export function deltaE(labA: [number, number, number], labB: [number, number, number]): number;
}
