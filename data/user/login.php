<?php
//引入连接数据库文件
require_once("../init.php");
//从客户端接收用户名和密码
@$uname = mysql_real_escape_string($_POST["uname"]);
@$upwd = mysql_real_escape_string($_POST["upwd"]);
//如果用户名和密码都不为空
if($uname&&$upwd){
    //向数据库验证用户名和密码并查询用户id
    $sql =
        "SELECT uid FROM jk_user WHERE uname='$uname' AND upwd='$upwd'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    //如果查询结果不为空
    if($row){
        //启动session，并将uid保存到session中
        //echo $row[0];
        session_start();
        $_SESSION["uid"] = $row[0];
        //向客户端返回验证结果
        echo '{"ok":1,"msg":"登录成功！"}';
    }else{
        echo '{"ok":-1,"msg":"登录失败，用户名或密码错误！"}';
    }
}
?>