# Banking API
================================
# MYSQL DB and Table Scripts
================================

CREATE DATABASE `bank`;

CREATE TABLE `customer` (
`CustomerId` int NOT NULL AUTO_INCREMENT,
`CustomerName` varchar(45) NOT NULL,
`CustomerInitial` varchar(45) NOT NULL,
`WithInBank` tinyint NOT NULL,
`CreatedOn` datetime NOT NULL,
PRIMARY KEY (`CustomerId`)
)

CREATE TABLE `account` (
`AccountId` int NOT NULL AUTO_INCREMENT,
`CustomerId` int NOT NULL,
`Amount` decimal(10,0) DEFAULT NULL,
`WithInBank` tinyint NOT NULL,
`CreatedOn` date NOT NULL,
PRIMARY KEY (`AccountId`),
KEY `CustomerId_idx` (`CustomerId`),
CONSTRAINT `CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`)
)

CREATE TABLE `history` (
`HistoryId` int NOT NULL AUTO_INCREMENT,
`AccountId` int DEFAULT NULL,
`FromAccountId` int NOT NULL,
`ToAccount` int DEFAULT NULL,
`Credited` decimal(10,0) DEFAULT NULL,
`Debitted` decimal(10,0) DEFAULT NULL,
`CreatedOn` datetime NOT NULL,
PRIMARY KEY (`HistoryId`)
)

# REST API'S
================================

------------------------------
# API TO GET LIST OF CUSTOMERS
-------------------------------

# METHOD: GET
http://localhost:20200/customers

# SAMPLE OUTPUT

[
{
"CustomerId": 1,
"CustomerName": "Arisha Barron",
"CustomerInitial": "AB",
"WithInBank": 1,
"CreatedOn": "2021-01-18T17:19:20.000Z"
},
{
"CustomerId": 2,
"CustomerName": "Branden Gibson",
"CustomerInitial": "BG",
"WithInBank": 1,
"CreatedOn": "2021-01-18T17:20:02.000Z"
},
{
"CustomerId": 3,
"CustomerName": "Rhonda Church",
"CustomerInitial": "RC",
"WithInBank": 1,
"CreatedOn": "2021-01-18T17:20:26.000Z"
},
{
"CustomerId": 4,
"CustomerName": "Georgina Hazel",
"CustomerInitial": "GH",
"WithInBank": 0,
"CreatedOn": "2021-01-18T17:20:53.000Z"
}
]
==============================================

-----------------------------
# API TO CREATE NEW CUSTOMER
-----------------------------

# METHOD: POST
# MINIMUM INITAIL DEPOSIT SHOULD NOT BE LESS THAN 500

http://localhost:20200/customers/

# SAMPLE INPUT

{
    "CustomerName": "Georgina Hazel",
    "CustomerInitial": "D",
    "WithInBank":true,
    "Amount": 500
}
  
# SAMPLE OUTPUT

{
    "message": "Customer Created Successfully!!!!"
}
====================================================

-------------------------------------------------------
# API TO TRANSFER FROM ONE ACCOUNT TO ANOTHER ACCOUNT
-------------------------------------------------------

# METHOD: POST
# FOR ANOTHER BANK ACCOUNT TRANSFER "WithInBank" SHOULD BE FALSE
# SAMPLE INPUT

{
    "FromAccount": 2,
    "ToAccount": 3,
    "AmountToTransfer": 100,
    "WithInBank": true

}

# SAMPLE OUTPUT

{
    "message": "Transferred Successfully!!!!!"
}
====================================================

-----------------------------------------------
# API TO GET BALANCE OF ACCOUNT BY ACCOUNTID
-----------------------------------------------

# METHOD: POST

http://localhost:20200/account/balance

# SAMPLE INPUT

{
    "AccountId": 3

}

# SAMPLE OUTPUT

{
    "message": "Available Balance: 20096"
}
==========================================================

----------------------------------------------------------
# API TO GET TRANSACTION HISTORY OF ACCOUNT BY ACCOUNTID
----------------------------------------------------------

# METHOD: POST

http://localhost:20200/account/transactionHistory

# SAMPLE INPUT

{
    "AccountId": 3

}

# SAMPLE OUTPUT

[
    {
        "AccountId": 3,
        "FromAccountId": 3,
        "ToAccount": 1,
        "Credited": null,
        "Debitted": "4",
        "Date": "2021-01-18T19:35:21.000Z"
    },
    {
        "AccountId": 3,
        "FromAccountId": 3,
        "ToAccount": 2,
        "Credited": null,
        "Debitted": "100",
        "Date": "2021-01-18T19:37:56.000Z"
    },
    {
        "AccountId": 3,
        "FromAccountId": 2,
        "ToAccount": null,
        "Credited": "100",
        "Debitted": null,
        "Date": "2021-01-18T19:44:57.000Z"
    },
    {
        "AccountId": 3,
        "FromAccountId": 2,
        "ToAccount": null,
        "Credited": "100",
        "Debitted": null,
        "Date": "2021-01-19T06:40:18.000Z"
    }
]
  
====================================================================







