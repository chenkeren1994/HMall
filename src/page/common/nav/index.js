/**
 * Created by seal on 12/22/17.
 */
require('./index.css')
const _mm = require('util/mm')
const _user = require('service/user-service')
const _cart = require('service/cart-service')
const nav = {
    init(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartCount()
        return this
    },
    bindEvent() {
        //登录
        $('.js-login').click(() => _mm.doLogin())
        //注册
        $('.js-register').click(() => window.location.href = './user-register.html')
        //退出
        $('.js-logout').click(() => _user.logout((res) => {
            window.location.reload();
        }, (errMsg) => {
            _mm.errorTips(errMsg)
        }))
    },
    loadUserInfo() {
        _user.checkLogin((res) => {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username)
        }, (errMsg) => {
            //do something
        })
    },
    loadCartCount() {
        _cart.getCartCount((res) => {
            $('.nav .cart-count').text(res || 0)
        }, (errMsg) => {
            $('.nav .cart-count').text(0)
        })
    }
}
module.exports = nav.init()