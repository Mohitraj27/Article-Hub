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