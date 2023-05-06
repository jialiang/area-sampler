import React from "react";

const options = {
  transparencyType: [
    { label: "No", value: "straight" },
    { label: "Yes", value: "premultiplied" },
  ],
  resultFormat: [
    { label: "RGB", value: "rgb" },
    { label: "Hexadecimal", value: "hex" },
    { label: "HSL", value: "hsl" },
    { label: "SVG Color Name", value: "svg" },
  ],
  hideAlphaChannel: [
    { label: "If opaque", value: "opaqueOnly" },
    { label: "Never", value: "never" },
    { label: "Always", value: "always" },
  ],
  averagingMethod: [
    { label: "Squared", value: "squared" },
    { label: "Simple", value: "simple" },
  ],
} as const;

function Select({ name }: { name: keyof typeof options }) {
  return (
    <select name={name}>
      {options[name].map((option) => {
        const { value, label } = option;
        return (
          <option key={`${label}-${value}`} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

function Field({
  suffix,
  label,
  children,
}: {
  suffix?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field" data-suffix={suffix}>
      <div className="top-row">{label}</div>
      {children}
    </label>
  );
}

function ResultField({ label, name }: { label: string; name?: string }) {
  if (!name) name = label.toLowerCase();

  return (
    <div className="field">
      <div className="top-row">
        <label htmlFor={name}>{label}</label>
        <span>
          <span className="color-preview">
            <div className="background"></div>
            <div className="foreground"></div>
          </span>{" "}
          <button className="copy">Copy</button>
        </span>
      </div>
      <input id={name} name={`${name}ResultText`} readOnly />
    </div>
  );
}

function FormContainer() {
  return (
    <div className="form-container">
      <form className="options">
        <div className="field-container">
          <fieldset>
            <legend>Image Options</legend>

            <Field label="Image Opacity" suffix="%">
              <input type="number" name="opacityPercentage" min="0" max="1000" defaultValue="100" />
            </Field>

            <Field label="Enable Background Color">
              <Select name="transparencyType" />
            </Field>

            <Field label="Background Color">
              <input type="text" name="backgroundColor" defaultValue="white" />
            </Field>
          </fieldset>

          <fieldset>
            <legend>Result Options</legend>

            <Field label="Result Format">
              <Select name="resultFormat" />
            </Field>

            <Field label="Hide Alpha Channel">
              <Select name="hideAlphaChannel" />
            </Field>

            <Field label="Averaging Method">
              <Select name="averagingMethod" />
            </Field>
          </fieldset>

          <fieldset>
            <legend>Image File</legend>

            <Field label="Upload Image">
              <input type="file" name="imageUpload" accept="image/*" />
            </Field>

            <button id="example-image-button" type="button">
              Use Example Image
            </button>
          </fieldset>
        </div>

        <button name="save" type="button">
          Save Options
        </button>
        <button type="reset">Reset All Options</button>
        <button name="download" type="button">
          Download Image
        </button>
      </form>

      <form className="results">
        <div className="field-container">
          <fieldset>
            <legend>Averages</legend>

            <ResultField label="Mean" />
            <ResultField label="Median" />
          </fieldset>

          <fieldset>
            <legend>Min and Max</legend>

            <ResultField label="Lightest" />
            <ResultField label="Darkest" />
          </fieldset>
        </div>
      </form>
    </div>
  );
}

export default <FormContainer />;
