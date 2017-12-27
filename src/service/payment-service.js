const _mm = require('util/mm.js');

const _payment = {
    getPaymentInfo (orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取订单状态
    getPaymentStatus (orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;