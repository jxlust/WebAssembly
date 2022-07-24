import bgMoon from "./assets/bgMoon";
// import bgTree from './assets/bgTree';
declare function myLog(n: i32): void;
memory.grow(1); //新增一页大小+64kb

export const CANVAS_WIDTH: i32 = 334;
export const CANVAS_HEIGHT: i32 = 334;
export const CANVAS_SIZE: i32 = CANVAS_WIDTH * CANVAS_HEIGHT * 4;
export const CANVAS_POINTER: i32 = 0; //指针内存从零开始

function arrayIndex(x: i32, y: i32, w: i32, h: i32): i32 {
  // [0,0] is in the left bottom corner
  return (h - 1 - y) * w * 4 + x * 4;
}
function drawBackground(image: u8[], imageOffsetX: i32 = 0): void {
  //索引

  for (let i = 0; i < CANVAS_HEIGHT; i++) {
    for (let j = 0; j < CANVAS_WIDTH; j++) {
      //第几个点
      let p = i * CANVAS_WIDTH + j;
      //索引
      let pIndex = p * 4;
      //RGBA
      store<u8>(CANVAS_POINTER + pIndex + 0, image[pIndex]);
      store<u8>(CANVAS_POINTER + pIndex + 1, image[pIndex + 1]);
      store<u8>(CANVAS_POINTER + pIndex + 2, image[pIndex + 2]);
      store<u8>(CANVAS_POINTER + pIndex + 3, 255);
    }
  }
}

function start(): void {
  //初始化内存数据
  //   for (let i = 0; i < CANVAS_HEIGHT; i++) {
  //     for (let j = 0; j < CANVAS_WIDTH; j++) {
  //       //第几个点
  //       let p = i * CANVAS_WIDTH + j;
  //       //索引
  //       let pIndex = p * 4;
  //       //RGBA
  //       store<u8>(CANVAS_POINTER + pIndex + 0, 255);
  //       store<u8>(CANVAS_POINTER + pIndex + 1, 0);
  //       store<u8>(CANVAS_POINTER + pIndex + 2, 0);
  //       store<u8>(CANVAS_POINTER + pIndex + 3, 255);
  //     }
  //   }
  myLog(bgMoon.length);
  drawBackground(bgMoon);
}

function setColorStore(ptr: i32, R: i32, G: i32, B: i32, A: i32): void {
  store<u8>(CANVAS_POINTER + ptr + 0, R);
  store<u8>(CANVAS_POINTER + ptr + 1, G);
  store<u8>(CANVAS_POINTER + ptr + 2, B);
  store<u8>(CANVAS_POINTER + ptr + 3, A);
}
function getRandomInt(i: i32, start: i32): i32 {
  return (<i32>(Math.random() * i)) | (0 + start);
}

function update(): void {
  myLog(22222);
  //格子变换
  //每一次动画生成随机颜色
  let darkValueRed: i32 = getRandomInt(100, 0);
  let darkValueGreen: i32 = getRandomInt(100, 0);
  let darkValueBlue: i32 = getRandomInt(100, 0);
  let lightValueRed: i32 = getRandomInt(127, 127);
  let lightValueGreen: i32 = getRandomInt(127, 127);
  let lightValueBlue: i32 = getRandomInt(127, 127);

  for (let i = 0; i < CANVAS_HEIGHT; i++) {
    for (let j = 0; j < CANVAS_WIDTH; j++) {
      let isDark: bool = true;
      // 偶数行 偶数列是深色
      // 奇数行 偶数列是亮色
      if (i % 2 === 0) {
        isDark = false;
      }
      if (j % 2 === 0) {
        isDark = !isDark;
      }

      //第几个点
      let p = i * CANVAS_WIDTH + j;
      //当前点开始的内存位置（索引）
      let pIndex = p * 4;
      let squraeColorRed: i32 = darkValueRed;
      let squraeColorGreen: i32 = darkValueGreen;
      let squraeColorBlue: i32 = darkValueBlue;
      //   let squraeColor: ColorInfo = new ColorInfo(60, 60, 60, 255);
      //let squraeColorAlpha: i32 = 255;
      //透明度255
      if (!isDark) {
        //亮色 light
        squraeColorRed = lightValueRed;
        squraeColorGreen = lightValueGreen;
        squraeColorBlue = lightValueBlue;
      }
      setColorStore(
        pIndex,
        squraeColorRed,
        squraeColorGreen,
        squraeColorBlue,
        255
      );
    }
  }
}

function getCanvasBuffer(n: i32): u8 {
  return load<u8>(n);
}

export { update, start, getCanvasBuffer };
