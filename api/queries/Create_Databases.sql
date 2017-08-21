CREATE TABLE `reiserrelief`.`news` ( `id` INT NOT NULL AUTO_INCREMENT , `title` TEXT NOT NULL , `date` TIMESTAMP NOT NULL , `content` TEXT NOT NULL , PRIMARY KEY (`id`));

CREATE TABLE reiserrelief.events
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title TEXT,
  content TEXT NOT NULL
);
