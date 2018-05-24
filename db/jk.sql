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
	user_name VARCHAR(32),
	gender INT
);
#新建商品表（jk_laptop）
CREATE TABLE  jk_laptop(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	product_id INT,
	title VARCHAR(128),
	subtitle VARCHAR(128),
	price DECIMAL(10,2),
	spec VARCHAR(64),
	name VARCHAR(32),
	memory VARCHAR(32),
	details VARCHAR(1024),
);


