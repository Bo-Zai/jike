SET NAMES UTF8;
#删除数据库jk,如果存在的话
DROP  DATABASE  IF  EXISTS  jk;
#新建数据库jk
CREATE DATABASE  jk CHARSET=UTF8;
#进入数据库jk
USE jk;
#新建表格用户信息表（jk_user）
CREATE TABLE jk_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16) NOT NULL UNIQUE,
	avatar VARCHAR(128),
	user_name VARCHAR(32),
);
