
var GLOBAL = {};


(function(){
	//元素获取
	var oBanner = document.getElementById('banner');
	var aShow = oBanner.getElementsByTagName('a');
	var aCon = oBanner.getElementsByTagName('li');
	//变量声明
	var oTimer = null;
	var iNow = 0;
	//将按钮和图片做关联
	for(var i = 0; i < aCon.length; i++){
		aCon[i].index = i; 
	}
	//每5s钟执行一次
	oTimer = setInterval(fnNext,5000);
	//向下一张循环切换
	function fnNext(){
		iNow++;
		iNow = iNow % aShow.length;
		tab();
	}
	//消除所有，显示当前
	function tab(){
		for(var i = 0; i < aShow.length; i++){
			aShow[i].className = 'banner-navLk';
			aCon[i].className = 'banner-conI';
		}
		aShow[iNow].className = 'banner-navLk_active';
		aCon[iNow].className = 'banner-conI_active';
	}
	//鼠标移入时
	oBanner.onmouseover = function(){
		clearInterval(oTimer);
	}
	//鼠标移出时
	oBanner.onmouseout = function(){
		oTimer = setInterval(fnNext,5000);
	}
	//鼠标点击按钮时，显示相应图片
	for(var i = 0; i < aShow.length; i++){
		aCon[i].onclick = function(){
			iNow = this.index;
			tab();
		}
	};	
})();


/*
 *@method 功能:ajax
 *@param 变量:
 *obj{
 *	url:地址(string),
 *	data:数据(json),
 *	success:回调函数(funtion),
 *	isCache:是否缓存(boolean)(可选，默认为不缓存)
 *}
**/
(function(){
	GLOBAL.AJAX = ajax;
	function ajax(obj){
		var xhr = null;
		if(window.XDomainRequest){
			xhr = new XDomainRequest();
		}else{
			xhr = new XMLHttpRequest();
		}
		xhr.onload = function(){
			var response = JSON.parse(xhr.responseText);
			obj.success(response);			
		}
		obj.isCache = obj.isCache || false;
		if(!obj.isCache){
			obj.url = obj.url +'?random=' + Math.random();
		}else{
			obj.url = obj.url +'?';
		}
		if(obj.data !== undefined){
			data = (function(){
				var arr = [];
				for(var i in obj.data){
					arr.push(i + '=' + obj.data[i]);
				}
				return arr.join('&');
			})(obj.data);
			data = '&' + data;
		}else{
			data = '';
		}
		xhr.open('get',obj.url+data,true);
		xhr.send();
	}
})();


/*
 *@method 功能:视频播放
**/
(function(){
	//元素获取
	var oVideoImg = document.getElementById('videoImg');
	var oVideoBoxWrap = document.getElementById('videoBoxWrap');
	var oVideoBox = oVideoBoxWrap.getElementsByTagName('div')[0];
	var oVideoClose = oVideoBox.getElementsByTagName('div')[0];
	var oVideo = oVideoBox.getElementsByTagName('video')[0];
	var object = document.getElementsByTagName('object')[0];
	//点击图片时，弹出out-videoBoxWrap
	oVideoImg.onclick = function(){
		oVideoBoxWrap.style.cssText = "background-color: rgba(0,0,0,0.5);z-index:1";
		oVideoBox.style.cssText = "transform:  scale(1) ";
		oVideoBox.style.visibility = 'visible';
		object.style.display = 'block';
	}
	//点击关闭按钮时，关闭out-videoBoxWrap
	oVideoClose.onclick = function(){
		oVideoBoxWrap.style.cssText = "background-color: rgba(0,0,0,0);z-index:-1";
		oVideoBox.style.cssText = "transform:  scale(0)";
		oVideoBox.style.visibility = 'hidden';
		object.style.display = 'none';
		oVideo.currentTime = 0;
		oVideo.pause();
	}	
})();


/*
 *@method 功能:获取课程列表
**/
(function(){
	GLOBAL.NEW = {};
	var pageNo = 2;
	var psize = 20;
	var type = 10;
	GLOBAL.NEW.pageNo = pageNo;
	GLOBAL.NEW.psize = psize;
	GLOBAL.NEW.type = type;
	GLOBAL.NEW.fnNew = fnNew;
	//运行ajax函数
	GLOBAL.AJAX({
	   	url : 'http://study.163.com/webDev/couresByCategory.htm',
		data : {
		    'pageNo':2,
		    'psize':20,
		    'type':10
		},
	    success : function(data){
	       fnNew(data);
	    }
	});

	//构建html结构
	function fnNew(data){
		var oUl = document.getElementById('mainBox');
		var html = oUl.innerHTML = '';
		for(var i = 0; i < data.list.length; i++){
			html += '<li class="main-boxI"> \
						<img class="boxI-img" src="'+ data.list[i].bigPhotoUrl +'"> \
						<div class="boxI-txtBox">  \
							<h3 class="boxI-tit">'+ data.list[i].name +'</h3> \
							<p class="boxI-author">'+ data.list[i].provider +'</p> \
							<p class="boxI-num"> \
								<span class="boxI-num-icon vm"></span> \
								<span class="vm">'+ data.list[i].learnerCount +'</span> \
							</p> \
							<p class="boxI-price">￥'+data.list[i].price+'</p> \
							<h4 style="display:none" data-name ="'+data.list[i].name+'" data-bigPhotoUrl="'+data.list[i].bigPhotoUrl+' "data-provider="' + data.list[i].provider + '" data-learnerCount="'+ data.list[i].learnerCount +'"data-price ="'+data.list[i].price+'" data-categoryName='+data.list[i].categoryName+' data-description = "'+data.list[i].description+'"></h4> \
						</div></li>';

		};	
		oUl.innerHTML = html;
		var html2 = '';
		var ele = document.createElement('div');
		ele.className = "out-intro";
		ele.id = "outIntro";
		html2 +='<div class="out-intro-top clear"> \
					<img class="out-intro-img fl" src=""> \
					<div class="out-intro-txtBox fl"> \
						<h3 class="out-intro-txtBox-tit"></h3> \
						<p class="out-intro-txtBox-num"> \
							<span class="out-intro-txtBox-icon vm"></span> \
							<span class="vm"></span> \
						</p> \
						<p class="out-intro-txtBox-author"></p> \
						<p class="out-intro-txtBox-type"></p> \
					</div> \
				</div> \
				<p class="out-intro-bottom"></p>';
		ele.innerHTML = html2;
		document.getElementById('out').appendChild(ele);
		GLOBAL.MOVE();	
	}


})();


/*
 *@method 功能:给按钮【产品设计】和【编程语言】添加点击事件
**/
(function(){
	var oMainTitBox = document.getElementById('mainTit');
	var oMainTit1 = oMainTitBox.getElementsByTagName('li')[0];
	var oMainTit2 = oMainTitBox.getElementsByTagName('li')[1];
	oMainTit1.onclick = function(){
		if(GLOBAL.NEW.type != 10){
			GLOBAL.NEW.type = 10;
			oMainTit2.className = 'con-titI';
			this.className = 'con-titI_active';
			//运行ajax函数
			GLOBAL.AJAX({
			    url : 'http://study.163.com/webDev/couresByCategory.htm',
			    data : {
			        'pageNo':GLOBAL.NEW.pageNo,
			        'psize':GLOBAL.NEW.psize,
			        'type':GLOBAL.NEW.type
			    },
			    success : function (data) {
			        GLOBAL.NEW.fnNew(data);
			    }
			});	
		}
	}
	oMainTit2.onclick = function(){
		if(GLOBAL.NEW.type != 20){
			GLOBAL.NEW.type = 20;
			oMainTit1.className = 'con-titI';
			this.className = 'con-titI_active';		
			//运行ajax函数
			GLOBAL.AJAX({
			    url : 'http://study.163.com/webDev/couresByCategory.htm',
			    data : {
			        'pageNo':GLOBAL.NEW.pageNo,
			        'psize':GLOBAL.NEW.psize,
			        'type':GLOBAL.NEW.type
			    },
			    success : function (data) {
			        GLOBAL.NEW.fnNew(data);
			    }
			});	
		}
	}

})();


/*
 *@method 功能:给页码添加点击事件
**/
(function(){
	var oPageBox = document.getElementById('mainPage');
	var oPageLeft = oPageBox.getElementsByTagName('span')[0];
	var oPageRight = oPageBox.getElementsByTagName('span')[1];
	var aPage = oPageBox.getElementsByTagName('a');	
	//点击上一张
	oPageLeft.onclick = function(){
		if(GLOBAL.NEW.pageNo>1){
			aPage[GLOBAL.NEW.pageNo-1].className = 'page-numLk';
			GLOBAL.NEW.pageNo--;
			aPage[GLOBAL.NEW.pageNo-1].className = 'page-numLk_active';
			//运行ajax函数
			GLOBAL.AJAX({
			    url : 'http://study.163.com/webDev/couresByCategory.htm',
			    data : {
			        'pageNo':GLOBAL.NEW.pageNo,
			        'psize':GLOBAL.NEW.psize,
			        'type':GLOBAL.NEW.type
			    },
			    success : function (data) {
			        GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	}
	//点击下一张
	oPageRight.onclick = function(){
		if(GLOBAL.NEW.pageNo<8){
			aPage[GLOBAL.NEW.pageNo-1].className = 'page-numLk';
			GLOBAL.NEW.pageNo++;
			aPage[GLOBAL.NEW.pageNo-1].className = 'page-numLk_active';
			//运行ajax函数
			GLOBAL.AJAX({
			    url : 'http://study.163.com/webDev/couresByCategory.htm',
			    data : {
			        'pageNo':GLOBAL.NEW.pageNo,
			        'psize':GLOBAL.NEW.psize,
			        'type':GLOBAL.NEW.type
			    },
			    success : function (data) {
			        GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	}
	//点击页码
	for(var i = 0; i < aPage.length; i++){
		aPage[i].index = i;
		aPage[i].onclick = function(){
			if((GLOBAL.NEW.pageNo-1) != this.index){
				for(var i = 0; i < aPage.length; i++){
					aPage[i].className = 'page-numLk';
				}
				GLOBAL.NEW.pageNo = this.index+1;
				this.className = 'page-numLk_active';
				//运行ajax函数
				GLOBAL.AJAX({
				    url : 'http://study.163.com/webDev/couresByCategory.htm',
				    data : {
				        'pageNo':GLOBAL.NEW.pageNo,
				        'psize':GLOBAL.NEW.psize,
				        'type':GLOBAL.NEW.type
				    },
				    success : function (data) {
				        GLOBAL.NEW.fnNew(data);
				    }
				});		
			}	
		}
	}
})();

/*
 *@method 功能:关于课程的鼠标移入移出事件
**/
(function(){
	GLOBAL.MOVE = fnMove;
	function fnMove(){
		//获取位置信息
		function getPos(obj) {
		    var pos = {
		        left: 0,
		        top : 0
		    }
		    while(obj) {
		        pos.left += obj.offsetLeft;
		        pos.top += obj.offsetTop;
		        obj = obj.offsetParent;
		    }
		    return pos;
		}
		var oMainBox = document.getElementById('mainBox');
		var aLi = oMainBox.getElementsByTagName('li');
		var outIntro = document.getElementById('outIntro');	
		for(var i = 0; i < aLi.length; i++){
			var testImg =aLi[i].getElementsByTagName('img')[0];
			var testDiv =aLi[i].getElementsByTagName('div')[0]; 
			aLi[i].index = i;
			//鼠标移入时,详情菜单显示
			aLi[i].onmouseover = function(){
				var dataDiv = this.getElementsByTagName('h4')[0];
				var temp = getPos(this);
				var x = temp.left + 240 + 'px';
				var y = temp.top + 'px';
				var html = outIntro.innerHTML = '';
				html +='<div class="out-intro-top clear">\
							<img class="out-intro-img fl" src="'+ dataDiv.getAttribute('data-bigphotourl')+'">\
							<div class="out-intro-txtBox fl">\
								<h3 class="out-intro-txtBox-tit">'+ dataDiv.getAttribute('data-name') +'</h3>\
								<p class="out-intro-txtBox-num">\
									<span class="out-intro-txtBox-ico vm"></span>\
									<span class="vm">'+dataDiv.getAttribute('data-learnercount')+'人在学</span>\
								</p>\
								<p class="out-intro-txtBox-author">发布者：'+dataDiv.getAttribute('data-provider') +'</p>\
								<p class="out-intro-txtBox-type">分类：'+(dataDiv.getAttribute('data-categoryName') || '暂无')+'</p>\
							</div></div> \
						<p class="out-intro-bottom">'+dataDiv.getAttribute('data-description')+'</p>';
				outIntro.innerHTML = html;	
				outIntro.style.cssText = 'display: block; left:'+x+';top:'+ y +';';	
			}
			//鼠标移入时,详情菜单显示
			aLi[i].onmouseout = function(){
				outIntro.style.cssText = '';
			}			
		}			
	}
})();


/*
 *@method 功能:最热排行结构生成
**/
(function(){
	var DataHot = null;
	var oTimer = null;
	var index = 0;
	//运行ajax函数
	GLOBAL.AJAX({
	    url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
	    success: function (data) {
	    	DataHot = data;
	        fnNewHot(data);
	        },
	    async : true
	});

	//生成最热排行HTML结构
	function fnNewHot(data){
		var oUl = document.getElementById('sideConList');
		var html = oUl.innerHTML = '';
		for(var i = 0; i < data.length; i++){
			html += '<li class="side-con-listI">\
						<img class="side-img" src="'+ data[i].smallPhotoUrl+'">\
						<div class="side-txtBox">\
							<h3 class="side-txtBox-tit">'+ data[i].name+'</h3>\
							<p class="side-txtBox-num">\
								<span class="vm side-txtBox-icon"></span>\
								<span class="vm">'+ data[i].learnerCount+'</span>\
							</p>\
						</div>\
					</li>';
		}
		oUl.innerHTML = html+html;
	}

	//每5秒更新课程
	oTimer = setInterval(function(){
		var oUl = document.getElementById('sideConList');
		var oLi = oUl.getElementsByTagName('li')[0];
		index++;
		oLi.style.cssText = 'margin-top: '+ (-70*index)+'px;';
		if(index == 21){
			oLi.style.marginTop = '';
			index = 0;	
			oLi.style.transition = 'margin 0ms';			
		}
	},5000);	
})();

