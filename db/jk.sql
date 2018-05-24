SET NAMES UTF8;
#ɾ�����ݿ�jk,������ڵĻ�
DROP  DATABASE  IF  EXISTS  jk;
#�½����ݿ�jk
CREATE DATABASE  jk CHARSET=UTF8;
#�������ݿ�jk
USE jk;
#�½�����û���Ϣ��jk_user��
CREATE TABLE jk_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16) NOT NULL UNIQUE,
	user_name VARCHAR(32),
	gender INT
);
#�½���Ʒ��jk_laptop��
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


