/**
 * Created by seal on 12/22/17.
 */
const Hogan = require('hogan.js')
const conf = {
    serverHost: ''
}
const _mm = {
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
    //获取服务器地址
    getServerUrl(path) {
        return `${conf.serverHost}${path}`
    },
    //获取url参数
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
        const result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html模板
    renderHtml(htmlTemplate, data) {
        const template = Hogan.compile(htmlTemplate)
        return template.render(data)
    },
    //成功提示
    successTips(msg='操作成功') {
        alert(msg)
    },
    //错误提示
    errorTips(err='哪里出问题了~') {
        alert(err)
    },
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
    //登录处理
    doLogin() {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`
    },
    goHome() {
        window.location.href = './index.html'
    }
}
module.exports = _mm