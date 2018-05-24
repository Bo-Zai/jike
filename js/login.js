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

    var $upwd = $("[data-form=upwd]");
    var $uname = $("[data-form=uname]");
    var nReg = new RegExp("^\\w{3,10}$","i");
    var pReg = new RegExp("^\\w{8,10}$");
    //给注册按钮绑定单击事件，进行表单验证
    $("[data-form=submit]").click(e=>{
        e.preventDefault();
    if($uname.val()==""){
        $uname.trigger("focus")
            .prev().text("用户名不能为空")
            .parent().removeClass().addClass("error");
        return;
    }else if(!nReg.test($uname.val().trim())){
        //验证不通过，让输入框获取焦点，并给其父元素添加error样式
        $uname.trigger("focus")
            .prev().text("输入的用户名格式不正确")
            .parent().removeClass().addClass("error");
        //程序停止向下执行；
        return;
    }else{
        //验证通过，给其父元素添加default样式，和blur样式，让label在输入框上方
        $uname.prev().text("请输入用户名或手机号码")
            .parent().removeClass()
            .addClass("default").addClass("blur");
    }
    if($upwd.val()==""){
        $upwd.trigger("focus")
            .prev().text("密码不能为空")
            .parent().removeClass().addClass("error");
        return;
    }else if(!pReg.test($upwd.val().trim())){
        $upwd.trigger("focus")
            .prev().text("输入的密码格式不正确")
            .parent().removeClass().addClass("error");
        return;
    }else{
        $upwd.prev().text("请输入账号密码")
            .parent().removeClass()
            .addClass("default").addClass("blur");
    }
    //验证通过向data/user/register.php发送ajax请求
    var uname = $uname.val().trim(),
        upwd = $upwd.val().trim();
    $.ajax({
        type:"POST",
        url:"data/user/login.php",
        data:{uname:uname,upwd:upwd},
        success:function(data){
            if(data.ok==1){
                alert(data.msg);
                location.assign("index.html");
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
        var $tar=$(elem);       //给其父元素绑定hover事件
        $(elem).hover(e=>{
            $tar.toggleClass("i_hover");
        })
    })
})