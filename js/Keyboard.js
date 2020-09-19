/**
 * 键盘按钮
 * 由于KeyboardEvent.keyCode官方已废弃，部分游览器还可以使用，
 * 现转化为KeyboardEvent.code的方式。
 * 
 * 转化为此方式后方便对应取值。
 */
export const Keys = (() => ({
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft",

  Space: "Space",
  Tab: "Tab",
  Shift: set("ShiftLeft", "ShiftRight"),

  Enter: "Enter",
  Ctrl: set("CtrlLeft", "CtrlRight"),
  Alt: set("AltLeft", "AltRight"),
  Bracket: set("BracketLeft", "BracketRight"),
  WIN: set("OSLeft", "OSRight"),
  Esc: "Escape",
  Menu: "ContextMenu",
  CapsLock: "CapsLock",
  Backspace: "Backspace",
  "=": "Equal",
  "-": "Minus",
  ";": "Semicolon",
  "'": "Quote",
  "|": "Backslash",
  ",": "Comma",
  ".": "Period",
  "/": "Slash",
  "`": "Backquote",

  Insert: "Insert",
  Delete: "Delete",
  Home: "Home",
  End: "End",
  PageUp: "PageUp",
  PageDown: "PageDown",

  Num0: "Digit0",
  Num1: "Digit1",
  Num2: "Digit2",
  Num3: "Digit3",
  Num4: "Digit4",
  Num5: "Digit5",
  Num6: "Digit6",
  Num7: "Digit7",
  Num8: "Digit8",
  Num9: "Digit9",

  A: "KeyA",
  B: "KeyB",
  C: "KeyC",
  D: "KeyD",
  E: "KeyE",
  F: "KeyF",
  G: "KeyG",
  H: "KeyH",
  I: "KeyI",
  J: "KeyJ",
  K: "KeyK",
  L: "KeyL",
  M: "KeyM",
  N: "KeyN",
  O: "KeyO",
  P: "KeyP",
  Q: "KeyQ",
  R: "KeyR",
  S: "KeyS",
  T: "KeyT",
  U: "KeyU",
  V: "KeyV",
  W: "KeyW",
  X: "KeyX",
  Y: "KeyY",
  Z: "KeyZ",

  small: {
    Num0: "Numpad0",
    Num1: "Numpad1",
    Num2: "Numpad2",
    Num3: "Numpad3",
    Num4: "Numpad4",
    Num5: "Numpad5",
    Num6: "Numpad6",
    Num7: "Numpad7",
    Num8: "Numpad8",
    Num9: "Numpad9",
    NumLock: "NumLock",
    Enter: "NumpadEnter",
    "*": "NumpadMultiply",
    "+": "NumpadAdd",
    "-": "NumpadSubtract",
    ".": "NumpadDecimal",
    "/": "NumpadDivide",
  },

  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",

  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",

  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
}))();

/** 
 * @param {string} Left 
 * @param {string} Right 
 */
function set(Left, Right) {
  return { Left, Right };
}
