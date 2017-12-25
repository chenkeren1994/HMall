<h1>MMall电商平台开发笔记</h1>
<h2>1.开发环境构建</h2>

```
npm install webpack@1.15.0
npm install webpack-dev-server --save-dev
npm install babel-loader babel-core babel-preset-es2015 --save-dev
```
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
git push orgin tag tag-dev-initial
```

<h3>知识点总结：</h3>
* git仓库的建立和项目目录的划分
* npm使用
* webpack使用

<h2>2.通用模块的设计和拆分</h2>

**通用js工具的封装**

```
const _mm = {
   
    //登录处理
    doLogin() {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`
    }
}
module.exports = _mm
```

* 网络请求工具

```
 //网络请求
    request(param) {
        const _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success(res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin()
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error(err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
```

* URL路径工具

```
//获取url参数
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
        const result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
```

* 模板渲染工具--hogan  <br />

`npm install hogan --save`
```
const Hogan = require('hogan.js')
//渲染html模板
renderHtml(htmlTemplate, data) {
    const template = Hogan.compile(htmlTemplate)
    return template.render(data)
},
```

* 字段验证&&通用提示

```
//字段验证
    validate(value, type) {
        let val = $.trim(value)
        //非空验证
        if ('require' === type) {
            return !!val
        }
        if ('phone' === type) {
            return /^1\d{10}$/.test(val)
        }
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)
        }
    },
```

* 统一跳转

```
doLogin() {
   window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`
},
goHome() {
   window.location.href = './index.html'
}
```
**页面布局**

* 适用于登录、注册、通用提示等页面
* 商品展示、下单、购物车等页面
* 个人中心等页面

**页面布局技巧**

* 定宽布局

```
.w{
    width: 1080px;
    margin: 0 auto;
    display: relative;
    overflow: hidden;
}
```
* 通用部分抽离
* icon-font的引入
```
npm install font-awesome --save
 
alias:
    node_modules: `${__dirname}/node_modules`,
require('node_modules/font-awesome/css/font-awesome.min.css')
```
* 通用样式定义

**通用导航条开发**

absolute定位，脱离文档流，默认定位在前一个元素的末尾。

**通用页面头部**

**通用侧边导航开发**

**操作结果提示页**
```
通过htmlWebpackPlugin获取webpack配置文件中的参数
<title><%= htmlWebpackPlugin.options.title %> - happymmall电商平台</title>
 
获取相应操作的提示信息
$(function () {
    let type = _mm.getUrlParam('type') || 'default',
        $element = $(`.${type}-success`)
    $element.show()
})
```

**nav逻辑层开发**
```
const nav = {
    init(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadUserInfo()
        return this
    },
    bindEvent() {
        //登录
        
    },
    loadUserInfo() {
 
    },
    loadCartCount() {
 
    }
}
module.exports = nav
```
<h3>知识点总结：</h3>
* 通用模块拆分思路
* 通用js工具类的封装
* 通用页面layout开发
* 通用组件开发
* 通用操作结果页开发

<h2>3.用户模块设计</h2>
**用户模块涉及的页面** <br />

* 登录
* 注册
* 找回密码
* 个人中心
* 修改密码

**登录**  <br />

字段验证，提交后端接口，错误处理。

**注册**  <br />

异步验证，字段验证，错误处理。

**找回密码** <br />

输入账号，获取提示问题。

输入提示问题答案，进行验证。验证成功后返回token

提交修改后的密码和token。

**个人中心** <br />

获取用户信息

修改用户信息

**修改页面** <br />

根据原密码和新密码来更新用户密码。

由于表单是由js渲染进来，所以必须绑定document时间。
```
bindEvent () {
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',() => {
            let userInfo = {
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val())
            },
            validateResult = this.validateForm(userInfo)
            if (validateResult.status){
                _user.updateUserInfo(userInfo,(res,msg) => {
                    _mm.successTips(msg)
                    window.location.href = './user-center.html'
                },(errMsg) => {
                    _mm.errorTips(errMsg)
                })
            }else {
                _mm.errorTips(validateResult.msg)
            }

        })
    },
```

<h3>总结<h3/>

* 用户登录
* 用户注册
* 密码找回
* 个人中心
* 修改密码

<h2>3.商品模块设计</h2>
* 商品列表页
    1. 按名称/种类搜索
    2. 按价格/默认排序
    
* 商品详情页
    1. 根据productId展示商品详情
    2. 加入购物车




