"use strict";

var showPage = function showPage() {
  var pageIndex = 0; //当前显示页面的索引
  //静止状态

  var pages = $$('.page_container .page');
  var nextIndex = null;

  function setStatic() {
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];

      if (i === pageIndex) {
        page.style.zIndex = 1;
      } else {
        page.style.zIndex = 10;
      }

      page.style.top = (i - pageIndex) * height() + "px";
    }
  }

  setStatic(); //移动状态

  /**
   * 移动中
   * @param {*} dis 移动的偏移量（相对正确位置）
   */

  function moving(dis) {
    //设置位置
    for (var i = 0; i < pages.length; i++) {
      page = pages[i];

      if (i !== pageIndex) {
        page.style.top = (i - pageIndex) * height() + dis + "px";
      }
    } //设置下一页


    if (dis > 50 && pageIndex > 0) {
      nextIndex = pageIndex - 1;
    } else if (dis < 50 && pageIndex < pages.length - 1) {
      nextIndex = pageIndex + 1;
    } else {
      nextIndex = null;
    }
  }

  function finishMove() {
    if (nextIndex === null) {
      setStatic();
      return;
    }

    var nextPage = pages[nextIndex];
    nextPage.style.transition = '0.5s';
    nextPage.style.top = 0;
    setTimeout(function () {
      pageIndex = nextIndex;
      nextPage.style.transition = "";
      setStatic();
    }, 500);
  } //事件


  var pageContainer = $('.page_container');

  pageContainer.ontouchstart = function (e) {
    var y = e.touches[0].clientY;

    pageContainer.ontouchmove = function (e) {
      var dis = e.touches[0].clientY - y;
      moving(dis);
    };

    pageContainer.ontouchend = function (e) {
      finishMove();
      pageContainer.ontouchmove = null;
    };
  };

  function showPage(index) {
    var nextpage = pages[index];
  }
};