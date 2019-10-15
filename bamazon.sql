create database bamazon;

use bamazon;

create table Products (
	item_id integer(255) auto_increment,
    product_name varchar(100),
    department_name varchar(100),
    price decimal(6,2),
    stock_quantity smallint(255),
    primary key(item_id)
);





use bamazon;
/* 
INSERT into Products (product_name, department_name, price, stock_quantity)
values ("dog collar", "pets", 5.99, 124);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("blue bed sheets", "bedding", 24.99, 318);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("makeup brushes", "beauty", 19.99, 840);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("coffee mug", "kitchen", 6.49, 530);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("kinfe set", "kitchen", 28.31, 112);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("hand mirror", "beauty", 12.99, 604);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("cat scratching post", "pets", 13.00, 219);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("xbox wireless controler", "gaming", 49.99, 1583);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("wireless keyboard", "computer", 7.99, 3000);

INSERT into Products (product_name, department_name, price, stock_quantity)
values ("wireless mouse", "computer", 5.99, 5570);
*/

