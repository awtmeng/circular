(function(){
  var dateBegin,
      dateEnd,
      scan,
      result,
      ripple,
      ripple1,
      ripple2,
      rand = Math.round(Math.random()*4),
      app = Math.round(Math.random()*4);

  var getUrlParam = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
            r = window.location.search.substr(1).match(reg);
        if (r) {
            try {
                return decodeURIComponent(r[2]);
            } catch(e) {
                return null;
            }
        } else {
            return null;
        }
    }

  var versioncode = getUrlParam('versioncode');

  var magnifierRipple = function(){
    var a0 = -90,
        r = 38,
        x = -35,
        y = 0,
        x1,
        y1,
        px,
        py;
    ripple = setInterval(function(){
      a0 ++;
      x1 = x + r * Math.cos(a0*3.14/180);
      y1 = y + r * Math.sin(a0*3.14/180);
      px = -(parseFloat(x1)+70);
      py = -(parseFloat(y1)+35);
      $('.magnifier div').css({"-webkit-transform": "translate3d("+ x1 +"px,"+ y1 +"px,0)","background-position":+px+"px "+py+"px"});
    },5);
  }

  $('#finger').bind('touchstart',function(e){

    dateBegin = new Date();

    $('#finger').addClass('ripple');
    $('#testTips').empty().html('正在扫描，不要挪开手指哦~');
    scan = setTimeout(function(){
      $('#finger').removeClass('ripple').addClass('magnifier');
      $('#testTips').empty().html('正在读取你的童年...');
      magnifierRipple();
    },3000);
    result = setTimeout(function(){
      //window.location.href = "result.html?versioncode=" + versioncode +"&rand="+ rand +"&app=" +app;
      /*try{
        window.adpage.gotoAdPage('儿童节','http://static.easou.com/apps/esapp/home/test/result.html?versioncode=115&rand=1&app=2');
      }catch(e){
        console.log('gotoAdPage error!');
      }*/
      
      history.pushState({}, "测试结果", "/apps/esapp/home/test/");
      $('.result').show();
      $('.test').hide();
      clearTimeout(ripple);
    },6000);

  }).bind('touchend',function(e){

    dateEnd = new Date();

    if(dateEnd - dateBegin < 500){
      clearTimeout(scan);
      clearTimeout(result);
      $('#finger').removeClass('ripple');
      $('#testTips').empty().html('将拇指按在指纹上，结果会自动弹出~');
    }
  });

  $('#finger').bind('mousedown',function(e){

    dateBegin = new Date();

    $('#finger').addClass('ripple');
    $('#testTips').empty().html('正在扫描，不要挪开手指哦~');

    scan = setTimeout(function(){
      $('#finger').removeClass('ripple').addClass('magnifier');
      $('#testTips').empty().html('正在读取你的童年...');
      magnifierRipple();
    },3000);

    result = setTimeout(function(){
      /*try{
        window.adpage.gotoAdPage('儿童节','http://static.easou.com/apps/esapp/home/test/result.html?versioncode=115&rand=1&app=2');
      }catch(e){
        console.log('gotoAdPage error!');
      }*/
      history.pushState({}, "测试结果", "/apps/esapp/home/test/");
      $('.result').show();
      $('.test').hide();
      clearTimeout(ripple);
    },6000);

  }).bind('mouseleave',function(e){

    dateEnd = new Date();

    if(dateEnd - dateBegin < 500){
      clearTimeout(scan);
      clearTimeout(result);
      $('#finger').removeClass('ripple');
      $('#testTips').empty().html('将拇指按在指纹上，结果会自动弹出~');
    }
  });

  window.onpopstate = function(){
    $('#finger').removeClass('ripple').removeClass('magnifier');
    $('#testTips').empty().html('将拇指按在指纹上，结果会自动弹出~');
    $('.test').show();
    $('.result').hide();
  }

  $.getJSON('js/childishness.json',function(data){
    $('#no').empty().html(data[rand].no);
    $('#title').empty().html(data[rand].title);
  });

  $.getJSON('js/app.json',function(data){

    var appEnd = parseInt(app)+4,
        arr = [],
        dlCount;

    for(var i = app; i < appEnd ; i++){
      data[i].dlCount >= 1000 ? dlCount = (parseInt(parseInt(data[i].dlCount)/10000*10)/10)+'万' : dlCount = parseInt(data[i].dlCount);
      arr.push(' <li><div class="app"><div class="icon"><a href="http://z.easou.com/show.m?sr='+encodeURI(data[i].url)+'&uc='+data[i].ucCode+'" class="appDetail" data-index="'+i+'"><img src="'+ data[i].icon +'" /></a>');
      arr.push('<p>'+ data[i].size +'</p></div>');
      arr.push('<div class="down"><p class="title">'+ data[i].title +'</p><a href="http://z.easou.com/show.m?sr='+encodeURI(data[i].url)+'&uc='+data[i].ucCode+'" class="appDown" data-index="'+i+'">下载</a>');
      arr.push('<p>'+ dlCount +'下载</p></div></div></li>');
    }

    $('#app').empty().html(arr.join(''));
  })

}())