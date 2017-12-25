require('./index.css')
require('page/common/header/index.js')
const nav = require('page/common/nav/index')
const _mm = require('util/mm.js')
const _cart=require('service/cart-service.js')
const templateIndex = require('./index.string')

const page = {
    data:{

    },
    init () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad () {
        this.loadCart()
    },
    bindEvent () {
        let _this = this
        //商品选择 / 取消选择
        $(document).on('click','.cart-select',function () {
            let $this = $(this),
                productId = $this.parents('.cart-table').data('product-id')
            //切换选中状态
            if($this.is(':checked')){
                _cart.selectProduct(productId,function (res) {
                    _this.renderCart(res)
                },function (errMsg) {
                    _this.showCartError()
                })
            }else {
                _cart.unselectProduct(productId,function (res) {
                    _this.renderCart(res)
                },function (errMsg) {
                    _this.showCartError()
                })
            }
        })
        //商品全选 / 取消全选
        $(document).on('click','.cart-select-all',function () {
            let $this = $(this)
            //全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res)
                },function (errMsg) {
                    _this.showCartError()
                })
            }else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res)
                },function (errMsg) {
                    _this.showCartError()
                })
            }
        })
        $(document).on('click','.count-btn',function () {
            let $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus')? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0
            if (type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips("该商品数量达到上限")
                    return
                }
                newCount = currCount + 1
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return
                }
                newCount = currCount - 1
            }
            //更新购物车商品数量
            _cart.updateProduct({
                productId:productId,
                count:newCount
            },function (res) {
                _this.renderCart(res)
            },function (errMsg) {
                _this.showCartError()
            })
        })
        //删除单个商品
        $(document).on('click','.cart-delete',function () {
            if(window.confirm('确认要删除该商品？')){
                let productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })
        //删除选中商品
        $(document).on('click','.delete_selected',function () {
            if(window.confirm('确认要删除选中的商品？')){
                let arrProductIds = [],
                    $selectedItem = $('.cart-select:checked')
                for (let i=0,iLength=$selectedItem.length ; i<iLength ;i ++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'))
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','))
                }
                else {
                    _mm.errorTips('请选中要删除的商品')
                }
            }
        })
        //提交购物车
        $(document).on('click','.btn-submit',function () {
            //判断总价大于0,进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href='./order-confirm.html'
            }else {
                _mm.errorTips('请选择商品后再提交')
            }
        })

    },
    //加载购物车信息
    loadCart () {
        let _this=this
        //获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res)
        },function (errMsg) {
            _this.showCartError()
        })

    },
    //渲染购物车
    renderCart(data){
        this.filter(data)
        //缓存购物车信息
        this.data.cartInfo = data
        //生成HTML
        let cartHtml = _mm.renderHtml(templateIndex,data)
        $('.page-wrap').html(cartHtml)
        //通知导航的购物车更新数量
        nav.loadCartCount()

    },
    //删除指定商品,支持批量，productId用逗号分隔
    deleteCartProduct (productIds) {
        let _this = this
        _cart.deleteProduct(productIds,function (res) {
            _this.renderCart(res)
        },function (errMsg) {
            _this.showCartError()
        })
    },

    //数据匹配
    filter (data) {
        data.notEmpty = !! data.cartProductVoList.length
    },
    showCartError () {
        $('.page-wrap').html('<p class="err-tip">哪里不对了~刷新一下试试~</p>')
    }
}
$(function () {
    page.init()
})