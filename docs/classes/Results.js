export default class Results {
    constructor(resultFields) {
        this.setBackgroundColor = (color) => {
            const { resultElementArray } = this;
            const backgroundColor = color.toRgba();
            resultElementArray.forEach((info) => {
                info.backgroundElement.style.backgroundColor = backgroundColor;
            });
        };
        this.setResult = (type, color, options) => {
            const { resultElementHashmap } = this;
            const resultFormat = options.resultFormat;
            const hideAlphaChannel = options.hideAlphaChannel;
            let includeAlpha = false;
            if (hideAlphaChannel === "always")
                includeAlpha = false;
            else if (hideAlphaChannel === "never")
                includeAlpha = true;
            else if (color.a !== 255)
                includeAlpha = true;
            let value = "";
            if (resultFormat === "rgb")
                value = includeAlpha ? color.toRgba() : color.toRgb();
            if (resultFormat === "hex")
                value = includeAlpha ? color.toHex8() : color.toHex6();
            if (resultFormat === "hsl")
                value = includeAlpha ? color.toHsla() : color.toHsl();
            if (!value)
                throw `Invalid resultFormat option: ${resultFormat.toString()}`;
            resultElementHashmap[type].textElement.value = value;
        };
        this.resultElementArray = [];
        this.resultElementHashmap = {};
        resultFields.forEach((resultField) => {
            const textElement = resultField.querySelector("input[type=text]");
            const foregroundElement = resultField.querySelector(".foreground");
            const backgroundElement = resultField.querySelector(".background");
            const copyButton = resultField.querySelector(".copy");
            if (copyButton) {
                copyButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(textElement.value);
                });
            }
            const proxiedTextElement = new Proxy(textElement, {
                set: (target, name, value) => {
                    if (name === "value")
                        foregroundElement.style.backgroundColor = value;
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
}
