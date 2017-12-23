/*
 * @Author: seal
 * @Date:   2017-08-18 09:47:15
 * @Last Modified by:   seal
 * @Last Modified time: 2017-08-18 09:49:29
 */
'use strict'
require('./index.css')
require('page/common/nav-simple/index.js')
const _user = require('service/user-service.js')
const _mm = require('util/mm.js')
//表单里的错误提示
let formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide:function () {
        $('.error-item').hide().find('.err-msg').text('')
    }
}

//page逻辑部分
const page={
    init() {
        this.bindEvent()
    },
    bindEvent () {
        //验证username
        $('#username').blur(() => {
            let username = $.trim($(this).val())
            if(!username){
                return
            }
            //异步验证用户名是否存在
            _user.checkUsername(username,(res) => {
                formError.hide()
            },(errMsg) => {
                formError.show(errMsg)
            })
        })
        //注册按钮点击
        $('#submit').click(() => {
            this.submit()
        })
        //如果按下回车，也进行提交
        $('.user-content').keyup((e) => {
            //keyCode === 13 表示回车
            if(e.keyCode === 13){
                this.submit()
            }
        })
    },
    //提交表单
    submit () {
        let formData = {
                username:$.trim($('#username').val()),
                password:$.trim($('#password').val()),
                passwordConfirm:$.trim($('#password-confirm').val()),
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData)
        //验证成功
        if(validateResult.status){
            //提交
            _user.register(formData,(res) => {
                window.location.href = './result.html?type=register'
            },(errMsg) => {
                formError.show(errMsg)
            })
        }else {
            //错误提示
            formError.show(validateResult.msg)
        }
    },
    //表单字段的验证
    formValidate (formDate) {
        let result = {
            status:false,
            msg:''
        }
        if(!_mm.validate(formDate.username, 'require')){
            result.msg = '用户名不能为空'
            return result
        }
        if(!_mm.validate(formDate.password, 'require')){
            result.msg = '密码不能为空'
            return result
        }
        if(formDate.password.length < 6){
            result.msg = '密码不能长度不能少于6位'
            return result
        }
        if(formDate.password !== formDate.passwordConfirm){
            result.msg = '两次输入的密码不一致'
            return result
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