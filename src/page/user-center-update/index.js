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
        this.bindEvent()
    },
    onLoad () {
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        })
        this.loadUserInfo()
    },
    loadUserInfo () {
        let userHtml = ''
        _user.getUserInfo((res) => {
            userHtml = _mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
        },(errMsg) => {
            _mm.errorTips(errMsg)
        })
    },
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
    //验证字段信息
    validateForm (formDate) {
        let result = {
            status:false,
            msg:''
        }
        if(!_mm.validate(formDate.phone, 'phone')){
            result.msg = '手机号格式不正确'
            return result
        }
        if(!_mm.validate(formDate.email, 'email')){
            result.msg = 'email格式不正确'
            return result
        }
        if(!_mm.validate(formDate.question, 'require')){
            result.msg = '密码提示问题不能为空'
            return result
        }
        if(!_mm.validate(formDate.answer, 'require')){
            result.msg = '密码提示问题答案不能为空'
            return result
        }
        //通过验证，返回正确提示
        result.status=true
        result.msg='验证通过'
        return result

    }
}
$(function () {
    page.init()
})