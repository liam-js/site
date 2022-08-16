---
sidebar_position: 3
---

# 区块字段

| **成员** 	| **说明** 	| **类型** 	| **默认** 	|
|------	|------	|------	|------	|
| type | 组件信息，[`Liam`](/docs/api)会通过它来获取到真实的组件 | react component &#124 promise instance  &#124 string	|  |
| props | 组件属性	| object	| {} |
| children| 子节点 | [`block`](/docs/block) &#124 [`block`](/docs/block)[]	|  |
| n | 用于标识 props 里哪些属性是 [`block`](/docs/block)，最终会渲染成一个节点（node） | string &#124 string[] |
| r | 用于标识 props 里哪些属性是渲染函数，执行渲染后，会渲染成一个节点（node） | string &#124 string[] |
| s | 用于标识该 [`block`](/docs/block) 依赖哪些全局状态，当这些状态改变时，会重新渲染该 [`block`](/docs/block) | string &#124 string[] |
| w | 是否允许包裹组件,如渲染时多包裹一个容器用于统计等 | boolean | false |
| c | 当组件渲染返回的结果是 [`block`](/docs/block) 时，自动转换成 React Element | boolean | true |

## type {#type}
组件信息，如
```js live
[
  (function () {
    Liam.config({
      componentMap: {
        mui: 'url#https://e.sinaimg.cn/ssfe/unpkg/@mui/material@5.8.3/umd/material-ui.production.min.js',
      },
    });
  })(),
  {
    // react component
    type: function(){
      return 'react component'
    }
  },
  { type: 'hr'},
  {
    // promise instance
    type: new Promise(function(resolve){
      setTimeout(function(){
        resolve(function(){
          return 'promise instance';
        });
      }, 2e3);
    })
  },
  { type: 'hr'},
  {
    // string，会使用 Liam.config 的 componentMap,
    // getComponent 来获取真实组件
    type: 'mui#Alert',
    props: {
      severity: 'success',
    },
    children: 'This is a success message!',
  },
]
```
:::info

type 如果不是组件或 promise 实例时，需要配置 [`Liam.config 的 getComponent`](/docs/api#config) 和 [`Liam.config 的 componentMap`](/docs/api#config)，来获取真实的组件。

:::

##  props {# props}
组件属性，如
```js live
[
  {
    type: 'div',

    // 组件属性
    props: {
      style: {
        border: '2px dashed #666',
        width: '100px',
        height: '100px'
      }
    }
  },
]
```

##  children {# children}
组件属性，如
```js live
[
  {
    type: 'div',

    // 组件属性
    props: {
      style: {
        border: '2px dashed #666',
        width: '100px',
        height: '100px'
      }
    },

    // 子节点
    children: {
      type: 'div',

      // 组件属性
      props: {
        style: {
          margin: '24px auto',
          border: '2px dashed #666',
          width: '50px',
          height: '50px'
        }
      },
    }
  },
]
```

## n {#n}
组件信息，如
```js live
[
  {
    // react component
    type: function(props){
      console.log(props,'为什么');
      return React.createElement(
        'div',
        null,
        props.title,
        props.line,
        props.content
      )
    },
    props: {
      title: {
        type: 'h3',
        children: '标题'
      },
      line: {
        type: 'hr'
      },
      content: {
        type: 'p',
        children: '真只同高为才国，原所太何瞠生哥不事回让他玉乡亲九选久不，看不不起，丰姑不就啊一生斗衣登法杀破，上派身壬地他你太可先接他他为定妄着婵，之临杨资死逃畴最国高者在兄耳通十并德赐，人下三自葬见不当九中张故游到听求者秦，韩斯大肯娘，蒲耐松千力皇未派德更日揽着互，孔。'
      }
    },
    n: ['title', 'line', 'content']
  },
  
]
```

## r {#r}
指明渲染属性，如
```js live
[
  {
    // react component
    type: function(props){
      console.log(props,'为什么');
      return props.renderFn();
    },
    props: {
      renderFn: function(){
        return {
          type: 'p',
          children: '真只同高为才国，原所太何瞠生哥不事回让他玉乡亲九选久不，看不不起，丰姑不就啊一生斗衣登法杀破，上派身壬地他你太可先接他他为定妄着婵，之临杨资死逃畴最国高者在兄耳通十并德赐，人下三自葬见不当九中张故游到听求者秦，韩斯大肯娘，蒲耐松千力皇未派德更日揽着互，孔。'
        };
      }
    },
    r: 'renderFn'
  },
  
]
```

## s {#s}
指明依赖的全局属性，如
```js live noInline
[
  (function(){
    setInterval(function(){
      Liam.set('time', new Date().toLocaleString());
    },1e3)
  })(),
  {
    // react component
    type: function(){
      return Liam.get('time');
    },
    s: 'time'
  },
  
]
```
:::info

如何获取和设置全局属性，可以分别参考配置 [`Liam.get`](/docs/api#get) 和 [`Liam.set`](/docs/api#set)。

:::

## w {#w}
是否包裹组件，如
```js
{
  type: 'h1',
  children: '标题',
  // highlight-next-line
  w: true
},
```

## c {#c}
当组件 render [`block`](/docs/block) 时，是否自动转换成 React Element，如
```js
{
  type: function(){
    return React.createElement(
      'h1',
      null,
      '标题'
    );
  },
  // highlight-next-line
  c: false
},
```
