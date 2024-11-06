###
Documentation for AssignmentPortal

Prerequisites:

Before you begin, ensure you have the following installed on your machine:

Node.js (version 14 or higher)
MongoDB (either locally or using a cloud service like MongoDB Atlas)
npm (comes with Node.js)

Installation Steps:

Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

Install Dependencies

```bash
npm install
```

Set Up Environment Variables
Create a .env file in the root of your project directory and add the following variables:

```bash
PORT=5000
MONGO_URI=
JWT_SECRET="Password"
```

Database Setup
If you are using MongoDB locally, ensure that your MongoDB server is running.

```bash
service mongod start
```

If using MongoDB Atlas, make sure your IP is whitelisted in the Atlas dashboard.

Running the Application
Start the Server

```bash
node server.js
```
