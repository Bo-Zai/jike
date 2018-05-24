<?php
//设置响应头格式
header("Content-Type:application/json;charset=utf-8");
//获取数据库连接
$conn=mysqli_connect("127.0.0.1","root","","jk","3306");
//设置数据库编码格式为utf8;
mysqli_query($conn,"SET NAMES UTF8");
?>