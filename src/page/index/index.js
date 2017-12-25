/**
 * Created by seal on 12/21/17.
 */
require('./index.css')
require('page/common/nav/index')
const navSide = require('page/common/nav-side/index')
require('page/common/header/index')
require('util/slider/index')
const _mm = require('util/mm')
const templateBanner = require('./banner.string')


$(function () {
    let bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml)
    let $slider = $('.banner').unslider({
        dots: true
    });
    $('.banner-con .banner-arrow').click(function() {
        let forward = $(this).hasClass('prev') ? 'prev' : 'next'
        $slider.data('unslider')[forward]()
    });
})