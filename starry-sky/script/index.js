const WIDTH = 334,
  HEIGHT = 334;
const SIZE = WIDTH * HEIGHT;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = HEIGHT;
canvas.width = WIDTH;

let rafId = null;
let rafStartTime = 0;
const randomInt = (n) => {
  return (Math.random() * n) | 0;
};

const initMemory = new WebAssembly.Memory({
  initial: 8,
  // maximum: 100,
});

async function loaderTheWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("../build/release.wasm"),
    {
      env: {
        memory: initMemory,
        "Math.random": Math.random,
        abort(e) {
          console.log("abort:", e);
        },
      },
      index: {
        myLog(n) {
          console.log(n);
        },
      },
    }
  );
  return instance?.exports;
}

function update(wasm, memoryArrayBuffer, imageData) {
  wasm.update(wasm[curControl]);
  const sliceBuffer = memoryArrayBuffer.slice(
    wasm.CANVAS_POINTER.valueOf(),
    wasm.CANVAS_SIZE.valueOf()
  );
  // ctx.clearRect(0, 0, WIDTH, HEIGHT);
  imageData.data.set(sliceBuffer);
  //   rgba32.set(mem.subarray(0, SIZE));
  ctx.putImageData(imageData, 0, 0);
}
function initScene(wasm, memoryArrayBuffer, imageData) {
  wasm.start();
  const sliceBuffer = memoryArrayBuffer.slice(
    wasm.CANVAS_POINTER.valueOf(),
    wasm.CANVAS_SIZE.valueOf()
  );
  imageData.data.set(sliceBuffer);
  //   rgba32.set(mem.subArray(0, SIZE));
  ctx.putImageData(imageData, 0, 0);
}

async function start() {
  const module = await loaderTheWasm();
  console.log(module);
  const { memory } = module;
  //初始化对应的内存数据，用于传递到wasm里处理
  // 32bit => 8bit color * 4 (RGBA)
  //   const memoryArrayBuffer = new Uint8Array(memory.buffer);
  const memoryArrayBuffer = new Uint8ClampedArray(memory.buffer);
  console.log("memoryArrayBuffer:", memoryArrayBuffer);
  const imageData = ctx.createImageData(WIDTH, HEIGHT);

  initScene(module, memoryArrayBuffer, imageData);
  //   const updateCallBack = (timestamp) => {
  //     // console.log("raf call:", timestamp);
  //     if (rafStartTime === 0) {
  //       rafStartTime = timestamp;
  //     }
  //     let diff = timestamp - rafStartTime;
  //     //diff 0代表第一次也要执行
  //     if (diff >= 1000 || diff === 0) {
  //       rafStartTime = timestamp;
  //       update(module, memoryArrayBuffer, imageData);
  //     }
  //     rafId = window.requestAnimationFrame(updateCallBack);
  //   };
  //   rafId = window.requestAnimationFrame(updateCallBack);
}

start();
