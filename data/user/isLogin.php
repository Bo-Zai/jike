<?php
header("Content-Type:application/json");
require_once("../init.php");
//启动session;
session_start();
//将session中的uid取出
@$uid = $_SESSION["uid"];
//如果session中的uid不为空
if($uid){
    //根据uid查询用户名
    $sql =
        "SELECT uname FROM jk_user WHERE uid='$uid'";
    $result = mysqli_query($conn,$sql);
    $uname = mysqli_fetch_row($result);
    echo json_encode(["ok"=>1,"uname"=>$uname[0]]);
}else{//如果uid为空
    echo json_encode(["ok"=>0]);
}
?>