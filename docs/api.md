---
sidebar_position: 2
---

# API

## Liam
### render() {#render}

```js
render(blockJs, node)
```
用于把区块（blockJs）渲染到页面某个节点(node)上，如

```js
render({
  type: 'h1',
  children: 'Hello, world!'
}, document.querySelector('#root'));
```

:::tip

如果 **blockJs** 参数是一个文本格式，需要先使用 [`toJs`](#to-js) 方法把它转换成 js.

:::
### toJs() {#to-js}
```js
toJs(blockText, variables)
```

把（区块）文本转成（区块） js,  variables,为转化过程中注入的变量，默认注入了 `Liam`, `React` 和 `ReactDOM`, 转化结果一般用于 [`Liam.render`](#render) 渲染，如

```js
 const blockJs = toJs(`
  {
    type: 'h1',
    // React 为 toJs 注入的变量，所以可以使用
    children: text
  }
`, {
  text: 'Hello, world!'
})
```

### createElement() {#create-element}
```js
createElement(blockJs)
```

把区块（blockJs）转成 Element 元素,  可以在使用 React 开发时，引入区块使用，如

```jsx
const blockElement = createElement({
  type: 'h1',
  children: 'Hello, world!'
});

// React 函数组件
function Demo(){
  return (
    <>
    // highlight-start
    { /* 可以和原生的 React jsx 混用 */ }
    {blockElement}
    // highlight-end
    <p>很不错：）</p>
    </>
  )
}
```

### config() {#config}
```js
config({

  // 全局状态
  states,

  // 通过区块信息获取组件（类似中间件）
  getComponent,

  // 组件名（type）映射
  componentMap,

  // 默认为 false;是否用组件包裹文字，一般用于调试使用；
  // 某些组件启用此功能时会出错，上线时建设置为 false
  wrapText
});
```

| **成员** 	| **说明** 	| **类型** 	| **默认** 	|
|------	|------	|------	|------	|
| states | 全局状态，之后在可在区块中使用 [`Liam.get('mode')`](#get) 和 [`Liam.set('mode', 'light')`](#set),来获取或设置相应的值；| object 	| {} |
| getComponent |  通过区块信息获取组件（组件中间件），<br/>每设置一次会添加一个组件中间件，后设置先调用	| function	| [内置一个中间件](#block/members#type)|
| componentMap | 组件名（type）映射，每设置一次会和之前的 componentMap 合并 | object	| {} |
| wrapText | 是否用组件包裹文字，一般用于调试使用,<br/>某些组件启用此功能时会出错，上线时建设置为 false	| boolean  	| false     	|

示例：

```jsx
config({

  // 全局状态
  states: {
    mode: 'dark'
  },

  // 通过区块信息获取组件（类似中间件）
  getComponent: function (ctx, next) {
      const { schema } = ctx;
      if (schema.type && schema.type === 'Demo') {

        // 如果有组件匹配，则设置 ctx.component 为组件，
        // 后续的中间件不再处理
        ctx.component = Demo;
      }
      next();
    },

  // 组件名（type）映射，这里设置了 rc, 后续的区块里的 type 如果写成 ‘rc#ResponsiveContainer’，
  // 则会映射为 ‘url#https://e.sinaimg.cn/ssfe/unpkg/recharts@2.1.10/umd/Recharts.js
  // #ResponsiveContainer’
  componentMap: {
    'rc': 'url#https://e.sinaimg.cn/ssfe/unpkg/recharts@2.1.10/umd/Recharts.js'
  },

  // 默认为 false;是否用组件包裹文字，一般用于调试使用；
  // 某些组件启用此功能时会出错，上线时建设置为 false
  wrapText: true
});
```

### set() {#set}
```js
set(key,value)
```

设置全局状态，如：

```jsx
set('mode','dark');
```

:::tip

如果想在设置全局状态时，触发某个区块更新，需要要在区块的 [全局状态依赖字段 s](block/members#s) 中设置状态名。

:::

### get() {#get}
```js
get(key,value)
```

获取全局状态，如：

```jsx
get('mode');
```

### on() {#on}
```js
const eventId = on(eventName,eventCallback)
```

绑定自定义事件，eventName 为事件名，eventCallback 为事件回调，其中的回调参数为 [trigger](#trigger) 的数据，返回的 eventId 可使用 [offById](#off-by-id) 解绑事件，如：

```jsx
const eventId = on('dataLoaded',function(data){
  console.log(data);
});
```

### off() {#off}
```js
off(eventName,eventCallback)
```

解绑自定义事件，eventName 为事件名，eventCallback 为使用 [on](#on) 绑定时的事件回调，如果绑定时有 eventId 可使用 [offById](#off-by-id) 解绑事件，如：

```jsx
const eventCallback = function(data){
  console.log(data);
}; 

// highlight-next-line
off('dataLoaded',eventCallback);
```

### offById() {#off-by-id}
```js
offById(eventName,eventCallback)
```

通过事件 id 解绑自定义事件，eventId 为使用 [on](#on) 绑定事件时返回的id，如：

```jsx
const eventId = on('dataLoaded',function(data){
  console.log(data);
});

// highlight-next-line
offById('eventId');
```

### trigger() {#trigger}
```js
trigger(eventName,eventData)
```

触发自定义事件，eventName 为事件名，eventData 为传给使用 [on](#on) 绑定的回调函数的数据，如：

```jsx
const eventId = on('dataLoaded',function(data){
  // {name:'liam'}
  console.log(data);
});

// highlight-start
trigger('dataLoaded', {
  name: 'liam'
});
// highlight-end
```



