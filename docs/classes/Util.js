export const debounce = (func, timeout = 150) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
};
export const round = (value, decimalPlaces = 0) => +(Math.round(+(value + `e+${decimalPlaces}`)) + `e-${decimalPlaces}`);
export const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
