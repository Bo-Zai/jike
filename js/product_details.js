$(function(){
    /************鼠标移入中图片实现放大镜效果******************/
    var mask = $("#mask");
    var superMask = $("#superMask");
    var lgPic = $("#pro_lg_pic");
    var width = 200;            //小遮罩层的宽度
        $("#superMask").mouseover(          //给大遮罩层绑定鼠标移入移出事件
            function(){
                mask.show();          //鼠标移入小遮罩层显示，移出隐藏
                lgPic.show();         //鼠标移入大图片显示，移出隐藏
            }
        );
        $("#superMask").mouseout(function(){
            mask.hide();
            lgPic.hide();
        })
        $("#superMask").mousemove(function(e){
            var x = e.offsetX-width/2;      //获取相对于事件元素左上角的x轴位置
            var y = e.offsetY-width/2;      //获取相对于事件元素左上角的y轴位置
            x = x<0?0:x>260?260:x;          //大遮罩层为460px，小遮罩层为200px，460-200=260px
            y = y<0?0:y>260?260:y;
            mask[0].style.left=x+"px";
            mask[0].style.top=y+"px";
            lgPic.css("backgroundPosition",`${-x*1.2}px ${-y*1.2}px`);     //修改大图背景图片的定位

        })

    /******商品简介*******/
    $("[data-detail=tab_intro]").click(function(){
        $(this).addClass("details_active").siblings().removeClass("details_active");
        $("[data-detail=evaluate]").hide();
        $("[data-detail=intro]").show();
    })
    /******商品评价*******/
    $("[data-detail=tab_eval]").click(function(){
        $(this).addClass("details_active").siblings().removeClass("details_active");
        $("[data-detail=intro]").hide();
        $("[data-detail=evaluate]").show();
    })
    /****评价标签*****/
    $("[data-comment=info_list]>li").click(function(){
        $(this).addClass("comment_active").siblings().removeClass("comment_active");
    })

    /*******小图片列表横向滚动**********/
    var moved = 0;                          //设置移动的初始化步数为0
    $("[data-arrow=lf]").click(function(){
        if(moved<0){                       //只有移动步数小于0时才能向左移动
            moved+=1;                       //向左移动一次，移动步数加1
            $("[data-pic=sm_list]").animate({
                left:102*moved
            })
            $("[data-arrow=rg]").removeClass("disable"); //移除右箭头的禁用样式
            if(moved>=0) {
                $(this).addClass("disable");    //左箭头增加禁用样式
            }
        }
    })
    $("[data-arrow=rg]").click(function(){
        //只有移动步数大于图片列表减4的取反值，才能向右移动，以保证移动到最后一张图不再向右移动
        if(moved>-($("[data-pic=sm_list]>li").length-4)){
            moved-=1;                      //向右移动一次，移动步数减1
            $("[data-pic=sm_list]").animate({
                left:102*moved
            })
            $("[data-arrow=lf]").removeClass("disable");    //移除左箭头的禁用样式
            if(moved<=-($("[data-pic=sm_list]>li").length-4)){
                $(this).addClass("disable");            //右箭头增加禁用样式
            }
        }
    })

    /******鼠标移入小图片切换中图片********/
    $("[data-pic=sm_list]>li").mouseover(function(){
        $(this).addClass("sm_active").siblings().removeClass("sm_active"); //给li增加边框样式
        var src = $(this).find("img").attr("src");          //获取小图片的src地址
        src = src.replace("sm","md");                       //将文件夹名sm更换为md
        $("#pro_md_pic>img").attr("src",src);               //将中图片的src地址替换为变量src
        src = src.replace("md","lg");                       //将文件夹名md更换为lg
        $("#pro_lg_pic").css("background",`url(./${src})`); //将大图片的背景图地址替换为变量src
    })

    /********选择规格********/
    $("[data-spec=spec_list]>a").click(e=>{
        e.preventDefault();
        var $tar = $(e.target);
        $tar.addClass("active").siblings().removeClass("active");
    })

    /*******选择数量*******/
    var $count = $("[data-input=counts]");
    var num =  parseInt($count.val());
    $("[data-btns=count]").click(function(){
        var $tar = $(this);
        if($tar.text()=="-"&&num>1){
            num--;
            $count.val(num);
        }else if($tar.text()=="+"&&num<19){
            num++;
            $count.val(num);
        }
    })
    //当输入框失去焦点时，如果输入为空或者输入0则将默认值改为1
    $count.blur(e=>{
        var $tar = $(e.target);
        if($tar.val()==""||$tar.val()==0){
            $tar.val(1);
        }
    })
    //验证用户输入的是否是一个非数字，以及输入的数字是否大于库存
    $count.keyup(e=>{
        var $tar = $(e.target);
        if(isNaN($tar.val())){      //用户输入非数字，启动定时器，将数值修改为1
            setTimeout(function(){
                $tar.val(1);
            },500)
        }else if($tar.val()>19){    //用户输入数量大于库存，将数值修改为库存数量
            $tar.val(19);
        }
    })

    /****购买，购物车功能未上线提示******/
    $("[data-btns=now_buy],[data-btns=add_cart]").click(()=>{
        alert("功能未上线！敬请期待！");
    })
})





