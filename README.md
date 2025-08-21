# **Node JS Rest-API**

Simple REST API – Node.js + Express + PostgreSQL + TypeScript

A clean and simple REST API built with Node.js, Express.js, TypeScript, and PostgreSQL.
This project demonstrates user authentication (Login/Register) and basic CRUD/listing APIs with a production-ready structure.

# Features
* User Authentication
   Register new users
   Login with JWT authentication
*  User Listing API – fetch all registered users=
*  Secure Routes – protected with JWT middleware
*  PostgreSQL Database – relational and scalable
* Written in TypeScript – with type safety and modern best practices
*  Modular Project Structure – easy to scale

# Installation

Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [VS Code](https://code.visualstudio.com/download) or Any Text Editor

## Cloning this repo
```cmd
> git clone https://github.com/ramanindia/nodejs-restapi
> cd nodejs-restapi
```
Use `code .` to open file in VS Code
```cmd
> code .
```

## Editing the file
Edit the required value in folder `src/assets` file `config.json`.

```js
{ 
  "HOST_NAME": "127.0.0.1",  
  "PORT": 4000,
  "NODE_ENV" : "development",
  "NODE_ENV_SSL" : false,
  "ProdDatabase": 
  {
    "host": "127.0.0.1",
     "user": "root",
      "password": "",
      "database": "test",
      "debug": false,
      "waitForConnections": true,
      "multipleStatements": true,
       "connectionLimit": 1000,
      "maxIdle": 10, 
      "idleTimeout": 60000, 
      "queueLimit": 0
  },
  "DevDatabase": 
  {
     "host": "127.0.0.1",
     "user": "root",
      "password": "",
      "database": "test",
      "debug": false,
      "waitForConnections": true,
      "multipleStatements": true,
       "connectionLimit": 100000,
      "maxIdle": 10, 
      "idleTimeout": 60000, 
      "queueLimit": 0
  }
}
```

`port`: PORT localhost.


## Installing the dependencies
```cmd
> npm install
```
## Running App
```cmd
> npm start dev
```

If you want to more details, please contact me ([WhatsApp](https://api.whatsapp.com/send/?phone=9950697373&text&app_absent=0))
