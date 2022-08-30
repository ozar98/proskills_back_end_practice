CREATE TABLE Person (
	ID SERIAL NOT NULL ,
	Login VARCHAR UNIQUE ,
	FullName VARCHAR  ,
	Password VARCHAR ,
	PhoneNumber VARCHAR UNIQUE ,
	BirthDate VARCHAR,
	Amount FLOAT,
	cashBackAmount FLOAT,
	PRIMARY KEY (ID)
);

CREATE TABLE Cards (
	ID SERIAL NOT NULL ,
	CardType VARCHAR,
	cardNumber VARCHAR UNIQUE,
	validTo VARCHAR,
	Amount FLOAT,
	CardsOwnerID INT ,
	bankName VARCHAR,
	PRIMARY KEY(ID),
	FOREIGN KEY (CardsOwnerID) REFERENCES Person(ID)
);

CREATE TABLE Transaction (
	ID SERIAL NOT NULL  ,
	SenderID INT NULL,
	ReceiverID INT NULL,
	senderType VARCHAR ,
	receiverType VARCHAR ,
	cardreceiverID INT NULL,
	cardsenderID INT NULL,
	amount FLOAT,
	status VARCHAR,
	date VARCHAR,
	CashBackID INT,
	PRIMARY KEY (ID),
	FOREIGN KEY(cardreceiverID) REFERENCES Cards(id),
	FOREIGN KEY(cardsenderID) REFERENCES Cards(id),
	FOREIGN KEY(CashBackID) REFERENCES CashBacks(id),
	FOREIGN KEY(SenderID) REFERENCES Person(ID),
	FOREIGN KEY(ReceiverID) REFERENCES Person(ID) 
);
CREATE TABLE CashBacks(
	id SERIAL NOT NULL,
	place VARCHAR,
	percent INT, 
    PRIMARY KEY(id)
);

