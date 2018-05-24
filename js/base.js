//引入头部和底部
$.get({
    url:"./header.html",
    success:function(data){
        $("#header").html(data);
    }
})
$.get({
    url:"./footer.html",
    success:function(data){
        $("#footer").html(data);
        $(function(){
            /********导航菜单-子菜单旋转+指示线条位移*****************************/
            $("[data-nav=item]").each(function(i) {
                var $ul = $("[data-nav=item]:eq("+i+")");
                $ul.hover(
                    function(e){
                        if($(e.target)[0] == $ul.find("li:first>a")[0]){    //第一个li元素中的a才能触发事件
                            var $tar = $ul.find(":first-child");
                            $tar.siblings().addClass("nav_show");       //子菜单旋转显示
                            $(".nav_line").css("left", `${i * 120}px`);   //根据下标计算指示条的左边距
                        }
                    },
                    function(){
                        var $tar = $ul.find(":first-child");
                        $tar.siblings().removeClass("nav_show");
                        $(".nav_line").css("left", 0);               //鼠标移出，指示条左边距为 0
                    }
                )
            })

            /*************搜索框隐藏 展开***************************/
            $("[data-search=icon]>img").click(e=>{
                var $tar = $(e.target);
                var src = $tar.attr("src");                 //获取图片的src，根据src判断搜索框处于展开还是关闭
                var $input = $tar.parent().prev();          //获取搜索框元素
                $input.find("input").trigger("focus");      //点击搜索图标，输入框获取焦点
                if(src=="img/index/header/search.png"){     //图片是搜索图标，则将搜索框展开
                    $input.stop().animate({                  //stop()防止动画叠加
                        "width":260
                    },200,function(){
                        $tar.attr("src","img/index/header/close.png");      //将图片切换为关闭图标
                    });
                }else{
                    $input.stop().animate({
                        "width":0
                    },200,function(){
                        $tar.attr("src","img/index/header/search.png");
                    }).find("input").val("");                               //关闭搜索框，清空搜索框中的内容
                }
            })
            //搜索框失去焦点，将搜索框关闭，清空内容，图标切换为搜索
            $(".s_input>input").blur(e=>{
                var $tar = $(e.target);
                $tar.parent().animate({
                    "width":0
                },200,function(){
                    $tar.val("").parent().next().find("img").attr("src","img/index/header/search.png");
                });
            })

            //搜索框 回车跳转至搜索页面
            $("#search").keydown(e=>{
                if(e.keyCode == 13)
                    location="product_search.html";
            })

            /*********购物车下拉列表**********/
            var $cart_content = $("[data-cart=content]");   //整个购物车列表
            var $cart_icon = $("[data-cart=icon]");         //购物车图标
            var $cart_items = $("[data-cart=items]");       //购物车商品列表项
            //鼠标移入移出购物车图标，购物车显示，隐藏
            $cart_icon.hover(
                ()=>{
                    $cart_content.stop().animate({
                        height:$cart_items.length*88+80  //购物车商品列表项的个数 * 每个列表项的高度 + 结算按钮的高度
                    },200);
                },
                ()=>{
                    $cart_content.stop().animate({
                        height:0
                    },200);
                }
            )
            //鼠标移入移出购物车列表，购物车显示，隐藏
            $cart_content.hover(
                function(){
                    $(this).stop().animate({
                        height:$cart_items.length*88+80
                    },200)
                    $("[data-cart=icon]").addClass("cart_icon_hover");
                },
                function(){
                    $(this).stop().animate({
                        height:0
                    },200)
                    $("[data-cart=icon]").removeClass("cart_icon_hover");
                }
            )
            //点击结算跳转购物车页面
            $("[data-cart=pay]").click(e=> location="cart.html")

            //购物车图标移入
            $("[data-cart=icon]").hover(
                function(){
                    $(this).toggleClass("cart_icon_hover");
                }
            )

            //验证用户是否已经登录
            $.get({
                url:"data/user/isLogin.php",
                success:function(data){
                    //如果session中uid已存在该用户的uid，将登录注册隐藏，将欢迎和注销显示
                    if(data.ok==1){
                        $(".logout").removeClass("u_blank");
                        $(".login").addClass("u_blank");
                        $("[data-user=uname]").text(`${data.uname}`);
                        //给注销按钮绑定单击事件
                        $("[data-user=logout]").click(e=>{
                            //取消a标签的默认事件
                            e.preventDefault();
                            $.get({
                                url:"data/user/logout.php",
                                success:function(){
                                    //注销成功则刷新页面，重新向isLogin.php发送请求，验证是否登录
                                    location="index.html";
                                }
                            })
                        })
                    }
                }
            })

            //图片懒加载
            var winHeight = $(window).height(); //获得浏览器的高度
            $("img").each((i,e)=>{
                var imgHeight = $(e).offset().top;		//获得每张图片相对于顶部的高度
                var	scrollHeight = $(window).scrollTop(); 		//获得滚动条相对于顶部的高度
                if(imgHeight - winHeight < scrollHeight){	//将出现在可视窗口的图片显示
                    $(e).attr("src",$(e).data("src"));
                }
                $(window).scroll(()=>{
                    scrollHeight = $(window).scrollTop(); 		//重新获得滚动条相对于顶部的高度
                    //判断图片是否出现在可视窗口， 并且排除已经加载过的图片
                    if(imgHeight - winHeight < scrollHeight && $(e).attr("src") != $(e).data("src")){
                        $(e).attr("src",$(e).data("src"));
                    }
                })
            })
        })
    }
})


