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



## webpack主流程

### 与打包流程强相关的配置项：

**输入输出：**

​	**entry：** 用于定义项目入口文件

​	**context：**项目执行上下文路径

​	**output：** 配置产物输出路径

**模块处理**

​	**resolve：**用于配置模块路径解析规则，可用于帮助Webpack更精准，高效的找到模块

​	**module：** 用于配置模块加载规则， 例如针对什么类型的资源需要使用那些Loader进行处理

​	**externals：** 用于声明外部资源，webpack会直接胡虏肉这部分资源，跳过这些资源的解析、打包操作

**后处理**

​	**optimization：** 用于控制如何 **优化产物包体积** ， 内置Dead Code Elimination、 Scope Hosting、 代码混淆、代码压缩等功能

​	**target：** 用于配置编译产物的目标运行环境，支持web、 node、 electron等值，不同值最终产物会有所差异

​	**mode**：编译模式短语，支持development、production等值， 可以理解为一种声明环境的短语



### 工具类配置

**开发效率** 

​	**watch：** 用于配置持续监听文件变化，持续构建

​	**devtool：** 用于配置产物Sourcemap生成规则

​	**devServer：** 用于配置HMR强相关的开发服务器功能

**性能优化类**

​	**cache：** Webpack5之后，该项用于控制如何缓存编译过程信息与编译结果

​	**performance：** 用于配置当产物大小超过阈值时，如何通知开发者

**日志类**

​	**stats：** 用于精确地控制编译过程的日志内容，在做比较细致的性能调试时非常有用

​	**infrastructurelogging：** 用于控制日志输出方式， 例如如何通过该配置，将日志输出到磁盘文件 





## webpack初始化命令

```
npx webpack init ./ --force --template=default
```

在webpack5以上，除了安装webpack之外还要安装webpack-cli 命令行工具







## 插件

### mini-css-extract-plugin

把样式代码生成一个css文件的插件

如果不适用这个插件，而是使用的style-loader的话，就不会生成一个css样式文件，而是打包到js文件当中，由js语句动态的写入<style/>标签来添加样式的



**安装**

```
npm i mini-css-extract-plugin -D
```

**实例化插件**

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

**注册插件**

```
plugin: [new MiniCssExtractPlugin()]
```

**使用插件**

```
module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      }
    ]
}
```

**总结**

在实际开发中，一般使用style-loader,  MiniCssExtractPlugin用于生产环境。因为style-loader不能用于cdn缓存，而后者可以生成一个单独的文件。这样的花，在浏览器加载资源时是可以并发的，并且我们的资源文件是可以浏览器缓存的。



### postcss

使用插件

```
module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }
    ]
}
```

#### 配置插件

在根目录创建一个 postcss.config.js文件

**添加前缀**：

```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

需要安装

```
npm i autoprefixer -D
```



**cssnext  (css4)**

包含自动添加前缀功能

```
module.exports = {
  plugins: [
    require('postcss-cssnext')
  ]
}
```

需安装

```
npm i postcss-cssnext -D
```



### babel

**安装**

```
npm i @babel/preset-react -D
```

**配置**

在根目录创建一个babel.config.json文件

```
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

在webpack.config.js中

```
 {
    
    
    
      loader: 'babel-loader'
    }
  }
```



### HTML Webpack Plugin

配置了这个插件之后，webpack打包的inde.html文件会自动的link生成的main.js和main.css

**安装**

```
npm i html-webpack-plugin -D
```

**实例化**

```
const HtmlWebpckPlugin = require('html-webpack-plugin')
```

**注册**

```
  plugins: [
    new HtmlWebpckPlugin({
    	template: './index.html'
    })
  ],
```



## devServer

**安装**

```
npm i webpack-dev-server -D
```

**配置**

创建一个新的webpack.config2.js

```
mode: 'development'
devServer: {
    static: {
      directory: path.join(__dirname, 'publics'), // 指定静态资源文件
    },
    compress: true,
    port: 9000
},
```

**运行**

```
npx webpack serve --config webpack.config2.js
```



# 自己配react

创建项目

```
npx create-react-app dingkaile
```

首先删除掉

```
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
```

写入

```
"my_dev": "webpack serve --config webpack.config.dev.js",
```

创建webpack.config.dev.js文件

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { devServer } = require('../../实践出真知/webpack.config');

const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'development',
  cache: {
    type: 'memory'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  performance: {
    hints: 'warning', // 枚举
    hints: 'error', // 性能中抛出错误
    hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型（单位为字节，默认值是：250000（或者250kb））
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets:
          //     ['@babel/preset-env', '@babel/preset-react']
          // }
        }
      },
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtractPlugin.loader, 'css-loader'],
          "style-loader",
          "css-loader"
          // "./loader",
          // "postcss-loader",
          // {
          //   loader: 'less-loader',
          // }
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset'
      }
    ]
  }
}

module.exports = config;

```

创建babel.config.json文件

```
{
  "presets": [
    ["@babel/preset-react", { 
      "runtime": "automatic" 
    }]
  ]
}
```

