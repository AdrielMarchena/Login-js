CREATE DATABASE LoginJS;
USE LoginJS;


CREATE TABLE users(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
	primary key(id)
);

select * from users;