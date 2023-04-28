import { debounce } from "./Util";

export default class Selection {
  readonly outline: HTMLElement;
  readonly target: HTMLCanvasElement;

  callback: (() => void) | undefined;

  private isInProgress = false;
  private startPosition = { x: 0, y: 0 };
  private endPosition = { x: 0, y: 0 };

  info:
    | {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number;
        height: number;
      }
    | undefined;

  constructor(borderElement: HTMLElement, targetElement: HTMLCanvasElement, callback?: () => void) {
    targetElement.onmousedown = this.handleSelect;
    targetElement.onmouseup = this.handleSelect;
    targetElement.onmousemove = this.handleSelect;
    targetElement.onmouseleave = this.handleSelect;

    targetElement.ontouchstart = this.handleTouch;
    targetElement.ontouchend = this.handleTouch;
    targetElement.ontouchmove = this.handleTouch;

    this.outline = borderElement;
    this.target = targetElement;

    if (callback) this.onSelectionEnd = callback;
  }

  handleTouch = (e: TouchEvent) => {
    const { targetTouches, changedTouches, type } = e;

    if (targetTouches.length !== 2) return;
    else e.preventDefault();

    const { target, updateInfo, updateOutline, callback } = this;

    const touches = type === "touchend" ? changedTouches : targetTouches;
    const boundingRect = target.getBoundingClientRect();

    const x1 = Math.round(touches[0].clientX - boundingRect.left);
    const y1 = Math.round(touches[0].clientY - boundingRect.top);

    const x2 = Math.round(touches[1].clientX - boundingRect.left);
    const y2 = Math.round(touches[1].clientY - boundingRect.top);

    this.startPosition = { x: x1, y: y1 };
    this.endPosition = { x: x2, y: y2 };

    updateInfo();
    updateOutline();

    if (callback) callback();
  };

  handleSelect = (e: MouseEvent) => {
    const { type, button, clientX, clientY } = e;
    const { target, isInProgress, updateInfo, updateOutline, callback } = this;

    if (button !== null && button !== 0) return;

    const boundingRect = target.getBoundingClientRect();
    const x = Math.round(clientX - boundingRect.left);
    const y = Math.round(clientY - boundingRect.top);

    if (type === "mousedown") {
      this.startPosition = { x, y };
      this.isInProgress = true;
      return;
    }

    if (!isInProgress) return;

    if (type === "mousemove" || type === "mouseup" || type === "mouseleave") {
      this.endPosition = { x, y };

      updateInfo();
      updateOutline();

      if (callback) callback();
    }

    if (type === "mouseup" || type === "mouseleave") this.isInProgress = false;
  };

  set onSelectionEnd(callback: () => void) {
    this.callback = debounce(callback);
  }

  updateInfo = () => {
    const { startPosition, endPosition, target } = this;

    const top = Math.max(Math.min(startPosition.y, endPosition.y), 0);
    const left = Math.max(Math.min(startPosition.x, endPosition.x), 0);
    const bottom = Math.min(Math.max(startPosition.y, endPosition.y), target.height);
    const right = Math.min(Math.max(startPosition.x, endPosition.x), target.width);

    const width = Math.max(right - left, 1);
    const height = Math.max(bottom - top, 1);

    this.info = { top, left, bottom, right, width, height };
  };

  updateOutline = () => {
    const { outline, info } = this;

    if (!info) return;

    const { top, left, width, height } = info;

    const cssText = `top:${top}px; left:${left}px; width:${width}px; height:${height}px;`;

    outline.style.cssText = cssText;
  };

  clear = () => {
    const { outline } = this;

    outline.style.cssText = "";

    delete this.info;
  };
}
