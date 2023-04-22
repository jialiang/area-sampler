class OptionsProxy {
    constructor() {
        return new Proxy(this, {
            get: (target, name) => {
                const field = target.fieldHashmap[name.toString()];
                if (field)
                    return field.value;
                return target[name];
            },
        });
    }
}
export default class Options extends OptionsProxy {
    constructor(optionFields, callback) {
        super();
        this.onBeforeChange = (name, newBeforeChangeCallback) => {
            const { fieldHashmap, fieldToBeforeChangeCallback, callback } = this;
            const field = fieldHashmap[name];
            if (!field)
                return;
            const beforeChangeCallback = fieldToBeforeChangeCallback[name];
            if (callback)
                field.removeEventListener("change", callback);
            if (beforeChangeCallback)
                field.removeEventListener("change", beforeChangeCallback);
            field.addEventListener("change", newBeforeChangeCallback);
            if (callback)
                field.addEventListener("change", callback);
            fieldToBeforeChangeCallback[name] = newBeforeChangeCallback;
        };
        this.triggerAllBeforeChangeCallbacks = () => {
            const { fieldArray, fieldToBeforeChangeCallback } = this;
            fieldArray.forEach((field) => {
                const beforeChangeCallback = fieldToBeforeChangeCallback[field.name];
                if (beforeChangeCallback)
                    beforeChangeCallback();
            });
        };
        this.fieldArray = optionFields;
        this.fieldHashmap = {};
        this.fieldToBeforeChangeCallback = {};
        optionFields.forEach((field) => {
            this.fieldHashmap[field.name] = field;
        });
        if (callback)
            this.onChange = callback;
    }
    set onChange(newCallback) {
        const { fieldArray, callback } = this;
        fieldArray.forEach((field) => {
            if (callback)
                field.removeEventListener("change", callback);
            field.addEventListener("change", newCallback);
        });
        this.callback = newCallback;
    }
}
