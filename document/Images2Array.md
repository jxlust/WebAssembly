1. npm 库 pngjs 安装
2. node 读写文件操作
3. node 从 images 资源目录读取所有 png 文件
```js
const imagesDir = fs.readdirSync(sourceDir);
```
4. 遍历读文件，使用 pngjs 库读取到图片信息

```js
const file = fs.readFileSync(filePath);
const png = PNG.sync.read(file);
```

5. 读取到 16 进制的数据，存入 rgba 数据

```js
for (let i = 0, l = data.length; i < l; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];

  colorArray.push(`${r}, ${g}, ${b}, ${a}`);
}
```

6. 写入对于输出目录 assets

```js
fs.writeFileSync(`${targetDir}${filename}.ts`, dataStr);
```
