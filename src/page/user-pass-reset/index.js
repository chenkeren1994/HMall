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
const formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide:function () {
        $('.error-item').hide().find('.err-msg').text('')
    }
}

//page逻辑部分
const page={
    data:{
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init:function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad : function () {
        this.loadStepUsername()
    },
    bindEvent:function () {
        //按钮点击
        $('#submit-username').click(() => {
            let username = $.trim($('#username').val())
            if(username){
                _user.getQuestion(username,(res) => {
                    this.data.username = username
                    this.data.question = res
                    this.loadStepQuestion()
                },(errMsg) => {
                    formError.show(errMsg)
                })
            }else {
                formError.show('请输入用户名')
            }
        })
        $('#submit-question').click(() => {
            let answer = $.trim($('#answer').val())
            if(answer){
                _user.checkAnswer({
                    username:this.data.username,
                    question:this.data.question,
                    answer: answer
                },(res) => {
                    this.data.answer = answer
                    this.data.token = res
                    this.loadStepPassword()
                }, (errMsg) => {
                    formError.show(errMsg)
                })
            }else {
                formError.show('请输入密码提示问题的答案')
            }
        })
        $('#submit-password').click(() => {
            let password = $.trim($('#password').val())
            if(password && password.length>=6){
                _user.resetPassword({
                    username:this.data.username,
                    passwordNew:password,
                    forgetToken: this.data.token
                },(res) => {
                    window.location.href = './result.html?type=pass-reset'
                },(errMsg) => {
                    formError.show(errMsg)
                })
            }else {
                formError.show('请输入不少于6位新密码')
            }
        })

    },

    //加载输入用户名的一步
    loadStepUsername:function () {
        $('.step-username').show()
    },
    //加载输入密码提示问题答案的一步
    loadStepQuestion:function () {
        formError.hide()
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
    },
    //加载输入password的一步
    loadStepPassword:function () {
        formError.hide()
        $('.step-question').hide().siblings('.step-password').show()
    }


}
$(function () {
    page.init()
})