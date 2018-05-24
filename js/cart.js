$(function(){
    var $cOption = $("[data-item=check_option]");      //获取复选框集合
    var $price = $("[data-item=price]");                //获取单价的数组
    var $total_price = $("[data-item=total_price]");   //获取价格小计的数组
    var $minus = $("[data-btn=minus]");                //减号
    var $pro_num = $("[data-btn=count]");             //单项商品数量
    var $add = $("[data-btn=add]");                     //加号
    var $del = $("[data-item=del]");                    //删除
    var $cAll =  $("#check_all");                       //获取全选框
    var $pro_count = $("#cart_pro_total");             //获取商品总数
    var $cart_total_price = $("#cart_price_total");     //获取购物车总价
    var cNum = 0;                                   //用于记录 选中 复选框的个数 ，初始值为 0

    $("[data-btn=count]").each(function(i){
        var $count = $($pro_num.get(i));                //获取数量输入框元素
        var $price_total = $($total_price.get(i));     //获取当前价格小计元素
        var price= parseInt($($price.get(i)).text());       //获取商品单价
        var num = parseInt($($pro_num.get(i)).val());       //获取当前数量输入框中的数量

        function refresh(){              //计算总价以及总数量
            var sum_price = 0;
            var sum_count = 0;
            $price_total.text(`${num*price}元`);
            $cOption.each(function(i){       //遍历复选框，将选中复选框的商品项数量以及价格小计累加
                if($($cOption.get(i)).prop("checked")){
                    sum_price+=parseInt($($total_price.get(i)).text());
                    sum_count+=parseInt($($pro_num.get(i)).val());
                }
            })
            $cart_total_price.text(sum_price);
            $pro_count.text(sum_count);
        }
        //给全选框绑定单击事件
        $cAll.click(function(){
            if($(this).prop("checked")){           //判断全选框的checked值是否为真
                $cOption.prop("checked",true);     //将复选框集合的checked的值改为真
                cNum = $cOption.length;             //cNum的值为复选框集合数组的长度
                refresh();
            }else{
                $cOption.prop("checked",false);
                cNum = 0;
                refresh();
            }
        })
        //给减号按钮绑定单击事件
        $($minus.get(i)).click(e=>{
            if(num > 1) {
                $count.val(--num);         //数量大于1 ，数量的值才能减 1
            }
            $price_total.text(`${num*price}元`);        //改变价格小计的值
            if($($cOption.get(i)).prop("checked")){   //当前商品项选中时 ，按钮点击改变商品总价格和总数量
                refresh();
            }
        })
        //给加号按钮绑定单击事件
        $($add.get(i)).click(e=>{
            if(num < 20){
                $count.val(++num);         //数量小于 5 ，数量值加1
            }else{
                alert("已超过最大购买数量");
            }
            $price_total.text(`${num*price}元`);       //商品价格小计
            if($($cOption.get(i)).prop("checked")){   //当前商品项选中时 ，按钮点击改变商品总价格和总数量
                refresh();
            }
        })
        //给数量输入框绑定键盘事件
        $count.keyup(e=>{
            if(isNaN($count.val())){            //不能输入非数字
                alert("只能输入数字");
                $count.val(num);                //输入非数字时，将输入框的值修改为num
            }else if($count.val() > 20){
                alert("已超过最大购买数量");
                $count.val(num);
            }else if($count.val() == 0){
                $count.val(1);
            }
            num = parseInt($(e.target).val());       //更新当前商品数量
            $price_total.text(`${num*price}元`);
            if($($cOption.get(i)).prop("checked")){   //当前商品项选中时 ，按钮点击改变商品总价格和总数量
                refresh();
            }
        })

        //遍历复选框集合 ， 并绑定单击事件
        $($cOption.get(i)).click(function(){
            if($(this).prop("checked")){        //判断当前复选框的checked是否为真
                cNum += 1;                      //选中复选框的个数 +1
                if(cNum == $cOption.length){  //如果cNum的值等于复选框集合的长度，全选框的checked的值改为真
                    $("#check_all").prop("checked",true);
                }
                refresh();
            }else{
                cNum -= 1;
                $("#check_all").prop("checked",false);
                //购物车总价 -= 当前选中的商品价格小计
                $cart_total_price.text(
                    parseInt($cart_total_price.text())-parseInt($($total_price.get(i)).text())
                );
                //商品总数量 -= 当前选中的单项商品数量
                $pro_count.text(
                    parseInt($pro_count.text())-parseInt($($pro_num.get(i)).val())
                );
            }
        })
    })
    /*******结算提示******/
    $("#cart_submit").click(e=>{
        alert("功能未上线，敬请期待！");
    })
    /*********删除提示*******/
    $del.click(()=>{
        alert("确认从购物车删除该商品!");
    })
})