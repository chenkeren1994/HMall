/**
 * Created by seal on 12/27/17.
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
const _mm             = require('util/mm');
const _payment          = require('service/payment-service');
const templateIndex   = require('./index.string');

// page 逻辑部分
const page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init() {
        this.onLoad()
    },
    onLoad() {
        this.loadPaymentInfo()
    },
    loadPaymentInfo() {
        let _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap')
        $pageWrap.html('<div class="loading"></div>')
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHtml = _mm.renderHtml(templateIndex, res)
            $pageWrap.html(paymentHtml)
            _this.listenOrderStatus()
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
        })
    },
    //监听订单状态
    listenOrderStatus() {
        let _this = this
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res === true) {
                    window.location.href = `./result.html?type=payment&orderNumber=${_this.data.orderNumber}`
                }
            })
        }, 5e3)
    }

};
$(function(){
    page.init();
});