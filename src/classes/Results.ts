import Color from "./Color";
import Options from "./Options";

type resultElementInfo = {
  textElement: HTMLInputElement;
  foregroundElement: HTMLElement;
  backgroundElement: HTMLElement;
};

export default class Results {
  readonly resultElementArray: resultElementInfo[];
  readonly resultElementHashmap: { [key: string]: resultElementInfo };

  constructor(resultFields: HTMLElement[]) {
    this.resultElementArray = [];
    this.resultElementHashmap = {};

    resultFields.forEach((resultField) => {
      const textElement = resultField.querySelector("input[type=text]") as HTMLInputElement;
      const foregroundElement = resultField.querySelector(".foreground") as HTMLElement;
      const backgroundElement = resultField.querySelector(".background") as HTMLElement;
      const copyButton = resultField.querySelector(".copy");

      if (copyButton) {
        copyButton.addEventListener("click", (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(textElement.value);
        });
      }

      const proxiedTextElement = new Proxy(textElement, {
        set: (target, name, value) => {
          if (name === "value") foregroundElement.style.backgroundColor = value;

          // @ts-expect-error continue with default behavior
          target[name] = value;
          return true;
        },
      });

      const name = textElement.name.split("ResultText")[0];
      const info = {
        textElement: proxiedTextElement,
        foregroundElement,
        backgroundElement,
      };

      this.resultElementHashmap[name] = info;
      this.resultElementArray.push(info);
    });
  }

  setBackgroundColor = (color: Color) => {
    const { resultElementArray } = this;

    const backgroundColor = color.toRgba();

    resultElementArray.forEach((info) => {
      info.backgroundElement.style.backgroundColor = backgroundColor;
    });
  };

  setResult = (type: string, color: Color, options: Options) => {
    const { resultElementHashmap } = this;
    const resultFormat = options.resultFormat;
    const hideAlphaChannel = options.hideAlphaChannel;

    let includeAlpha = false;
    if (hideAlphaChannel === "always") includeAlpha = false;
    else if (hideAlphaChannel === "never") includeAlpha = true;
    else if (color.a !== 255) includeAlpha = true;

    let value = "";

    if (resultFormat === "rgb") value = includeAlpha ? color.toRgba() : color.toRgb();
    if (resultFormat === "hex") value = includeAlpha ? color.toHex8() : color.toHex6();
    if (resultFormat === "hsl") value = includeAlpha ? color.toHsla() : color.toHsl();
    if (resultFormat === "svg") value = color.getClosedNamedColor();

    if (!value) throw `Invalid resultFormat option: ${resultFormat.toString()}`;

    resultElementHashmap[type].textElement.value = value;
  };
}
