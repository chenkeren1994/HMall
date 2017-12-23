/**
 * Created by seal on 8/20/17.
 */
'use strict'
require('page/common/header/index.js')
require('page/common/nav/index.js')
require('./index.css')
const navSide = require('page/common/nav-side/index.js')
const _mm = require('util/mm.js')
const _user=require('service/user-service.js')
const templateIndex = require('./index.string')

const page={
    init() {
        this.onLoad()
    },
    onLoad() {
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        })
        this.loadUserInfo()
    },
    loadUserInfo() {
        let userHtml = ''
        _user.getUserInfo((res) => {
            userHtml = _mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
        },(errMsg) => {
            _mm.errorTips(errMsg)
        })
    }
}
$(function () {
    page.init()
})