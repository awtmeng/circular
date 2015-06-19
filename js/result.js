(function(){
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

  var rand = getUrlParam('rand'),
      app = getUrlParam('rand');

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