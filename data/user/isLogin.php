<?php
header("Content-Type:application/json");
require_once("../init.php");
//����session;
session_start();
//��session�е�uidȡ��
@$uid = $_SESSION["uid"];
//���session�е�uid��Ϊ��
if($uid){
    //����uid��ѯ�û���
    $sql =
        "SELECT uname FROM jk_user WHERE uid='$uid'";
    $result = mysqli_query($conn,$sql);
    $uname = mysqli_fetch_row($result);
    echo json_encode(["ok"=>1,"uname"=>$uname[0]]);
}else{//���uidΪ��
    echo json_encode(["ok"=>0]);
}
?>