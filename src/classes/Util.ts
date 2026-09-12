export const debounce = (func: (...args: any[]) => any, timeout = 16) => {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};

export const round = (value: number, decimalPlaces = 0) =>
  +(Math.round(+(value + `e+${decimalPlaces}`)) + `e-${decimalPlaces}`);

export const clamp = (value: number, min: number, max: number) =>
  Math.max(Math.min(value, max), min);

export const toast = (message: string, persist = false) => {
  const toastElement = document.createElement("div");

  toastElement.textContent = message;
  toastElement.className = `toast ${persist ? "" : "fade-out"}`;
  toastElement.setAttribute("role", "status");

  const toastContainer = document.querySelector(".toast-container");

  if (toastContainer) {
    toastContainer.appendChild(toastElement);

    if (persist) {
      return () => {
        requestAnimationFrame(() => toastContainer.removeChild(toastElement));
      };
    } else {
      setTimeout(() => {
        toastContainer.removeChild(toastElement);
      }, 1500);
    }
  }
};

export const isNil = <T>(value: any): value is T => value == null;
