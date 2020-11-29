var showPage = (function(){
    var pageIndex =0;//当前显示页面的索引
//静止状态
var pages =$$('.page_container .page');
var nextIndex = null;
    function setStatic(){
    for(var i = 0 ;i<pages.length ; i++){
       var page = pages[i];
        if(i === pageIndex){
            page.style.zIndex =1;
        }else{
            page.style.zIndex = 10;
           
        }
        page.style.top = (i-pageIndex) * height() + "px";
    }
    }setStatic()

//移动状态

/**
 * 移动中
 * @param {*} dis 移动的偏移量（相对正确位置）
 */
function moving(dis){
    //设置位置
    for(var i = 0 ;i<pages.length ; i++){
        page = pages[i]
        if(i!==pageIndex){
            page.style.top = (i-pageIndex) * height() + dis +  "px";
        }
        
    }
    //设置下一页
    if(dis>50 && pageIndex>0){
        nextIndex = pageIndex-1;
      }else if(dis<50 && pageIndex<pages.length-1){
          nextIndex = pageIndex+1;
      }else{
          nextIndex=null;
      }
}

function finishMove(){
    if (nextIndex === null)
    {
        setStatic()
        return;
    }
      var nextPage = pages[nextIndex];
      nextPage.style.transition = '0.5s'
        nextPage.style.top = 0;
        setTimeout(function(){
            pageIndex=nextIndex;
            nextPage.style.transition = "";
            setStatic();
        }, 500)
}

//事件
var pageContainer = $('.page_container')
pageContainer.ontouchstart = function(e){
var y = e.touches[0].clientY;
function handler(e) {
    var dis = e.touches[0].clientY - y;
    if(Math.abs(dis)<20){
        dis = 0;
    }
  moving(dis);
  // 阻止事件的默认行为
  if (e.cancelable) {
    // 如果事件可以取消
    e.preventDefault(); // 取消事件 - 阻止默认行为
  }
}
// 手指按下，监听移动
pageContainer.addEventListener("touchmove", handler, {
  passive: false,
});

// 手指松开，完成移动
pageContainer.ontouchend = function () {
  finishMove();
  pageContainer.removeEventListener("touchmove", handler);
};
};

//按照指示显示页面

function showPage(index){
    var nextPage = pages[index]; //下一个页面元素
    if (index < pageIndex) {
      // 下一个页面在当前页面上面
      nextPage.style.top = -height() + "px";
    } else if (index > pageIndex) {
      // 下一个页面在当前页面下面
      nextPage.style.top = height() + "px";
    } else {
      // 下一个页面就是当前页面
      if (pageIndex === 0) {
        // 目前是第一个页面
        pageIndex++;
      } else {
        pageIndex--;
      }
      setStatic(); // 重新设置位置
    }
    // 强行让浏览器渲染
    nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
    nextIndex = index; // 设置下一个页面索引
    finishMove();
} 
return showPage
}())
