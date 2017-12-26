require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
const navSide         = require('page/common/nav-side/index.js');
const _mm             = require('util/mm.js');
const _order          = require('service/order-service.js');
const Pagination      = require('util/pagination/index.js');
const templateIndex   = require('./index.string');

// page 逻辑部分
const page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init(){
        this.onLoad();
    },
    onLoad (){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    // 加载订单列表
    loadOrderList(){
        let _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination (pageInfo){
        let _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
});