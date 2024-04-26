create table appuser(
    id int primary key auto_increment,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    isDeletable varchar(20),
    UNIQUE (email)
);

insert into appuser(name,email,password,status,isDeletable) 
values('Admin','admin@email.com','admin','true','false');


create table category(
    id int primary key auto_increment,
    name varchar(255) not null
);

create table article(
    id int primary key auto_increment,
    title varchar(255) not null,
    content longtext NOT null,
    categoryId integer not null,
    publication_date date,
    status varchar(20)
);