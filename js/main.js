
var GLOBAL = {};
var oScreen;
var	aWidth = document.body.clientWidth;


window.onload = function(){
	var oMain = $("#mainBox");
	var oMainList = oMain.find('li');
	var oScreen = $(window).width();

	if (oScreen<=1366) {
		if (oMainList.length==20) {
			for (var i = 0; i < 5; i++) {
				oMainList.eq(19-i).remove();
			}
		}
	}

	var html3 = oMain.html();

	if (oScreen>1366) {
		if (oMainList==15) {
			for (var i = 0; i < 5; i++) {
				html3 += '<li class="course-main-list">\
								<img class="course-img" src="img/images/course_01.png" alt="网易云课堂">\
								<div class="course-information">\
									<h3 class="course-name">手绘系列教程</h3>\
									<p class="course-source">几分钟网</p>\
									<p class="course-student-num">\
										<span class="people fa fa-user"></span>\
										<span>445</span>\
									</p>\
									<p class="course-price">￥0</p>\
								</div>\
								<div class="hide-detail">\
									<img class="hide-detail-img" src="img/images/course_01.png" alt="网易云课堂">\
									<h3 class="hide-detail-title">手绘系列教程</h3>\
									<span class="hide-detail-student  fa fa-user">445人在学\
									</span>\
									<p class="hide-detail-source">\
										发布者:极客公园\
										<br>\
										分类：无\
									</p>\
									<p class="hide-detail-description">\
											生活中不乏有很多美好的画面，何不用画笔记录下来呢？那就跟几分钟网一起来记录美好画面吧！\
									</p>\
								</div>\
							</li>';
			}
		}
	}
};

$(window).resize(function(){
	oScreen = $(window).width();
	if (oScreen<=1366 && aWidth>1366) {
		location.reload();
		aWidth = oScreen;
	}

	if (oScreen>1366 && aWidth<=1366) {
		location.reload();
		aWidth = oScreen;
	}
});

//关闭顶部弹窗

$(document).ready(function(){
	$("#close").click(function(){
		$("#popup").hide();
		$.cookie("topValue","none",{expires:1});
	});
	$("#popup").css("display",$.cookie("topValue"));
});

//轮播图
	
$(document).ready(function() {
	var iNow = 0;
	var aCon = $("#banner").find('li');
	var aShow = $("#banner").find('a');
	var oTimer = null;

	//将按钮和图片做关联
	for(var i = 0; i < aCon.length; i++){
		aCon.eq(i).attr("index",i);
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
			aShow.eq(i).attr("class","banner-img");
			aCon.eq(i).attr("class","banner-dot");
		}
		console.log(iNow);
		console.log(aShow.eq(iNow));
		aShow.eq(iNow).attr('class', 'banner-img-active');
		aCon.eq(iNow).attr('class', 'banner-dot-active');
	}
	//鼠标移入事件
	$("#banner").mouseover(function() {
		clearInterval(oTimer);
	});
	//鼠标移出事件
	$("#banner").mouseout(function(){
		oTimer = setInterval(fnNext,5000);
	});
	//鼠标点击显示相应图片
	for(var i = 0; i < aShow.length; i++){
		aCon.eq(i).click(function() {
			iNow = $(this).attr('index');
			tab();
		});
	}
});


/*
 *@method 功能:视频播放
**/

$(document).ready(function() {
	//元素获取
		var oVideoImg = $("#videoImg");
		var oVideoBoxWrap = $("#hideVideo");
		var oVideoBox = oVideoBoxWrap.find('div:first');
		var oVideoClose = oVideoBox.find('div:first');
		var oVideo = $("#video");
		var object = $("object:first");

		var aVideoBoxWrap = document.getElementById('hideVideo');
		var aVideoBox = aVideoBoxWrap.getElementsByTagName('div')[0];
		var aVideo = aVideoBox.getElementsByTagName('video')[0];
	//点击图片时，弹出out-hideVideo
	oVideoImg.click(function(){
		//oVideoBoxWrap.attr({background-color:"rgba(0,0,0,0.5)",z-index:"10"});
		oVideoBoxWrap.css('background-color', 'rgba(0,0,0,0.5)');
		oVideoBoxWrap.css('z-index', '10');
		oVideoBox.css('transform', 'scale(1)');
		oVideoBox.css('visibility', 'visible');
		object.css('display', 'block');
	});

	oVideoClose.click(function(){
		//oVideoBoxWrap.attr({background-color:"rgba(0,0,0,0)",z-index:"-1"});
		oVideoBoxWrap.css('background-color', 'rgba(0,0,0,0)');
		oVideoBoxWrap.css('z-index', '-1');
		oVideoBox.css('transform', 'scale(0)');
		oVideoBox.css('visibility', 'hidden');
		object.css('display', 'none');
		aVideo.currentTime = 0;
		//$("#video").attr("currentTime", "0");  //此方法不能修改currentTime的值
		oVideo.trigger('pause');
	});
});



/*
 *@method 功能:获取课程列表
**/
$(document).ready(function() {
	var oScreen = document.body.clientWidth;

	GLOBAL.NEW = {};
	var pageNo = 2;
	var psize;
	var type = 10;

	if (oScreen>1366) { 
		psize = 20; 
	}

	else { 
		psize = 15; 
	}

	GLOBAL.NEW.pageNo = pageNo;
	GLOBAL.NEW.psize = psize;
	GLOBAL.NEW.type = type;
	GLOBAL.NEW.fnNew = fnNew;
	//运行ajax函数
	
	if (oScreen>1366) { 
		$.ajax({
			type:'get',
			url: 'http://study.163.com/webDev/couresByCategory.htm',
			data : {
			    'pageNo':2,
			    'psize':20,
			    'type':10
			},
			dataType: 'json',
		    success : function(data){
		       fnNew(data);
		    }
		});
	}

	else {  
		$.ajax({
			type:'get',
			url: 'http://study.163.com/webDev/couresByCategory.htm',
			data : {
			    'pageNo':2,
			    'psize':15,
			    'type':10
			},
			dataType: 'json',
		    success : function(data){
		       fnNew(data);
		    }
		});
	}
	
	//构建html结构
	function fnNew(data){
		//var oUl = document.getElementById('mainBox');
		var oUl = $("#mainBox");
		var html = '';
		oUl.html('');
		// for(var i = 0; i < data.list.length; i++){
		// 	html += '<li class="course-main-list"> \
		// 				<img class="course-img" src="'+ data.list[i].bigPhotoUrl +'"> \
		// 				<div class="course-information">  \
		// 					<h3 class="course-name">'+ data.list[i].name +'</h3> \
		// 					<p class="course-source">'+ data.list[i].provider +'</p> \
		// 					<p class="course-student-num"> \
		// 						<span class="people fa fa-user"></span> \
		// 						<span class="vm">'+ data.list[i].learnerCount +'</span> \
		// 					</p> \
		// 					<p class="course-price">￥'+data.list[i].price+'</p> \
		// 					<h4 style="display:none" data-name ="'+data.list[i].name+'" data-bigPhotoUrl="'+data.list[i].bigPhotoUrl+' "data-provider="' + data.list[i].provider + '" data-learnerCount="'+ data.list[i].learnerCount +'"data-price ="'+data.list[i].price+'" data-categoryName='+data.list[i].categoryName+' data-description = "'+data.list[i].description+'"></h4> \
		// 				</div>\
		// 					<div class="hide-detail">\
		// 							<img class="hide-detail-img" src="'+data.list[i].bigPhotoUrl +'" alt="网易云课堂">\
		// 							<h3 class="hide-detail-title">'+ data.list[i].name +'</h3>\
		// 							<span class="hide-detail-student  fa fa-user">' + data.list[i].learnerCount + '人在学\
		// 							</span>\
		// 							<p class="hide-detail-source">\
		// 								发布者:'+ data.list[i].provider+'\
		// 								<br>\
		// 								分类：'+data.list[i].categoryName+'\
		// 							</p>\
		// 							<p class="hide-detail-description">\
		// 									'+data.list[i].description+'</p>\
		// 						</div>\
		// 				</li>';
		// };	
	
		var oParagraph = _.template($("#courseInfoTmp").html())({count:data.list.length,data:data});
		oUl.html(oParagraph);	
	}
});





/*
 *@method 功能:给按钮【产品设计】和【编程语言】添加点击事件
**/
$(document).ready(function() {
	
	var oMainTitBox = $("#courseType");
	var oMainTit1 = oMainTitBox.find('li').eq(0);
	var oMainTit2 = oMainTitBox.find('li').eq(1);

	oMainTit1.click(function(){
		if(GLOBAL.NEW.type != 10){
			GLOBAL.NEW.type = 10;
			oMainTit2.attr('class', 'course-type-name');
			$(this).attr('class', 'course-type-name-active');
			//运行ajax函数	
			$.ajax({
				type:'get',
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				data : {
				    'pageNo':GLOBAL.NEW.pageNo,
				    'psize':GLOBAL.NEW.psize,
				    'type':GLOBAL.NEW.type
				},
				dataType: 'json',
			    success : function(data){
			       GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	});

	oMainTit2.click(function(){
		if(GLOBAL.NEW.type != 20){
			GLOBAL.NEW.type = 20;
			oMainTit1.attr('class', 'course-type-name');
			$(this).attr('class', 'course-type-name-active');		
			//运行ajax函数
			$.ajax({
				type:'get',
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				data : {
				    'pageNo':GLOBAL.NEW.pageNo,
				    'psize':GLOBAL.NEW.psize,
				    'type':GLOBAL.NEW.type
				},
				dataType: 'json',
			    success : function(data){
			       GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	});
});
	



/*
 *@method 功能:给页码添加点击事件
**/

$(document).ready(function() {
	
	var oPageBox = $("#mainPage");
	var oPageLeft = oPageBox.find('span').eq(0);
	var oPageRight = oPageBox.find('span').eq(1);
	var aPage = oPageBox.find('nav').eq(0).find('a');

	//点击上一张
	oPageLeft.click(function(){
		if(GLOBAL.NEW.pageNo>1){
			aPage.eq(GLOBAL.NEW.pageNo-1).attr('class', 'page-number');
			GLOBAL.NEW.pageNo--;
			console.log(GLOBAL.NEW.pageNo);
			aPage.eq(GLOBAL.NEW.pageNo-1).attr('class', 'page-number-active');
			$.ajax({
				type:'get',
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				data : {
				    'pageNo':GLOBAL.NEW.pageNo,
				    'psize':GLOBAL.NEW.psize,
				    'type':GLOBAL.NEW.type
				},
				dataType: 'json',
			    success : function(data){
			       GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	});
	//点击下一张
	oPageRight.click(function(){
		if(GLOBAL.NEW.pageNo<8){
			aPage.eq(GLOBAL.NEW.pageNo-1).attr('class', 'page-number');
			GLOBAL.NEW.pageNo++;
			console.log(GLOBAL.NEW.pageNo);
			aPage.eq(GLOBAL.NEW.pageNo-1).attr('class', 'page-number-active');
			//运行ajax函数
			$.ajax({
				type:'get',
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				data : {
				    'pageNo':GLOBAL.NEW.pageNo,
				    'psize':GLOBAL.NEW.psize,
				    'type':GLOBAL.NEW.type
				},
				dataType: 'json',
			    success : function(data){
			       GLOBAL.NEW.fnNew(data);
			    }
			});
		}
	});
	//点击页码
	for(var i = 0; i < aPage.length; i++){
		aPage.eq(i).attr('index', i );
		aPage.eq(i).click(function(){
			if((GLOBAL.NEW.pageNo-1) != $(this).attr('index')){
				for(var i = 0; i < aPage.length; i++){
					aPage.eq(i).attr('class', 'page-number');
				}
				GLOBAL.NEW.pageNo = parseInt($(this).attr('index'))+1;
				$(this).attr('class', 'page-number-active');
				//运行ajax函数
				$.ajax({
					type:'get',
					url: 'http://study.163.com/webDev/couresByCategory.htm',
					data : {
					    'pageNo':GLOBAL.NEW.pageNo,
					    'psize':GLOBAL.NEW.psize,
					    'type':GLOBAL.NEW.type
					},
					dataType: 'json',
				    success : function(data){
				       GLOBAL.NEW.fnNew(data);
				    }
				});	
			}	
		});
	}
});


/*
 *@method 功能:最热排行结构生成
**/

$(document).ready(function() {
	var DataHot = null;
	var oTimer = null;
	var index = 0;
	$.ajax({
		type:'get',
		url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
		data : {
		    'pageNo':GLOBAL.NEW.pageNo,
			'psize':GLOBAL.NEW.psize,
			'type':GLOBAL.NEW.type
		},
		dataType: 'json',
		success : function(data){
		fnNewHot(data);
		}
	});

	//生成最热排行HTML结构
	function fnNewHot(data){
		var oUl = $("#hotCouseList");
		var html = '';
		oUl.html('');
		for(var i = 0; i < data.length; i++){
			html += '<li class="hot-course-list">\
						<img class="hot-course-img" src="'+ data[i].smallPhotoUrl+'">\
						<div class="hot-course-introduce">\
							<h3 class="hot-course-introduce-tit">'+ data[i].name+'</h3>\
							<p class="hot-course-student">\
								<span class="people fa fa-user"></span>\
								<span class="people">'+ data[i].learnerCount+'</span>\
							</p>\
						</div>\
					</li>';
		}
		oUl.html(html+html);
	}

	//每5秒更新课程
	oTimer = setInterval( function(){
		var oUl = $("#hotCouseList");
		var oLi = oUl.find('li').eq(0);
		index++;
		var aHeight = (-70*index) + 'px';
		oLi.css('margin-top', aHeight);
		if (index == 21) {
			oLi.css('margin-top', '');
			index = 0;
			oLi.css('transition', 'margin 0ms');
		}
	},5000);	
});



/*
 *@method 功能:关注网易教育产品部
**/
$(document).ready(function() {
	var oTitBox = $("#headerLogo");
	var oFocus = oTitBox.find('div').eq(0);
	var oFansNum = oTitBox.find('p').eq(0).find('span').eq(0);
	var oLoginWrap = $("#hideLogin");
	var oLogin = oLoginWrap.find('div').eq(0);
	var oClose = oLoginWrap.find('span').eq(0);
	var oForm = $("fomrs[0]");
	var oUser = $("#hideLoginInput");
	var oPassword = $("#hideLoginPass");
	var oNo = document.createElement('span');

	var aTitBox = document.getElementById('headerLogo');
	var aFocus = aTitBox.getElementsByTagName('div')[0];
	
	//根据关注的cookie来决定关注div的显示方式
	if($.cookie('followSuc')){
		oFansNum.html(Number(oFansNum.html())+1);
		oFocus.find('span').eq(0).attr('class', 'header-fans-active');	
		oFocus.find('span').eq(1).html('已关注&nbsp;&nbsp;&nbsp;|&nbsp;');
		oFocus.css('backgroundPosition', '-80px 0');	
		//$(document).append('<span id="loginCancle" class="people header-fans-no">取消</span>')
		oNo.className = 'people header-fans-no';
		oNo.innerHTML = '取消';
		aFocus.appendChild(oNo);

	}
	//关注按钮
	oFocus.click(function() {
		//如果未登录
		if ($.cookie('loginSuc') != 1) {
 			fnLoginOpen();
		}else{
			//如果已登录，但未关注
			if ($.cookie('followSuc') == 1) {
				console.log($.cookie('followSuc'));
				fnFocusYes();
			}
		}
	});

	//关闭按钮
	oClose.click(function() {
		fnLoginClose();
	});
	//取消按钮
	oNo.onclick = function(ev){
	 	var e = ev || event;
	 	e.cancelBubble = true;
	 	fnFocusNo();
	}	

	$("form").submit(function(){
		$.ajax({
			type:'get',
			url: 'http://study.163.com/webDev/login.htm',
			data : {
	 		    'userName':hex_md5(oUser.val()),
	 		    'password':hex_md5(oPassword.val())
	 		},
			dataType: 'json',
			success : function(data){
			if(!data){
	 	    		alert('您输入的不正确，测试帐号为studyOnline，密码为study.163.com');
	 	    		oUser.val('studyOnline');
	 	    		oPassword.val('study.163.com');
	 	       	}else{
	 	       		alert('登录成功');
	 	       		$.cookie('loginSuc','1',{expires:1});
	 	       		console.log($.cookie('loginSuc'));
	 	       		fnFocusYes();
	 	       		fnLoginClose();
	 	       }
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
 				alert(XMLHttpRequest.status);
 				alert(XMLHttpRequest.readyState);
 				alert(textStatus);
  			 },
			isCache : true
		});	
		return false;
	});
	//登录框的显示
	function fnLoginOpen(){
		oLoginWrap.css('background-color', 'rgba(0,0,0,0.5)');
		oLoginWrap.css('z-index', '1');
		oLogin.css('transform', 'scale(1)');
		oLogin.css('visibility', 'visible');
	}

	//登录框的关闭
	function fnLoginClose(){
		oLoginWrap.css('background-color', 'rgba(0,0,0,0)');
		oLoginWrap.css('z-index', '-1');
		oLogin.css('transform', 'scale(0)');
		oLogin.css('visibility', 'hidden');
	}

	//设置关注
	function fnFocusYes(){
		if(!$.cookie('followSuc')){
			$.cookie('followSuc','1',{expires:1});	
			oFansNum.html(Number(oFansNum.html())+1);
			oFocus.attr('class', 'header-fans-active');	
			oFocus.find('span').eq(0).css('backgroundPosition', '-80px 0');	
			oFocus.find('span').eq(1).html('已关注&nbsp;&nbsp;&nbsp;|&nbsp;');	
			oNo.className = 'people header-fans-no';
			oNo.innerHTML = '取消';
			aFocus.appendChild(oNo);
		}
	}
	//取消关注
	function fnFocusNo(){
		oFansNum.html(Number(oFansNum.html()-1));
		oFocus.attr('class', 'header-fans');	
		oFocus.find('span').eq(0).attr('backgroundPosition', '-40px 0');	
		oFocus.find('span').eq(1).html('关注');
		oNo.parentNode.removeChild(oNo);	
		$.cookie('followSuc','',{expires:-1});
	}
});