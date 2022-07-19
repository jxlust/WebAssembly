declare function myLog(n: i32): void;
export enum Control {
  Left = 1,
  Right = 2,
  Top = 3,
  Bottom = 4,
}
export const CANVAS_WIDTH: i32 = 100;
export const CANVAS_HEIGHT: i32 = 100;
export const CANVAS_SIZE: i32 = CANVAS_WIDTH * CANVAS_HEIGHT * 4;
export const CANVAS_POINTER: i32 = 0; //指针内存从零开始
memory.grow(1); //新增一页大小+64kb
function start(): void {
  for (let i = 0; i < CANVAS_HEIGHT; i++) {
    for (let j = 0; j < CANVAS_WIDTH; j++) {
      //第几个点
      let p = i * CANVAS_WIDTH + j;
      //索引
      let pIndex = p * 4;
      //RGBA
      store<u8>(CANVAS_POINTER + pIndex + 0, 255);
      store<u8>(CANVAS_POINTER + pIndex + 1, 0);
      store<u8>(CANVAS_POINTER + pIndex + 2, 0);
      store<u8>(CANVAS_POINTER + pIndex + 3, 255);
    }
  }
}

function update(control: Control): void {
  myLog(control);
}

function getCanvasBuffer(n: i32): u8 {
  return load<u8>(n);
}

export { update, start, getCanvasBuffer };
