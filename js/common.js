function $(selector) {
    return document.querySelector(selector);
  }
  
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  
  function width() {
    return document.documentElement.clientWidth;
  }
  
  function height() {
    return document.documentElement.clientHeight;
  }
  

  var datas = [
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191015/80cbdbaff4a1aa009f61f9240a910933.jpeg",
    },
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191015/696545e262f2cbe66a70f17bf49f81e0.jpeg",
    },
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191018/3c910d44898d7221344718ef3b7c0a7e.jpeg",
    },
  ];

  function createCarousel(carouselId,datas){
    var container = document.getElementById(carouselId);  //大大容器
    var newList = container.querySelector(".g_carousel-list"); //图片
    var newsind = container.querySelector(".g_carousel-indicator"); // 导航
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");
  
    function createCarouselElements() {
      var listHtml = '';
      var indHtml = ''
     for(var i = 0 ; i<datas.length ; i++){
      var data = datas[i]
      if(data.link){
        listHtml+=`<li>
        <a href="${data.link}">
        <img src="${data.image}" alt="">
        </a></li>`;
        
      }else{
        listHtml+=` <li>
        <img src="${data.image}" alt="">
        </li>`;
      }
      indHtml+=`<li></li>`;
     }
     newList.innerHTML = listHtml;
     newsind.innerHTML = indHtml;
     newList.style.width = `${datas.length}00%`;
  
   }
   createCarouselElements();
  
   var curIndex = 0; //当前页面索引
  
  function setCaraousel(){
    newList.style.marginLeft = -curIndex * width()+'px'; // 设置图片位置
    var beforeSelected = newsind.querySelector('.selected'); //设置导航的样式
    if(beforeSelected){
      beforeSelected.classList.remove('selected');
  }
  newsind.children[curIndex].classList.add("selected"); // 设置方向的有无
  if(prev){
    if(curIndex ===0){
      prev.classList.add('disabled');
    }else{
      prev.classList.remove('disabled');
    }
  }
  if(next){
    if(curIndex === datas.length-1 ){
     next.classList.add('disabled');
    }else{
      next.classList.remove('disabled');
    }
  }
  }setCaraousel()
  
  //去上一个
  function toPrev(){
  if(curIndex ===0){
    return
  }
  curIndex--
  setCaraousel()
  }
  
  //去下一个
  function tonext(){
    if(curIndex === datas.length-1){
      return
    }
    curIndex++
    setCaraousel()
  } 
  
  //设置按键
   if(prev){
     prev.onclick = toPrev;
   }
   if(next){
     next.onclick = tonext;
  }
  // 自动切换
  var timer = null;
  function start(){
    if(timer){
      return
    }
    timer = setInterval(function(){
      curIndex++;
      if(curIndex === datas.length){
        curIndex = 0;
      }
      setCaraousel()
    },2000) //2s自动切换
  }start()
  function stop(){
    clearInterval(timer)
    timer = null
  }
  
  container.ontouchstart =function(e){
    e.stopPropagation(); // 阻止事件冒泡
    var x = e.touches[0].clientX;
    stop()
    newList.style.transition = 'none';
    //监听移动
    var passTime =Date.now();
   container.ontouchmove = function(e){
     var  dis = e.touches[0].clientX-x; 
     newList.style.marginLeft = -curIndex*width()+dis+'px' 
   }
   
  container.ontouchend = function(e){
    var dis = e.changedTouches[0].clientX - x;
    start()
     newList.style.transition = '';
     //停止监听
     var overTime = Date.now()-passTime;//滑动时间
     if(overTime>200){
      if(dis<width()/2&&curIndex<datas.length-1){
        tonext()
      }
      if(dis>width()/2 && curIndex>0){
        toPrev()
      }
     }
     setCaraousel()
     }
  }  
  }

 