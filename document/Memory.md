1. WebAssembly memory 线性内存
2. 内存缓冲区 Array buffer 共享内存 SharedArrayBuffer
3. WebAssembly memory 一页 64kb
4. Create an ArrayBuffer and allocate 1 page (64Kb) of memory

5. 外部导入 memory

```js
//初始大小为 1 页（64KB），最大值设置为 10 页（640KB）
const memory = new WebAssembly.Memory({ initial: 1, maximum: 10 });
//导入对象
const importObj = {
  env: {
    memory,
  },
};
//pk 命令配置 --importMemory
//Math函数的使用 --use Math=JSMath
```

> 注意：没有加--importMemory 是导入不了的

6. 内部自己定义 memory

```js
//index.ts得声明内部内存大小
//再扩容2页大小，扩容 2 * 64 KB,扩容后是3页大小，因为initial：1
memory.grow(2); //2页 64 * 2 kb
//写入内存
store < u8 > (0, 22);
store < u8 > (1, 88);

//读取内存
function readMemory(n: i32): i32 {
  const valueAtIndex = load < u8 > n;
  return valueAtIndex;
}

//use.js
let { memory } = await loaderTheWasm();
const arrayBuffer = new Uint8Array(memory.buffer);
arrayBuffer[0] = 100;
```

> pk 命令配置

```
asc assembly/index.ts --target release --use Math=JSMath --exportRuntime -O3 --runtime stub --importMemory --sourceMap --measure
```

7. 共享内存 shared: true

```
--shared-memory --import-memory --max-memory=2130706432
```

内存的 buffer 属性现在将返回 SharedArrayBuffer，而不是通常的 ArrayBuffer：
https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format#shared_memories
