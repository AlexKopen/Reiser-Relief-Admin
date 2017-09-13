DROP DATABASE reiserrelief;

CREATE TABLE reiserrelief.news ( id INT NOT NULL AUTO_INCREMENT , title TEXT NOT NULL , date TIMESTAMP NOT NULL , content TEXT NOT NULL , PRIMARY KEY (id));

CREATE TABLE reiserrelief.events
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title TEXT,
  content TEXT NOT NULL
);

CREATE TABLE reiserrelief.applications
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  submitted TIMESTAMP NOT NULL,
  tripDate TEXT NOT NULL,
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

INSERT INTO reiserrelief.applications (submitted, tripDate, first, middle, last, addressLine1, addressLine2, city, state, zip, homePhone, cellPhone, email, month, day, year, nationality, birthPlace, maidenName, maritalStatus, gender, passportNumber, passportIssueDateMonth, passportIssueDateDay, passportIssueDateYear, passportExpirationDateMonth, passportExpirationDateDay, passportExpirationDateYear, question1, question2, question3, question4, question5, question6, person1Name, person1Relationship, person1Phone, person1Email, person2Name, person2Relationship, person2Phone, person2Email) VALUES ('2017-08-31 16:27:20', '2017-08-31 16:27:20', 'Alex', 'Daniel', 'Kopen', '8581 Shadow Creek dr', null, 'maple grove', 'mn', '55410', '763-286-7667', '765-678-9675', 'alexkopen@gmail.com', 'march', '09', '1994', 'usa', 'usa', 'leger', 'married', 'male', '54445455454', 'february', '07', '1900', 'january', '06', '3017', 'i am here', 'at this table', 'editing this form', 'it is fun', 'how are you doing baby', 'another one jesus', 'tim', 'dad', '754-976-0000', 't@tk.com', 'rene kopen', 'mommmy', '756-454-3333', 'r@y.com');

CREATE TABLE reiserrelief.trip_dates
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tripLeader TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL
);
