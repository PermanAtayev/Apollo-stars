DROP TABLE IF EXISTS "Person";
DROP TABLE IF EXISTS "User";

CREATE TABLE "User"(
    id int PRIMARY KEY,
    password varchar(100),
    name varchar(20),
    surname varchar(20),
    email varchar(100)
);

CREATE TABLE "Person"(
    id int PRIMARY KEY,
    password varchar(100),
    name varchar(20),
    surname varchar(20),
    email varchar(100)
);
