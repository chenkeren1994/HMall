/**
 * Created by seal on 12/22/17.
 */
const _mm = require('util/mm.js')
const _user = {
    //登出
    logout(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    checkLogin(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}
module.exports = _user