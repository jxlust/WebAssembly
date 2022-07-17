1. 实例化第二个参数可以导入自定义对象
2. 比如 abort 函数，外部执行触发回调
3. 导入外部 log 方法 console
4. js 全局函数 Math 等

> as 的模块化注意事项
> 导入的对象必须申明，否则会报导入错误。坑了我很久
> 比如：Other模块中使用了自己定义的log方法，importObj必须在Other模块下申明log方法的回调

```js
// eg:
let importObj = {
    Other: {
        log(i) {},
        },
    env: {
        xxxx(){}
        },
    index: {...},
};
//对应assembly下的index 、Other、env文件
//回调方法比如log也必须 declare 全局申明
```
