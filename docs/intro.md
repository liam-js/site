---
sidebar_position: 1
---

# 开始

## 模板代码
一个最简单的页面模板代码，如下：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Liam</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/@liam-js/liam/dist/app.production.min.js"></script>
    <script>
      liamRequire(['liam'], function (Liam) {
        Liam.render(
          // highlight-start
          // 区块
          {
            type: 'h1',
            children: 'Hello, world!',
          },
          // highlight-end
          document.querySelector('#root')
        );
      });
    </script>
  </body>
</html>
```
**[在 Codepen 上试一下 ](https://codepen.io/chancedai/pen/YzaOPKB?editors=1010)**

:::info

模板代码中，其中高亮部分，可以使用 [Liam.render](api#render) 来渲染的代码，我们称之为 `区块`，它的示例参考 [区块示例](block/snippets)，支持字段，可以参考 [区块字段](block/members).

:::
