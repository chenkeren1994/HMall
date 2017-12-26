require('./index.css')
require('page/common/header/index.js')
const  addressModal = require('./address-modal')
const nav = require('page/common/nav/index')
const _mm = require('util/mm.js')
const _address = require('service/address-service')
const _order = require('service/order-service')
const templateAddress = require('./address-list.string')
const templateProduct = require('./product-list.string')

const page = {
    data: {
        selectedAddressId: null
    },
    init () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad () {
        this.loadAddressList()
        this.loadProductList()
    },
    bindEvent () {
        // 地址选择
        let _this = this
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active')
            _this.data.selectedAddressId = $(this).data('id')
        })
        // 订单提交
        $(document).on('click', '.order-submit', function () {
            let shippingId = _this.data.selectedAddressId
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, (res) => {
                    window.location.href = `./payment.html?orderNumber=${res.orderNo}`
                }, (errMsg) => {
                    _mm.errorTips(errMsg)
                })
            } else {
                _mm.errorTips('请选择地址后在提交')
            }
        })
        //地址添加
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess() {
                    _this.loadAddressList()
                }
            })
        })
        // 地址的编辑
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            let shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        // 地址的删除
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            let id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    loadAddressList() {
        _address.getAddressList((res) => {
            let addressHtml = _mm.renderHtml(templateAddress, res)
            $('.address-con').html(addressHtml)
        }, (errMsg) => {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试！</p>')
        })
    },
    loadProductList() {
        _order.getProductList((res) => {
            let productHtml = _mm.renderHtml(templateProduct, res)
            $('.product-con').html(productHtml)
        }, (errMsg) => {
            $('.product-con').html('<p class="err-tip">商品信息加载失败!</p>')
        })
    }

}
$(function () {
    page.init()
})
