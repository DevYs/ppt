'use strict';

/*
    원칙1. JS는 '변수 선언부', 'HTML 태그 생성부', '이벤트 선언부', '함수 선언부' 등의 4가지 영역으로 나누어 작성한다.
    원칙2. '모든 화면에서' 또는 '대부분의 화면에서' 공통으로 사용되는 부분은 같은 4가지 영역으로 새로이 JS 파일을 따로 작성하여 HTML 문서상의 가장 먼저 로드되도록 한다.
*/

/************
	변수 선언부
************/
var DIRECTION_ABOVE = 1;
var DIRECTION_BELOW = 2;
var DIRECTION_LETF  = 3;
var DIRECTION_RIGHT = 4;
var INDICATOR_ITEM = '<li></li>';
var pageNow = 0;
var pagePos = [
    '0,0',
    '100,0',
    '100,100',
    '200,100',
    '200,200',
    '200,300',
];

$(document).ready(function() {
/************ 시작 ****************/

/***********************
    HTML 태그 생성 및 초기화
************************/
resize();

$('main.index ul.indicator').empty();
$('main.index ul.paper li').each(function(i) {
    var directionRandom =  Math.floor((Math.random() * 4) + 1);

    var left = pagePos[i].split(',')[0] + '%';
    var top  = pagePos[i].split(',')[1] + '%';
    $(this).css({'left':left, 'top':top});

    $('main.index div.indicator ul').append(INDICATOR_ITEM);
});

$('main.index div.indicator ul li').eq(pageNow).addClass('on');

/*************
    이벤트 선언부
*************/
$('main.index div.indicator a.prev').on('click', function(e) {
    e.preventDefault();

    pageNow--;
    if(pageNow < 0) {
        pageNow = 0;
    }
    movePage();
});
$('main.index div.indicator a.next').on('click', function(e) {
    e.preventDefault();

    pageNow++;
    if($('main.index ul.paper li').length - 1 < pageNow) {
        pageNow = $('main.index ul.paper li').length - 1;
    }
    movePage();
});

$(document).on('keydown', function(e) {
    if(e.keyCode === 37) {
        $('main.index div.indicator a.prev').trigger('click');
        $('main.index div.indicator a.prev').focus();
    } else if(e.keyCode === 39) {
        $('main.index div.indicator a.next').trigger('click');
        $('main.index div.indicator a.next').focus();
    }
});

$(window).on('resize', function() {
    resize();
});

/***************** 종료 ***************/
});

/************
	함수 선언부
************/
function resize() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $('main.index').css({'width':windowWidth, 'height':windowHeight});
    $('main.index ul.paper').css({'width':windowWidth, 'height':windowHeight});
    $('main.index ul.paper li').css({'width':windowWidth, 'height':windowHeight});
}

function movePage() {
    var left = '-' + pagePos[pageNow].split(',')[0] + '%';
    var top  = '-' + pagePos[pageNow].split(',')[1] + '%';
    $('main.index ul.paper').css({'left':left, 'top':top});
    
    $('main.index div.indicator ul li').removeClass('on');
    $('main.index div.indicator ul li').eq(pageNow).addClass('on');
}