/**
 * Created by seal on 12/22/17.
 */
require('./index.css')
require('page/common/nav-simple/index')
const _mm = require('util/mm')
$(function () {
    let type = _mm.getUrlParam('type') || 'default',
        $element = $(`.${type}-success`)
    if (type === 'payment') {
        let $orderNumber = $element.find('.order-number'),
            orderNumber = _mm.getUrlParam('orderNumber')
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
    }
    $element.show()
})