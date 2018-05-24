$(function(){
	/*************轮播图********************/
	var $carrousel=$("#carrousel"),
		$ids=$("#indicators"),
		$b_line=$("#b_line");
	var i=0,timer=null;
	function show(i){		//图片轮播 指示圆点样式切换
		$carrousel.children("li:eq("+i+")").addClass("img_show").siblings().removeClass("img_show");
		$ids.children(":eq("+i+")").addClass("c_hover").siblings().removeClass("c_hover");
		$b_line.css("width",0).stop().animate({width:1360},800);
	}
	function carousel(){
		i += 1;
		if(i > 3) i= 0;
		show(i);
	}
	timer=setInterval(carousel,2000);
	//鼠标进入#banner时，停止图片轮播
	$("#banner").hover(
		()=>{
			clearInterval(timer);
			timer=null;				//释放定时器
		},
		()=> timer=setInterval(carousel,2000)
	)
	//给左右箭头绑定单击事件
	$("[data-move=left]").click(()=>{
		i = i > 0 ? i - 1 : 3;
		show(i);
	})
	$("[data-move=right]").click(()=>{
		i = i < 3 ? i + 1 : 0;
		show(i);
	})
	//给指示圆点绑定鼠标移入动画
	$ids.on("mouseover","li",function(){
			var $li=$(this);
			//var l_index=;		//找出触发事件的li位于父元素中的位置（下标）
			show($li.index());
	})

	/*************超值精选产品-鼠标移入旋转******************/
	$(".s_pro").each(function(i){
		$(this).hover(
			()=>{
				$("[data-s_pro=pro]:eq("+i+")").removeClass("s_show").addClass("s_hide");
				$("[data-s_pro=word]:eq("+i+")").addClass("s_show").removeClass("s_hide");
			},
			()=>{
				$("[data-s_pro=word]:eq("+i+")").removeClass("s_show").addClass("s_hide");
				$("[data-s_pro=pro]:eq("+i+")").addClass("s_show").removeClass("s_hide");
			}
		)
	})

	/**********************新品推荐-鼠标移入 查看详情 按钮下移*****************************/
	$("[data-nPro=pro_list]").each(function(i,elem){
		$(this).hover(
			()=>{
				$("[data-nPro=info]:eq("+i+")").toggleClass("n_down");
				$("[data-nPro=img]:eq("+i+")").toggleClass("pro_hover");
				$("[data-nPro=shade]:eq("+i+")").toggle();
			}
		);
		$("[data-nPro=info]:eq("+i+")").hover(
			(e)=>{
				var $tar = $(e.target);
				$tar.toggleClass("change_color");
			}
		)
	})

	/**************首页楼层滚动效果******************/
	function liftIsShow(isShow){		//判断电梯按钮是否显示
		if(isShow){
			$("#lift").show();
		}else{
			$("#lift").hide();
		}
	}
	var isShow = $(this).scrollTop() > 560 ? 1 : 0;		//当前位置大于560 电梯按钮显示
	liftIsShow(isShow);
	$(window).scroll(function(){
		isShow = $(this).scrollTop() > 560 ? 1 : 0;
		liftIsShow(isShow);
	})
	//电梯按钮绑定单击事件
	$("#lift").on("click","li",function(){
		var $tar = $(this);
		var nowPosition = $(window).scrollTop();	//获取当前所在位置
		var time = 0;								//动画时长
		if($tar.is("[data-site=top]")){				//为回到顶部绑定动画
			if(nowPosition < 200){
				time = 200;
			}else{
				time = 900;
			}
			$("html,body").stop().animate({
				scrollTop:0
			},time);
		}else{
			var target = $($tar.data('site')).offset().top-80;			//获取目标位置
			var distance =
				nowPosition-target<0
					? (nowPosition-target)*-1
					: nowPosition-target;		//获取当前位置和目标位置的相距距离
			if(distance > 1000){		//依据相距距离的远近，给动画时长赋值
				time = 900;
			}else if(distance > 700){
				time = 800;
			}else if(distance > 400){
				time = 500;
			}else{
				time = 300;
			}
			$("html,body").stop().animate({
				scrollTop:target
			},time)
		}

	})

	//页面跳转
	$("[data-nPro=info]").click(e=>{
		location = "product_details.html";
	})
	$(".s_pro_buy").click(e=>{
		location = "product_details.html";
	})
	$("#carrousel").click(e=>{
		location = "product_details.html";
	})
})

