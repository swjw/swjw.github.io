// 全局动画；
	window.onload = function (){
		var myCV = {};
		//初始化；
		myCV.inti = function (){
			var w = $(window).width();
			$('#dbox .wrap').css('-webkit-transform-origin', 'center center '+w/2+'px');
			window.onresize = function (){
			 w = $(window).width();
			$('#dbox .wrap').css('-webkit-transform-origin', 'center center '+w/2+'px');
			}
		}
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

		myCV.scen1();
		myCV.inti();
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
