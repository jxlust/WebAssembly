### Wasm String or Other Object

依赖库npm地址[https://www.npmjs.com/package/@assemblyscript/loader](https://www.npmjs.com/package/@assemblyscript/loader)

```shell
#安装loader，提供了很多方法可以解析
npm i -S @assemblyscript/loader
```

```js
//cdn
<script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>
```

<details>
  <summary>Loader</summary>
  
1. wasm 对于其他复杂数据类型, 他们指向的位置是内存指针，没有字符串等的概念
2. 字符串是高级编程的概念
3. wasm 一切核心是数字，只是在处理数字
4. 保存了对字符串的引用，详情可以查看wat文件
5. loader加载后的实例对象，新增了一些内部解析方法，比如__getString，可以通过指针（引用地址）获取内存的字符串的值
6. pk命令需要导出运行时：--exportRuntime

<details>
<summary>__getString 源码</summary>

```js
function__getString(ptr) {
    if (!ptr) return null;
    // Get reference to wasm memory
    const buffer = memory.buffer;
    // Load wasm memory buffer into a 32 bit unsigned integer array
// The memory location of the string is at pointer + the runtime header offset
// The location is then zero fill right shifted
    const id = new Uint32Array[buffer](ptr + ID_OFFSET >>> 2);
    if (id !== STRING_ID) throw Error(`not a string: ${ptr}`);
    return getStringImpl(buffer, ptr);
  }
//可以去node_modules源码查看
```
