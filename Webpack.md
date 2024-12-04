# Webpack

## 模块化规范

### commonjs规范

每个文件就是要给模块，有自己的作用域

在模块中使用global定义全局变量，不需要导出，在别的文件也可以访问到

每个模块内部有个modaule变量，这个变量是一个对象，module.exports是对外的接口

通过require加载模块，读取并执行一个js文件，然后放回该模块的export对象

所有代码都运行在模块作用域，不会污染全局作用域

模块可以多次加载，但是指挥在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果，想要让模块再次运行，必须清除缓存

模块加载的顺序，按照在代码中出现的顺序进行



#### module对象

**module.id:**  模块的识别符，通常是带有绝对路径的模块文件名

**module.filename**: 绝对路径 + 模块文件名

**module.loaded:**返回一个布尔值，表示模块是否已经完成加载

**module.parent**： 返回一个对象，表示调用该模块的模块

**module.children：** 返回一个数组，表示调用该模块内用到的其他模块

**module.exports：** 表示模块对外输出的值

**module.paths**: 寻找依赖

**module.path**: 当前绝对路径



```
这里是孙子
 {
  id: 'D:\\学无止境\\webpack\\1\\index2.js',
  path: 'D:\\学无止境\\webpack\\1',
  exports: { jiaoe: '我来人间转一转' },
  filename: 'D:\\学无止境\\webpack\\1\\index2.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\学无止境\\webpack\\1\\node_modules',
    'D:\\学无止境\\webpack\\node_modules',
    'D:\\学无止境\\node_modules',
    'D:\\node_modules'
  ],
  [Symbol(kIsMainSymbol)]: false,
  [Symbol(kIsCachedByESMLoader)]: false,
  [Symbol(kIsExecuting)]: true
}
这是第二层
 {
  id: 'D:\\学无止境\\webpack\\1\\index1.js',
  path: 'D:\\学无止境\\webpack\\1',
  exports: { dingkaile: '大王叫我来巡山' },
  filename: 'D:\\学无止境\\webpack\\1\\index1.js',
  loaded: false,
  children: [
    {
      id: 'D:\\学无止境\\webpack\\1\\index2.js',
      path: 'D:\\学无止境\\webpack\\1',
      exports: [Object],
      filename: 'D:\\学无止境\\webpack\\1\\index2.js',
      loaded: true,
      children: [],
      paths: [Array],
      [Symbol(kIsMainSymbol)]: false,
      [Symbol(kIsCachedByESMLoader)]: false,
      [Symbol(kIsExecuting)]: false
    }
  ],
  paths: [
    'D:\\学无止境\\webpack\\1\\node_modules',
    'D:\\学无止境\\webpack\\node_modules',
    'D:\\学无止境\\node_modules',
    'D:\\node_modules'
  ],
  [Symbol(kIsMainSymbol)]: false,
  [Symbol(kIsCachedByESMLoader)]: false,
  [Symbol(kIsExecuting)]: true
}
这是最外层
 {
  id: '.',
  path: 'D:\\学无止境\\webpack\\1',
  exports: {},
  filename: 'D:\\学无止境\\webpack\\1\\index.js',
  loaded: false,
  children: [
    {
      id: 'D:\\学无止境\\webpack\\1\\index1.js',
      path: 'D:\\学无止境\\webpack\\1',
      exports: [Object],
      filename: 'D:\\学无止境\\webpack\\1\\index1.js',
      loaded: true,
      children: [Array],
      paths: [Array],
      [Symbol(kIsMainSymbol)]: false,
      [Symbol(kIsCachedByESMLoader)]: false,
      [Symbol(kIsExecuting)]: false
    },
    {
      id: 'D:\\学无止境\\webpack\\1\\index2.js',
      path: 'D:\\学无止境\\webpack\\1',
      exports: [Object],
      filename: 'D:\\学无止境\\webpack\\1\\index2.js',
      loaded: true,
      children: [],
      paths: [Array],
      [Symbol(kIsMainSymbol)]: false,
      [Symbol(kIsCachedByESMLoader)]: false,
      [Symbol(kIsExecuting)]: false
    }
  ],
  paths: [
    'D:\\学无止境\\webpack\\1\\node_modules',
    'D:\\学无止境\\webpack\\node_modules',
    'D:\\学无止境\\node_modules',
    'D:\\node_modules'
  ],
  [Symbol(kIsMainSymbol)]: true,
  [Symbol(kIsCachedByESMLoader)]: false,
  [Symbol(kIsExecuting)]: true
}
```



#### export 和module.export的区别

相当于在每个文件中都默认执行了一句

```
var export = module.export
```

当export和module.export同时存在的时候，以module.export为准



文件中直接写

```
export = fucntion () {...}
```

这样是没有意义的，最终导出的还是{}

可以

```
export.aaa =  '丁凯乐'
```

这样添加属性





AMD CMD

很古老了，基本用不上

AMD 主要是通过Requirejs来实现

CMD 主要是通过Seajs来实现



实现的原理是： 

通过js操作dom

在js中，创建<script/>标签，然后把标签中的src改成所需要的地址，这样就实现了动态创建标签，动态加载模块







### UMD

是一种思想，就是一种兼容commonjs, AMD. CMD的兼容写法

一般开发node包都是选择UMD规范





### es6 module

默认开启严格模式

import的属性是只读的，类似于const声明 了一个接收变量，虽然不能改变它的引用，但是可以改里面的属性

export和import必须位于模块顶级，不能位于作用域内，例如if语句当中



在nodejs中，要是想用ES6 module的形式加载文件，那么模块文件需要以.mjs后缀名结尾。

NodeJs中遇到.mjs文件，就认为它是一个ES6模块，默认启用严格模式，不必在每个文件顶部指定“use strict"

[Module 的语法 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/module)



### ES6module和Commonjs的区别

CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用

CommonJs模块运行时加载，ES6模块是编译时输出接口；所以ES6必须是写死的，而CommonJs的文件名可以是一个变量。可以动态确定资源路径

CommonJs模块的require()是同步加载模块，ES6模块的imoprt命令是异步加载，有一个独立的模块依赖的解析阶段



## Webpack打包流程

**输入：** 从文件系统读入代码文件

**模块处理：** 模块递归处理，调用loader转义Module内容，并将结果转换为AST，从中分析出模块依赖关系，进一步递归调用模块处理过程， 直到所有依赖文件都处理完毕

**后处理：** 所有模块递归处理完毕后，开始执行后处理，包括模块合并、注入运行时、产物优化等、最终输出Chunk集合

**输出：** 将Chunk写出到外部文件系统



## Npx命令

npm只能管理包的依赖， npx则可以快捷的运用包中的命令行工具和其他可执行文件，让项目内部安装的模块用起来更方便

比方说

```
npx create-react-app dingkailetest
```

首先寻找本地的create-react-app版本，有则使用

没有找到，就会直接下载最新版本放在缓存里，下载完成后执行

使用完成后将缓存完全清除，不会在本机或者项目留下任何东西

这样就不会污染本机，永远使用最新版本的dependency



### 总结

方便的执行可执行依赖

可以无需安装，直接执行，并且自动删除，避免造成依赖污染

可以指定版本执行

## 安装依赖的位置

npm install xxx --save 生产环境依赖

例如： react   react-dom   redux   lodashasa



npm install xxx  --save-dev  开发依赖

例如 webpack   dev-server   eslint



