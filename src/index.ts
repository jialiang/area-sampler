import Color from "./classes/Color.ts";
import Options from "./classes/Options.ts";
import Preview from "./classes/Preview.ts";
import Selection from "./classes/Selection.ts";
import Results from "./classes/Results.ts";
import { toast } from "./classes/Util.ts";

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

  const calculate = () => {
    if (!selection.info) return;

    const { top, left, width, height } = selection.info;

    const selectedColors = preview.getColorsAt(left, top, width, height);

    const [meanColor, medianColor] = Color.getMeanMedian(selectedColors, options);
    const [lightestColor, darkestColor] = Color.getLightestDarkest(selectedColors);

    results.setResult("mean", meanColor, options);
    results.setResult("median", medianColor, options);
    results.setResult("lightest", lightestColor, options);
    results.setResult("darkest", darkestColor, options);
  };

  uploaderElement.addEventListener("change", selection.clear);

  const exampleImageButton = $("#example-image-button")[0];
  const resetButton = $("button[type=reset]")[0];
  const saveButton = $("button[name=save")[0];

  exampleImageButton.addEventListener("click", (e) => {
    e.preventDefault();
    selection.clear();
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

  options.onBeforeChange("opacityPercentage", () => {
    const opacityPercent = options.opacityPercentage;

    preview.setOpacity(opacityPercent / 100);
  });

  const handleBackgroundSettingsChanged = () => {
    const transparencyType = options.transparencyType;

    let backgroundColor = null;

    if (transparencyType === "straight") backgroundColor = new Color(0, 0, 0, 0);
    if (transparencyType === "premultiplied") backgroundColor = new Color(options.backgroundColor);

    if (!backgroundColor) throw `Invalid transparency type option: ${transparencyType.toString()}`;

    preview.setBackgroundColor(backgroundColor),
      results.setBackgroundColor(backgroundColor),
      calculate();
  };

  options.onBeforeChange("backgroundColor", handleBackgroundSettingsChanged);
  options.onBeforeChange("transparencyType", handleBackgroundSettingsChanged);

  selection.onSelectionEnd = calculate;
  options.onChange = calculate;
}

window.onload = () => requestAnimationFrame(init);
