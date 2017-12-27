
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)
const getHtmlConfig = function (name, title) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['common', name],
        title
    }
}
const config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        jquery: 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test: /\.string/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: `${__dirname}/node_modules`,
            util: `${__dirname}/src/util`,
            page: `${__dirname}/src/page`,
            service: `${__dirname}/src/service`,
            image: `${__dirname}/src/image`,
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '密码重置')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '密码修改')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
    ]
}
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config