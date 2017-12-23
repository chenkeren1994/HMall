/**
 * Created by seal on 8/20/17.
 */
'use strict'
require('page/common/header/index')
require('page/common/nav/index')
require('./index.css')
const navSide = require('page/common/nav-side/index')
const _mm = require('util/mm')
const _user=require('service/user-service')

const page={
    init() {
        this.onLoad()
        this.bindEvent()
    },
    onLoad() {
        //初始化左侧菜单
        navSide.init({
            name:'user-pass-update'
        })
    },
    bindEvent() {
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',() => {
            let userInfo = {
                    password:$.trim($('#password').val()),
                    passwordNew:$.trim($('#password-new').val()),
                    passwordConfirm:$.trim($('#password-confirm').val())
                },
                validateResult = this.validateForm(userInfo)
            if (validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.passwordNew
                },(res,msg) => {
                    _mm.successTips(msg)
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
        if(!_mm.validate(formDate.password, 'require')){
            result.msg = '原密码不能为空'
            return result
        }
        if(!formDate.passwordNew || formDate.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位'
            return result
        }
        if(formDate.passwordNew !== formDate.passwordConfirm){
            result.msg = '两次密码不一致'
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