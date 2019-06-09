'use strict';

/*
    원칙1. JS는 '변수 선언부', 'HTML 태그 생성부', '이벤트 선언부', '함수 선언부' 등의 4가지 영역으로 나누어 작성한다.
    원칙2. '모든 화면에서' 또는 '대부분의 화면에서' 공통으로 사용되는 부분은 같은 4가지 영역으로 새로이 JS 파일을 따로 작성하여 HTML 문서상의 가장 먼저 로드되도록 한다.
*/

/************
	변수 선언부
************/
var pageNow = 0;

$(document).ready(function() {
/************ 시작 ****************/
/***********************
    HTML 태그 생성 및 초기화
************************/
for(var i=1; i<=100; i++) {
    $('section.right ul.line').append('<li>' + i + '</li>');
}

$('section.left dl').empty();
$('section.right main dl').each(function() {
    var dt = '<dt>' + $(this).find('dt').html() + '</dt>'; 
    $('section.left dl').append(dt);

    $(this).find('dd').each(function() {
        var h3 = '<dd>' + $(this).find('h3').html() + '</dd>';
        console.log(h3);
        $('section.left dl').append(h3);
    });
});
$('section.left dl dd').eq(0).addClass('on');

/*************
    이벤트 선언부
*************/
$(document).on('keydown', function(e) {
    // 이전
    if(e.keyCode === 37) {
        pageNow = pageNow - 1;
        if(pageNow < 0) {
            pageNow = 0;
        }   
    } 
    
    // 다음
    if(e.keyCode === 39) {
        pageNow = pageNow + 1;
        if($('section.left dl dd').length - 1 < pageNow) {
            pageNow = $('section.left dl dd').length;
        }
    }
    
    if(-1 < pageNow && pageNow < $('section.left dl dd').length) {
        $('section.left dl dd').removeClass('on').eq(pageNow).addClass('on');
        $('section.right dl dd').removeClass('on').eq(pageNow).addClass('on');      
    }
    
});

/***************** 종료 ***************/
});

/************
	함수 선언부
************/
