"use strict";

var showPop = function () {
  function showPop(id) {
    $("#" + id).style.display = "";
  }

  var close = document.querySelectorAll('.pop_close');

  for (var i = 0; i < close.length; i++) {
    close[i].addEventListener('click', function () {
      var container = this.parentElement.parentElement;
      container.style.display = "none";
    });
  } // 特殊弹窗 


  var qq = $('.pop_qq');
  var wx = $('.pop_wx');

  qq.onclick = function () {
    qq.classList.add('selected');
    wx.classList.remove('selected');
  };

  wx.onclick = function () {
    wx.classList.add('selected');
    qq.classList.remove('selected');
  };

  return showPop;
}();