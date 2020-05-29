create database if not exists bamazon;
use bamazon;
drop table if exists products;

create table products(
    item_id int  not null  auto_increment,
    product_name varchar(255) not null,
    department_name varchar (255) not null,
    price decimal(10,2) not null,
    stock_quantity int not null,
    primary key (item_id)
    
)