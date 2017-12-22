/**
 * Created by seal on 12/22/17.
 */
const _mm = require('util/mm.js')
const _cart = {
    getCartCount(resolve, reject) {
        _mm.request({
            url: '/cart/get_cart_product_count.do',
            success: resolve,
            error: reject
        })
    }
}
module.exports = _cart