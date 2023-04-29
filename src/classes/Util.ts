export const debounce = (func: (...args: any[]) => any, timeout = 150) => {
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

export const toast = (message: string) => {
  const toast = document.createElement("div");

  toast.textContent = message;
  toast.className = "toast";
  toast.setAttribute("role", "status");

  const toastContainer = document.querySelector(".toast-container");

  if (toastContainer) {
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 1500);
  }
};
