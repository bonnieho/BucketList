DROP DATABASE IF EXISTS bucket_db;
CREATE DATABASE bucket_db;

USE bucket_db;


CREATE TABLE bucket_list
(
	id int NOT NULL AUTO_INCREMENT,
	item varchar(255) NOT NULL,
	done BOOLEAN DEFAULT false,
	again BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
