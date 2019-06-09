'use strict';

/*
    원칙1. JS는 '변수 선언부', 'HTML 태그 생성부', '이벤트 선언부', '함수 선언부' 등의 4가지 영역으로 나누어 작성한다.
    원칙2. '모든 화면에서' 또는 '대부분의 화면에서' 공통으로 사용되는 부분은 같은 4가지 영역으로 새로이 JS 파일을 따로 작성하여 HTML 문서상의 가장 먼저 로드되도록 한다.
*/

/************
	변수 선언부
************/
var pageNow = 0;

ready(load);

/************
	함수 선언부
************/

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function load(){
    for(var i=1; i<=100; i++) {
        var childLi = document.createElement('li');
        childLi.textContent = i;
        document.querySelector('section.right ul.line').appendChild(childLi);
    }

    document.querySelector('section.left dl').innerHTML = '';
    var mainDlList = document.querySelectorAll('section.right main dl');
    Array.prototype.forEach.call(mainDlList, function(dl, dlIndex){
        var dt = document.createElement('dt');
        dt.textContent = dl.querySelector('dt strong').innerHTML;
        document.querySelector('section.left dl').appendChild(dt);

        var ddList = dl.querySelectorAll('dd');
        Array.prototype.forEach.call(ddList, function(dd, ddIndex){
            var childDd = document.createElement('dd');
            childDd.innerHTML = dd.querySelector('h3').innerHTML;
            document.querySelector('section.left dl').appendChild(childDd);
        }); 
    }); 

    document.querySelectorAll('section.left dl dd')[0].classList.add('on');
    document.querySelectorAll('section.right dl dd')[0].classList.add('on');
    document.addEventListener('keydown',keyDownEvent);
}

function keyDownEvent(e){
    var leftDdLength = document.querySelectorAll('section.left dl dd').length;
    
    // 이전
    if(e.keyCode === 37 || e.keyCode === 38) {
        pageNow = pageNow - 1;
        if(pageNow < 0) {
            pageNow = 0;
        }   
    } 
    
    // 다음
    if(e.keyCode === 39 || e.keyCode === 40) {
        pageNow = pageNow + 1;
        if(leftDdLength - 1 < pageNow) {
            pageNow = leftDdLength;
        }
    }
   
    if(-1 < pageNow && pageNow < leftDdLength) {
        var leftDdList = document.querySelectorAll('section.left dl dd');
        var rightDdList = document.querySelectorAll('section.right dl dd');

        Array.prototype.forEach.call(leftDdList, function(leftDd, leftDdIndex){
            leftDd.classList.remove('on');
            if(pageNow === leftDdIndex){
                leftDd.classList.add('on');
            }
        });
        Array.prototype.forEach.call(rightDdList, function(rightDd, rightDdIndex){ 
            rightDd.classList.remove('on');
            if(pageNow === rightDdIndex){
                rightDd.classList.add('on');
            }
        });
    }
}


