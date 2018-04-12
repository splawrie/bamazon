create database bamazon;

use bamazon;

create table products
(itemid 		integer 	auto_increment not null primary key,
 productname	varchar(45) not null,
 departmentname	varchar(45) not null,
 price			decimal(10,4) not null,
 stockquantity	integer(10) not null));

 select * from bamazon.products;


 insert into products
 (productname, departmentname, price, stockquantity)
 values
 ("The Lion King", "Movie", 24.99,146),
 ("Frozen", "Movie", 24.99,136),
 ("Aladdin Costume", "Clothing", 44.99, 23),
 ("Belle Costume", "Clothing", 54.99,74),
 ("Harry Potter Wand", "Toys", 4.99,50),
 ("Lincoln Logs Building Set", "Toys", 24.99, 7),
 ("Matchbox Car Racetrack", "Toys",19.99,15),
 ("Jungle Book", "Books", 9.99,8),
 ("Where The Red Fern Grows", "Books", 9.99,23),
 ("The Giivng Tree", "Books", 9.99, 112);

create table departments ( 
    departmentId        INT auto_increment not null primary key,
    departmentName      varchar(50) not null,
    overheadCosts       decimal(10,4) not null,
    productSales        decimal(10,4) not null,
    totalSales          decimal(10,4) not null
);

INSERT INTO departments
(departmentName, overheadCosts, productSales, totalSales)
values
("Movie", 749, 0, 0);

INSERT INTO departments
(departmentName, overheadCosts, productSales, totalSales)
values
("Clothing", 999, 0, 0);

INSERT INTO departments
(departmentName, overheadCosts, productSales, totalSales)
values
("Toys", 510, 0, 0);

INSERT INTO departments
(departmentName, overheadCosts, productSales, totalSales)
values
("Books", 749, 0, 0);

