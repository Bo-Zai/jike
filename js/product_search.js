$(function(){
    /*******是否显示有货样式切换*********/
    $("[data-active=on_off]").click(function(){
        $("[data-class=on_off]").toggleClass("on");
    })

    /***********产品排序列表切换************/
    var $price = $("[data-order=price]");       //获取价格排序元素
    var result = 0;                             //用于保存价格排序是否为升序状态，避免混淆移入移出效果与点击效果
    $("[data-order=items]>span").click(function(){
        var $tar = $(this);                         //获取DOM对象，并转为jQuery对象
        if($tar[0] == $price[0]){                   //判断点击的元素是否为价格排序
            var order_class = $tar.attr("class");   //获取价格排序的class属性，用于判断排序状态
            $tar.siblings().removeClass("order_bg");    //将其他兄弟元素移除点击状态
            if(order_class=="default"){
                $tar.removeClass().addClass("desc");
            }else if(order_class=="desc"){
                $tar.removeClass().addClass("asc");
                result = 1;                             //价格排序状态改为升序，
            }else if(order_class=="asc"){
                $tar.removeClass().addClass("desc");
            }
        }else{                                             //点击其他排序元素
            $tar.addClass("order_bg").siblings().removeClass("order_bg");
            $price.removeClass().addClass("default");       //价格排序状态改为默认样式
            result = 0;                                       //价格排序状态为非升序
        }
    })
    $price.hover(     //价格排序移入移出效果
        function(){
            var $tar = $(this);
            var order_class = $tar.attr("class");
            if(order_class=="default"){
                $tar.removeClass().addClass("asc");
            }
        },
        function(){
            var $tar = $(this);
            var order_class = $tar.attr("class");
            console.log(order_class,result);
            //鼠标移出时，判断价格排序状态，result为零说明价格排序为非升序
            if(order_class=="asc"&&result==0){
                $tar.removeClass().addClass("default");
            }
        }
    )

    /***********产品项鼠标移入移出 收藏、购物车图标************/
    $("[data-pro=items]").each(function(i){
        //图标显示，隐藏
        $(this).hover(
            ()=>{
                $("[data-pro=icon]:eq("+i+")").stop().fadeIn(600);
            },
            ()=>{
                $("[data-pro=icon]:eq("+i+")").stop().fadeOut(400);
            }
        )
        //图标提示文字显示，隐藏
        $("[data-icon=like]").hover(
            ()=>{
                $("[data-icon=like]:eq("+i+")").toggleClass("pro_like_show");
            }
        )
        $("[data-icon=cart]").hover(
            ()=>{
                $("[data-icon=cart]:eq("+i+")").toggleClass("pro_cart_show");
            }
        )
        //点击图标，功能未上线提示
        $("[data-icon=like]:eq("+i+"),[data-icon=cart]:eq("+i+")").click(()=>{
            alert("功能未上线！敬请期待！");
        })
    })

    /*********页码跳转************/
    var pno = 1,
        page_count = 4,
        $next = $("[data-page=next]"),
        $prev = $("[data-page=prev]");
    $("[data-page=list]>li").click(function(){
        var $tar = $(this);
        if($tar[0] == $prev[0]){
            if(pno != 1 && pno > 1){
                pno -= 1;
                $("[data-page=list]>li:eq("+pno+")")
                    .addClass("pno_active")
                    .siblings()
                    .removeClass("pno_active");
            }
            if(pno == 1){
                $tar.removeClass("pno_hover");
                $tar.css(
                    "backgroundImage",
                    "url(./img/product_search/arrow_lf.png)"
                );
            }
        }else if($tar[0] == $next[0]){
            if(pno != page_count && pno < page_count){
                pno += 1;
                $("[data-page=list]>li:eq("+pno+")")
                    .addClass("pno_active")
                    .siblings()
                    .removeClass("pno_active");
            }
            if(pno == page_count){
                $tar.removeClass("pno_hover");
                $tar.css(
                    "backgroundImage",
                    "url(./img/product_search/arrow_rg.png)"
                );
            }
        }else{
            $tar.addClass("pno_active")
                .siblings()
                .removeClass("pno_active");
            pno = $("[data-page=list]>li").index($tar);
        }
    })
    $("[data-page=list]>li").hover(
        e=>{
            var $tar = $(e.target);
            if($tar[0] == $prev[0]){
                if(pno != 1){
                    $tar.addClass("pno_hover");
                    $tar.css(
                        "backgroundImage",
                        "url(./img/product_search/arrow_lf_hover.png)"
                    );
                }
            }else if($tar[0] == $next[0]){
                if(pno != page_count){
                    $tar.addClass("pno_hover");
                    $tar.css(
                        "backgroundImage",
                        "url(./img/product_search/arrow_rg_hover.png)"
                    );
                }
            }else{
                $tar.addClass("pno_hover");
            }
        },
        e=>{
            var $tar = $(e.target);
            $tar.removeClass("pno_hover");
            if($tar[0] == $prev[0])
                $tar.css(
                    "backgroundImage",
                    "url(./img/product_search/arrow_lf.png)"
                );
            if($tar[0] == $next[0])
                $tar.css(
                    "backgroundImage",
                    "url(./img/product_search/arrow_rg.png)"
                );
        }
    )
    $("[data-pro=items]").click(e=>{
        var $tar = $(e.target);
        if($tar[0] != $("[data-icon=like]")[0] && $tar[0] != $("[data-icon=cart]")[0]){
            location = "product_details.html";
        }
    })
})