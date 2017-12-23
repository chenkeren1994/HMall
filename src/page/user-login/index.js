/**
 * Created by seal on 12/21/17.
 */
require('./index.css')
require('page/common/nav-simple/index')
const _mm = require('util/mm')
const _user = require('service/user-service')
const formError = {
    show(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide() {
        $('.error-item').hide().find('.err-msg').text('');
    }
}
const page = {
    init() {
        this.bindEvent()
    },
    bindEvent(){
        $('#submit').click(() => {
            this.submit()
        })
        $('.user-content').keyup((e) => {
            if (e.keyCode === 13) {
                this.submit()
            }

        })
    },
    submit() {
        let formDate = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        validateResult = this.formValidate(formDate)
        if (validateResult.status) {
            _user.login(formDate, (res)=>{
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, (errMsg)=>{
                formError.show(errMsg)
            })
        } else {
            formError.show(validateResult.msg)
        }
    },
    formValidate(formDate) {
        let result = {
            status:false,
            msg:''
        };
        if(!_mm.validate(formDate.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formDate.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status=true;
        result.msg='验证通过';
        return result;
    }
}
$(function () {
    page.init()
})