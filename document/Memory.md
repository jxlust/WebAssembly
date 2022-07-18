1. WebAssembly memory 线性内存
2. 内存缓冲区Array buffer 共享内存 SharedArrayBuffer
3. WebAssembly memory 一页64kb
4. Create an ArrayBuffer and allocate 1 page (64Kb) of memory
```js
const memory = new WebAssembly.Memory({ initial: 1, shared: true });
```

