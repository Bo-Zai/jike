<?php
//引入初始化文件，连接数据库
require_once("../init.php");
//将前端传入的用户名和密码进行转义
@$uname = mysql_real_escape_string($_POST["uname"]);
@$upwd = mysql_real_escape_string($_POST["upwd"]);
@$phone = mysql_real_escape_string($_POST["phone"]);

//用户名和密码不能为空
if($uname&&$upwd){
    $sql =
        "INSERT INTO jk_user VALUES(NULL,'$uname','$upwd','$phone',NULL)";
    $result = mysqli_query($conn,$sql);
    if($result===true){
        echo '{"ok":1,"msg":"注册成功！"}';
    }else{
         echo '{"ok":-1,"msg":"注册失败！"}';
     }
}
?>