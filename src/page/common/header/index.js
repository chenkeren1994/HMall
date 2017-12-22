/**
 * Created by seal on 12/22/17.
 */

require('./index.css')
const _mm = require('util/mm')
const header = {
    init(){
        this.bindEvent()
        return this
    },
    //组件加载
    onLoad() {
        let keyword = _mm.getUrlParam('keyword')
        if (keyword) {
            $('#search-input').val(keyword)
        }
    },
    bindEvent() {
        $('#search-button').click(() => {
            this.searchSubmit()
        })
        $('#search-input').keyup((e) => {
            if (e.keyCode === 13) {
                this.searchSubmit()
            }
        })
    },
    //搜索提交
    searchSubmit() {
        let keyword = $.trim($('#search-input').val())
        console.log(keyword)
        if (keyword) {
            window.location.href = `./list.html?keyword=${keyword}`
        } else {
            _mm.goHome()
        }
    }
}
header.init()