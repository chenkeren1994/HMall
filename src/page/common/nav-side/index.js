/**
 * Created by seal on 12/22/17.
 */

require('./index.css')
const _mm = require('util/mm')
const templateIndex = require('./index.string')
const navSide = {
    option:{
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
            {name: 'about', desc: '关于mmall', href: './about.html'}
        ]
    },
    init(option){
        $.extend(this.option, option)
        for (let i = 0, iLength = this.option.navList.length; i < iLength;i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
            }
        }
        let navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        })
        $('.nav-side').html(navHtml)
    },
    renderNav() {

    }
}
module.exports = navSide