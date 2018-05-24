$(function(){
    //输入框获取焦点-失去焦点
    $(".register>form input").each(function(i,elem){
        $(elem).focus(e=>{  //绑定获取焦点事件
            var $tar = $(e.target);
            $tar.parent().removeClass().addClass("show");
        });
        $(elem).blur(e=>{  //绑定失去焦点事件
            var $tar = $(e.target);
            if($tar.val()==""){
                //如果input值为空，给其父元素添加default样式，label将会在输入框中
                $tar.parent().removeClass().addClass("default");
            }else{
                //如果input值不为空，给其父元素多添加一个blur样式，是为了让label能够在输入框上方，不会到输入框中间
                $tar.parent().removeClass().addClass("default").addClass("blur");
            }
        })
    })

    //给注册按钮绑定单击事件，进行表单验证
    var nReg = new RegExp("^\\w{3,10}$","i");
    var pReg = new RegExp("^\\w{8,10}$");
    var phReg = new RegExp("^[1][3,5,7,8]\\d{9}$");
    var $uname = $("[data-form=uname]");
    var $upwd = $("[data-form=upwd]");
    var $upwd_2 = $("[data-form=upwd_2]");
    var $phone = $("[data-form=phone]");
    $("[data-form=submit]").click(e=>{
        e.preventDefault();
        if(!nReg.test($uname.val().trim())){
            //验证不通过，让输入框获取焦点，并给其父元素添加error样式
            $uname.trigger("focus").parent().removeClass().addClass("error");
            //程序停止向下执行；
            return;
        }else{
            //验证通过，给其父元素添加default样式，和blur样式，让label在输入框上方
            $uname.parent().removeClass().addClass("default").addClass("blur");
        }
        if(!pReg.test($upwd.val().trim())){
            $upwd.trigger("focus").parent().removeClass().addClass("error");
            return;
        }else{
            $upwd.parent().removeClass().addClass("default").addClass("blur");
        }
        if($upwd_2.val().trim()!=$upwd.val().trim()){
            $upwd_2.trigger("focus").parent().removeClass().addClass("error");
            return;
        }else{
            $upwd_2.parent().removeClass().addClass("default").addClass("blur");
        }
        if(!phReg.test($phone.val().trim())){
            $phone.trigger("focus").parent().removeClass().addClass("error");
            return;
        }else{
            $phone.parent().removeClass().addClass("default").addClass("blur");
        }
        //验证通过向data/user/register.php发送ajax请求
        var uname = $uname.val().trim(),
            upwd = $upwd.val().trim(),
            phone = $phone.val().trim();
        $.ajax({
            type:"POST",
            url:"data/user/register.php",
            data:{uname:uname,upwd:upwd,phone:phone},
            success:function(data){
                if(data.ok==1){
                    alert(data.msg);
                    location.assign("login.html");
                }else{
                    alert(data.msg);
                }
            }
        })
    })

    //给注册按钮绑定鼠标移入移出事件
    $("[data-form=submit]").hover(
        e=>{
            var $tar = $(e.target);
            $tar.toggleClass("s_hover");
        }
    )

    //给微信、QQ、微博图标绑定鼠标移入移出事件
    $("[data-log=icon]").each(function(i,elem){   //遍历父元素获取其下标和元素
        //给其父元素绑定hover事件
        var $tar=$(elem);
        $(elem).hover(
            e=>{
                $tar.toggleClass("i_hover");
            }
        )
    })
})