// 全局动画；
	window.onload = function (){
		var myCV = {};
		//初始化；
		myCV.inti = function (){
			var w = $(window).width();
			var h = $(window).height();
			$('#dbox').height(h);
			$('#dbox .wrap').css('-webkit-transform-origin', 'center center '+w/2+'px');
			window.onresize = function (){
			 w = $(window).width();
			$('#dbox .wrap').css('-webkit-transform-origin', 'center center '+w/2+'px');
			}
		}
		myCV.inti();
		//事件；
		myCV.events = function (){
			$('#nav').find('li').each(function(i,elem){
			$(elem).on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
				globalAnimation.tab(globalAnimation.iNow,i);
				globalAnimation.iNow = i;
				if(i==0)
				{
					myCV.scen1();
				}else{
					myCV.scen1r();
				}

				if(i==1)
				{
					myCV.scen2();
				}else{
					myCV.scen2r();
				}
				if(i == 2)
				{
					myCV.scen3txt();
				}else{
					myCV.scen3txtr();
				}
				if(i ==3 )
				{
					myCV.scen4();
				}else{
					myCV.scen4r();
				}
				})
			})
		}
		//第一屏动画；
		myCV.scen1 = function (){
			$('.scen1 .pic').addClass('rota');
			$('.intr').css({'opacity':'1','transition':'.5s'});
			$('.intr').find('h1').eq(0).css({'transform':'translate(0px)','opacity':1,'transition':'1s 0.5s'});
			$('.intr').find('h2').eq(0).css({'transform':'translate(0px)','opacity':1,'transition': '1s 1s'});
		}
		//切换到其他屏时第一屏动画归位；
		myCV.scen1r = function (){
			$('.scen1 .pic').removeClass('rota');
			$('.intr').css({'opacity':'0','transition':'none'});
			$('.intr').find('h1').eq(0).css({'transform':'translate(-320px)','opacity':0,'transition':'none'});
			$('.intr').find('h2').eq(0).css({'transform':'translate(320px)','opacity':0,'transition':'none'});
		}
		//第二屏动画；
		myCV.scen2 = function (){
			var i = 0;
			var oTimer = null;
			clearInterval('oTimer');
			oTimer = setInterval(function(){
				$('.scen2  .wrap').find('div').eq(i).addClass('open')
			i++;
			if(i==$('.scen2  .wrap').find('div').length)
			{
				clearInterval(oTimer);
				i=0;
			}
			},150)	
		}
		//第二动画归位；
		myCV.scen2r = function (){
				$('.scen2 .wrap').find('div').each(function(i,elem){
					$(elem).removeClass('open');
				})
		}
		//第三屏
	myCV.scen3 = function (){
		var oPrevDiv = document.getElementsByClassName('prev_div')[0];
		var oNextDiv = document.getElementsByClassName('next_div')[0];
		var automatic = document.getElementById('automatic');
		var aLi = automatic.getElementsByTagName('li');
	
		var arr = [];
	
		for(var i=0;i<aLi.length;i++){
			var oImg = aLi[i].getElementsByTagName('img')[0];
			
			arr.push( [ parseInt(getStyle(aLi[i],'left')),parseInt(getStyle(aLi[i],'top')),getStyle(aLi[i],'opacity')*100,getStyle(aLi[i],'zIndex') , oImg.width ] );
			
		}
		oPrevDiv.onclick = function(){  //左
			arr.push(arr[0]);
			arr.shift();
			
			for(var i=0;i<aLi.length;i++){
				
				var oImg = aLi[i].getElementsByTagName('img')[0];
				
				aLi[i].style.zIndex = arr[i][3];
				
				startMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] });
				
				startMove( oImg,{ width : arr[i][4] } );
				
			}
			
		};
	
		oNextDiv.onclick = function(){  //右
			arr.unshift(arr[arr.length-1]);
			arr.pop();
			
			for(var i=0;i<aLi.length;i++){
				
				var oImg = aLi[i].getElementsByTagName('img')[0];
				
				aLi[i].style.zIndex = arr[i][3];
				
				startMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] });
				
				startMove( oImg,{ width : arr[i][4] } );
				
			}
		};
		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj,false)[attr];
			}
		}
	}
	// 第三屏下的文字效果；
	myCV.scen3txt = function (){
		$('.skill').find('p').addClass('current');
	}
	myCV.scen3txtr = function (){
		$('.skill').find('p').removeClass('current');
	}

	// 第四屏动画；
	myCV.scen4 = function (){
		$('.box4').addClass('current');
		var i = 0;
		var oTimer = null;
		setTimeout(function(){
		oTimer = setInterval(drop,200)
		},1000);
		function drop(){
		$('.box4').find('p').eq(i).addClass('active');
		i++;
		if(i==3)
		{
			clearInterval(oTimer);
		}
		}
	}
	// 第四屏动画归位；
	myCV.scen4r = function (){
		$('.box4').removeClass('current');
		for(var i = 0;i<3;i++){
			$('.box4').find('p').eq(i).removeClass('active');
		}
	}

		myCV.scen1();
		myCV.scen3();
		myCV.events();



		//全局切换动画对象；
		var globalAnimation = {};
		globalAnimation.iNow= 0;
		globalAnimation.tab = function (iOld,iNow){
			if(iOld == iNow)
			{
				return;
			}
			$('#dbox .wrap').bind("webkitTransitionEnd",end)
			$('#dbox .wrap').css('transition','.5s');
			if(iNow<iOld)
			{
				$('#dbox .wrap').find('.scen').eq(iNow).addClass('prve');
				$('#dbox .wrap').css('-webkit-transform','rotateY(-90deg)')
			}else{
				$('#dbox .wrap').find('.scen').eq(iNow).addClass('next');
				$('#dbox .wrap').css('-webkit-transform','rotateY(90deg)')
			}
			function end(){
				$('#dbox .wrap').find('.scen').eq(iNow).removeClass('next prve').addClass('active');
				$('#dbox .wrap').find('.scen').eq(iOld).removeClass('active');
				$('#dbox .wrap').css({'transition':'none','-webkit-transform':'rotateY(0deg)'});
			}
		}
	}