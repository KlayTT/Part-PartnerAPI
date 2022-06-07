USE MASTER
GO

IF NOT EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'PartPartnerMVC'
)
CREATE DATABASE PartPartnerMVC
GO

USE PartPartnerMVC
GO

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Part;

CREATE TABLE Users (
  Id INT NOT NULL PRIMARY KEY IDENTITY,
  UserName VARCHAR (255) NOT NUll,
  Email VARCHAR (255) NOT NUll,
  FirebaseUserId NVARCHAR (28) NOT NUll,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
);

CREATE TABLE Cars (
  Id INT NOT NULL PRIMARY KEY IDENTITY,
  [Name] VARCHAR (255) NOT NUll,
  [Year] VARCHAR (255) NOT NUll,
  Color VARCHAR (255) NOT NUll,
  ImageURL VARCHAR (255) NOT NUll,
  PartId VARCHAR(255),
  [Uid] VARCHAR(255) NOT NULL,

);

CREATE TABLE Parts (
  Id INT NOT NULL PRIMARY KEY IDENTITY,
  [Name] VARCHAR (255) NOT NUll,
  Price DECIMAL(17, 2) NOT NULL,
  ImageURL VARCHAR (255) NOT NUll,
  Miles VARCHAR (255),
  DatePurchased VARCHAR (255),
  NextMatnience VARCHAR (255),
  [Uid] VARCHAR(255) NOT NULL,

);

INSERT INTO Users (UserName, Email, FirebaseUserId) VALUES ('KlayTT', 'klaythacker11@gmail.com','Sy0CbC9WcJSslguFZAkMa4fX2Af2');
INSERT INTO Users (UserName, Email, FirebaseUserId) VALUES ('Tru G', 'klaythackerworkmail@gmail.com','1WEZNgZ96BZf5yfHWeSFM84A0N03');

INSERT INTO Cars ([Name], [Year], Color, ImageURL, [Uid]) VALUES ('VW GTI Custom', 'Navy Blue', '2013', 'https://i.pinimg.com/originals/88/95/6e/88956ebf9277bf940401b3e0b370325b.jpg','1WEZNgZ96BZf5yfHWeSFM84A0N03');
INSERT INTO Cars ([Name], [Year], Color, ImageURL, [Uid]) VALUES ('Porsche 911 GT3 RS', 'Black', '2019' ,'https://cdn1.mecum.com/auctions/ca0821/ca0821-465261/images/1-1621285098983.jpg?1628545960000','1WEZNgZ96BZf5yfHWeSFM84A0N03');
INSERT INTO Cars ([Name], [Year], Color, ImageURL, [Uid]) VALUES ('Toyota Previa aka the Space Ship', 'Silver', '1991' ,'https://consumerguide.com/wp-content/uploads/2014/07/93812141990615.jpg','Sy0CbC9WcJSslguFZAkMa4fX2Af2');
INSERT INTO Cars ([Name], [Year], Color, ImageURL, [Uid]) VALUES ('Nissan 300ZX', 'Red', '1992' ,'https://bringatrailer.com/wp-content/uploads/2019/05/1992_nissan_300zx_twin_turbo_1559157297ff9f98764daNissan-300ZXTT-8.jpg?fit=940%2C623','Sy0CbC9WcJSslguFZAkMa4fX2Af2');

INSERT INTO Parts ([Name], Price, ImageURL, Miles, [Uid]) VALUES ('Duralast Starter 19442', $119.99, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSWGl0FCEd41XWr68IM23OF9Fme9d2V_dnO743sY4l_gGil_fM4PR-xP5KrICyKqEUiPnDhN3AoyA&usqp=CAc', '155k','1WEZNgZ96BZf5yfHWeSFM84A0N03');

INSERT INTO Parts ([Name], Price, ImageURL, Miles, [Uid]) VALUES ('Duralast Starter 19443', $119.99, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSWGl0FCEd41XWr68IM23OF9Fme9d2V_dnO743sY4l_gGil_fM4PR-xP5KrICyKqEUiPnDhN3AoyA&usqp=CAc', '155k','Sy0CbC9WcJSslguFZAkMa4fX2Af2');
