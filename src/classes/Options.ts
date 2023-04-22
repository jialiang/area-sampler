class OptionsProxy {
  [key: string]: any;

  constructor() {
    return new Proxy(this as unknown as Options, {
      get: (target, name) => {
        const field = target.fieldHashmap[name.toString()];

        if (field) return field.value;

        return target[name as keyof Options];
      },
    });
  }
}

export default class Options extends OptionsProxy {
  readonly fieldArray: (HTMLInputElement | HTMLSelectElement)[];
  readonly fieldHashmap: {
    [key: string]: HTMLInputElement | HTMLSelectElement;
  };
  readonly fieldToBeforeChangeCallback: {
    [key: string]: () => void;
  };

  callback?: () => void;

  constructor(optionFields: (HTMLInputElement | HTMLSelectElement)[], callback?: () => void) {
    super();

    this.fieldArray = optionFields;
    this.fieldHashmap = {};
    this.fieldToBeforeChangeCallback = {};

    optionFields.forEach((field) => {
      this.fieldHashmap[field.name] = field;
    });

    if (callback) this.onChange = callback;
  }

  onBeforeChange = (name: string, newBeforeChangeCallback: () => void) => {
    const { fieldHashmap, fieldToBeforeChangeCallback, callback } = this;

    const field = fieldHashmap[name];

    if (!field) return;

    const beforeChangeCallback = fieldToBeforeChangeCallback[name];

    if (callback) field.removeEventListener("change", callback);
    if (beforeChangeCallback) field.removeEventListener("change", beforeChangeCallback);

    field.addEventListener("change", newBeforeChangeCallback);

    if (callback) field.addEventListener("change", callback);

    fieldToBeforeChangeCallback[name] = newBeforeChangeCallback;
  };

  triggerAllBeforeChangeCallbacks = () => {
    const { fieldArray, fieldToBeforeChangeCallback } = this;

    fieldArray.forEach((field) => {
      const beforeChangeCallback = fieldToBeforeChangeCallback[field.name];

      if (beforeChangeCallback) beforeChangeCallback();
    });
  };

  set onChange(newCallback: () => void) {
    const { fieldArray, callback } = this;

    fieldArray.forEach((field) => {
      if (callback) field.removeEventListener("change", callback);
      field.addEventListener("change", newCallback);
    });

    this.callback = newCallback;
  }
}
