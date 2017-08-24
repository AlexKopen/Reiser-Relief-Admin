CREATE TABLE `reiserrelief`.`news` ( `id` INT NOT NULL AUTO_INCREMENT , `title` TEXT NOT NULL , `date` TIMESTAMP NOT NULL , `content` TEXT NOT NULL , PRIMARY KEY (`id`));

CREATE TABLE reiserrelief.events
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title TEXT,
  content TEXT NOT NULL
);

CREATE TABLE reiserrelief.applications
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date TIMESTAMP NOT NULL,
  first TEXT,
  middle TEXT,
  last TEXT,
  addressLine1 TEXT,
  addressLine2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  homePhone TEXT,
  cellPhone TEXT,
  email TEXT,
  month TEXT,
  day TEXT,
  year TEXT,
  nationality TEXT,
  birthPlace TEXT,
  maidenName TEXT,
  maritalStatus TEXT,
  gender TEXT,
  passportNumber TEXT,
  passportIssueDateMonth TEXT,
  passportIssueDateDay TEXT,
  passportIssueDateYear TEXT,
  passportExpirationDateMonth TEXT,
  passportExpirationDateDay TEXT,
  passportExpirationDateYear TEXT,
  question1 TEXT,
  question2 TEXT,
  question3 TEXT,
  question4 TEXT,
  question5 TEXT,
  question6 TEXT,
  person1Name TEXT,
  person1Relationship TEXT,
  person1Phone TEXT,
  person1Email TEXT,
  person2Name TEXT,
  person2Relationship TEXT,
  person2Phone TEXT,
  person2Email TEXT
);

CREATE TABLE reiserrelief.application_dates
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  trip_leader TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL
);
