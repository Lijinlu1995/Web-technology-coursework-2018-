BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `user` (
	`username`	TEXT,
	`email`	TEXT UNIQUE,
	`password`	TEXT,
	PRIMARY KEY(`email`)
);
INSERT INTO `user` (username,email,password) VALUES ('yue','yw17489@my.bristol.ac.uk','fcea920f7412b5da7be0cf42b8c93759');
INSERT INTO `user` (username,email,password) VALUES ('lu','lulu@gmail.com','e86fdc2283aff4717103f2d44d0610f7');
INSERT INTO `user` (username,email,password) VALUES ('test','test@test','05a671c66aefea124cc08b76ea6d30bb');
INSERT INTO `user` (username,email,password) VALUES ('test2','test2@test','05a671c66aefea124cc08b76ea6d30bb');
INSERT INTO `user` (username,email,password) VALUES ('dog','dog@dog','50b709f40a2065fb55fd0e7f1caa8309');
CREATE TABLE IF NOT EXISTS `comments` (
	`email`	TEXT,
	`comment`	TEXT,
	PRIMARY KEY(`email`),
	FOREIGN KEY(`email`) REFERENCES `user`(`email`)
);
INSERT INTO `comments` (email,comment) VALUES ('yw17489@my.bristol.ac.uk','It is a nice webiste with lovely photos!');
INSERT INTO `comments` (email,comment) VALUES ('lulu@gmail.com','I love travelling and share photos with my friends.');
INSERT INTO `comments` (email,comment) VALUES ('dog@dog','Beautiful life and beautiful day!');
INSERT INTO `comments` (email,comment) VALUES ('test@test','I want to be a photographer and post more photos here！');
COMMIT;
