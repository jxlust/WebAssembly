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
