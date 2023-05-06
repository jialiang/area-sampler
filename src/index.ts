import Color from "./classes/Color.ts";
import Options from "./classes/Options.ts";
import Preview from "./classes/Preview.ts";
import Selection from "./classes/Selection.ts";
import Results from "./classes/Results.ts";
import { debounce, toast } from "./classes/Util.ts";

function init() {
  const $ = (selector: string): HTMLElement[] => Array.from(document.querySelectorAll(selector));

  const optionsForm = $(".options")[0] as HTMLFormElement;
  const resultsForm = $(".results")[0] as HTMLFormElement;

  optionsForm.reset();
  resultsForm.reset();

  optionsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });

  const optionFields = $(".options :is(input, select)") as (HTMLInputElement | HTMLSelectElement)[];
  const resultFields = $(".results .field") as HTMLInputElement[];

  const previewElement = $(".preview")[0] as HTMLCanvasElement;
  const uploaderElement = $("input[name=imageUpload]")[0] as HTMLInputElement;
  const selectorElement = $(".selector")[0];

  const options = new Options(optionFields);
  const preview = new Preview(previewElement, uploaderElement);
  const results = new Results(resultFields);
  const selection = new Selection(selectorElement, previewElement);

  const calculate = debounce(async () => {
    if (!selection.info) return;

    const { top, left, width, height } = selection.info;

    const selectedColors = await preview.getColorsAt(left, top, width, height);

    const [meanColor, medianColor] = Color.getMeanMedian(selectedColors, options);
    const [lightestColor, darkestColor] = Color.getLightestDarkest(selectedColors);

    results.setResult("mean", meanColor, options);
    results.setResult("median", medianColor, options);
    results.setResult("lightest", lightestColor, options);
    results.setResult("darkest", darkestColor, options);
  }, 100);

  uploaderElement.addEventListener("change", selection.clear);

  const exampleImageButton = $("#example-image-button")[0];
  const resetButton = $("button[type=reset]")[0];
  const saveButton = $("button[name=save")[0];
  const downloadButton = $("button[name=download")[0];

  exampleImageButton.addEventListener("click", (e) => {
    e.preventDefault();
    selection.clear();
    uploaderElement.value = "";
    preview.loadExampleImage();
  });

  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    optionsForm.reset();
    options.triggerAllBeforeChangeCallbacks();
    calculate();
    toast("Options reset!");
  });

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    options.save();
    toast("Options saved!");
  });

  downloadButton.addEventListener("click", (e) => {
    e.preventDefault();
    const hideToast = toast("Preparing download...", true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const a = document.createElement("a");

        a.href = previewElement.toDataURL("image/png", 1.0);
        a.download = "example.png";

        if (uploaderElement.files && uploaderElement.files.length) {
          a.download = uploaderElement.files[0].name.split(".").slice(0, -1).join(".") + ".png";
        }

        if (hideToast) hideToast();
        a.click();
      });
    });
  });

  options.onBeforeChange("opacityPercentage", () => {
    const opacityPercent = options.opacityPercentage;

    preview.setOpacity(opacityPercent / 100);
  });

  const handleBackgroundSettingsChanged = () => {
    const transparencyType = options.transparencyType;

    let backgroundColor = "";

    if (transparencyType === "premultiplied") {
      backgroundColor = options.backgroundColor.toLowerCase().trim();
    }

    preview.setBackgroundColor(backgroundColor);
    results.setBackgroundColor(backgroundColor);

    calculate();
  };

  options.onBeforeChange("backgroundColor", handleBackgroundSettingsChanged);
  options.onBeforeChange("transparencyType", handleBackgroundSettingsChanged);

  options.triggerAllBeforeChangeCallbacks();

  selection.onSelectionEnd = calculate;
  options.onChange = calculate;
}

window.onload = () => requestAnimationFrame(init);
