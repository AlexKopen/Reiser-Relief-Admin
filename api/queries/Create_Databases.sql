create table reiserrelief.applications
(
	id int auto_increment
		primary key,
	submitted timestamp default CURRENT_TIMESTAMP not null,
	trip_date date null,
	first text null,
	middle text null,
	last text null,
	addressLine1 text null,
	addressLine2 text null,
	city text null,
	state text null,
	zip text null,
	homePhone text null,
	cellPhone text null,
	email text null,
	month text null,
	day text null,
	year text null,
	nationality text null,
	birthPlace text null,
	maidenName text null,
	maritalStatus text null,
	gender text null,
	passportNumber text null,
	passportIssueDateMonth text null,
	passportIssueDateDay text null,
	passportIssueDateYear text null,
	passportExpirationDateMonth text null,
	passportExpirationDateDay text null,
	passportExpirationDateYear text null,
	question1 text null,
	question2 text null,
	question3 text null,
	question4 text null,
	question5 text null,
	question6 text null,
	person1Name text null,
	person1Relationship text null,
	person1Phone text null,
	person1Email text null,
	person2Name text null,
	person2Relationship text null,
	person2Phone text null,
	person2Email text null,
	trip_id int not null
)
;

create table reiserrelief.events
(
	id int auto_increment
		primary key,
	title text null,
	content text not null
)
;

create table reiserrelief.news
(
	id int auto_increment
		primary key,
	title text not null,
	date timestamp default CURRENT_TIMESTAMP not null,
	content text not null
)
;

create table reiserrelief.trip_dates
(
	id int auto_increment
		primary key,
	trip_leader text not null,
	date date not null,
	status text not null
)
;

INSERT INTO reiserrelief.applications (submitted, trip_date, first, middle, last, addressLine1, addressLine2, city, state, zip, homePhone, cellPhone, email, month, day, year, nationality, birthPlace, maidenName, maritalStatus, gender, passportNumber, passportIssueDateMonth, passportIssueDateDay, passportIssueDateYear, passportExpirationDateMonth, passportExpirationDateDay, passportExpirationDateYear, question1, question2, question3, question4, question5, question6, person1Name, person1Relationship, person1Phone, person1Email, person2Name, person2Relationship, person2Phone, person2Email, trip_id) VALUES ('2017-08-31 16:37:21', '2018-08-16', 'Alex', 'Daniel', 'Kopen', '8581 Shadow Creek dr', null, 'maple grove', 'mn', '55410', '763-286-7667', '765-678-9675', 'alexkopen@gmail.com', 'march', '09', '1994', 'usa', 'usa', 'leger', 'married', 'male', '54445455454', 'february', '07', '1900', 'january', '06', '3017', 'i am here', 'at this table', 'editing this form', 'it is fun', 'how are you doing baby', 'another one jesus', 'tim', 'dad', '754-976-0000', 't@tk.com', 'rene kopen', 'mommmy', '756-454-3333', 'r@y.com', 1);

INSERT INTO reiserrelief.events (title, content) VALUES ('Give to the Max Day', 'noice doh');
INSERT INTO reiserrelief.events (title, content) VALUES ('Keep the Wheel Turning', 'This actually worked haha');

INSERT INTO reiserrelief.news (title, date, content) VALUES ('News post 1', '2017-08-21 14:59:58', 'This would be the content');
INSERT INTO reiserrelief.news (title, date, content) VALUES ('Another test', '2017-08-21 15:00:03', 'Here it is!');
INSERT INTO reiserrelief.news (title, date, content) VALUES ('testtitle', '2017-08-29 14:42:03', 'some contetn');

INSERT INTO reiserrelief.trip_dates (trip_leader, date, status) VALUES ('Joyce Getchell2', '2017-08-25', 'Full');
INSERT INTO reiserrelief.trip_dates (trip_leader, date, status) VALUES ('Ann Brau', '2017-08-24', 'Open');
INSERT INTO reiserrelief.trip_dates (trip_leader, date, status) VALUES ('ok', '2017-08-31', 'Open');

