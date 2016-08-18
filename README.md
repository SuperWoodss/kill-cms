![kill-cms.logo.png](project.logo/kill-cms.logo.png)

# kill-cms

Just kill cms 🎯🔪

## How to use?

### 直接访问网址即可使用：

<https://xinhuaradiolab.github.io/kill-cms/>

### 本地开发方法

1. 安装npm依赖(需要node.js v4.4.x)

  ```
  $ npm install
  ```

2. 启动`Makefile`配置的`browser-sync` web server和`babel` ES6，它们同时会编译生成带有`.min`后缀的js和css到 _**bundle**_ 文件夹：

  ```
  $ make all
  ```

3. 开启一个新的进程，运行grunt压缩：

  ```
  $ grunt
  ```

## Marks

_**摘要、副标题和列表循环需要如下的特殊标记才能生效：**_

- 摘要 `class="abs"`

- 副标题 `class="subTitle"`

- 列表 `<ul>`

  注意：

  - (`<ul>`和其中的`li`均不受class影响，同时可以自动过滤空class)
  - 可以自动识别循环

  举个例子：

  ```html
    <ul>
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>
  ```

  将自动设置输出 `Repeat Begin=0 End=3`

kill-cms 能够自动识别大部分代码并转译，如果你想添加 _**特殊识别规则**_ 请联系我，非常感谢！
