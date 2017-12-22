<h1>MMall电商平台开发笔记</h1>
<h2>1.开发环境构建</h2>

`npm install webpack@1.15.0` <br />
`npm install webpack-dev-server --save-dev` <br />
`npm install babel-loader babel-core babel-preset-es2015 --save-dev` <br />

**配置.babelrc文件** `"presets": ["es2015"]` <br />

**ps:** webpack1.x版本只支持babel-loader6.x. <br />
`npm install jquery --save` <br />

**引入jQuery CND，配置webpack.**
```
externals: {
                jquery: 'window.jQuery'
            }
```

**提取公共模块.** <br />
```
plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/base.js'
        })
    ]
```
**webpack对css样式处理**
```
const ExtractTextPlugin = require('extract-text-webpack-plugin')
{
       test: /\.css$/,
       loader: ExtractTextPlugin.extract("style-loader", "css-loader")
}
==plugin==
new ExtractTextPlugin('css/[name].css')
```
**webpack对html文件处理**
```
npm install html-webpack-plugin html-loader --save-dev
```
**修改webpack配置文件**
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getHtmlConfig = function (name) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
==plugin==
new HtmlWebpackPlugin(getHtmlConfig('index')),
new HtmlWebpackPlugin(getHtmlConfig('login')),
```
**ejs语法引入html文件**
`<%= require('html-loader!./layout/html-head.html') %>`  <br />
**webpack对资源文件处理**

`npm install file-loader url-loader`
```
{
     test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
     loader: 'url-loader?limit=100&name=resource/[name].[ext]'
}
```
**webpack配置webpack-dev-server**
```
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
```
**git 分支与tag使用方法**
```
git branch v1.0
git checkout v1.0
git tag tag-dev-initial
git push orgin tag-dev-initial
```


