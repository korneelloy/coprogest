# Projet Coprogest – Holberton End-of-Year Project – Saïd LAAMRI & Korneel LOY

This project is a web-based application designed to help co-ownership managers (syndics) and co-owners manage their building more efficiently. It includes features such as user authentication, document management, general meeting (AG) resolutions and voting, invoices and payments, and dashboards.
The project was developed as part of the Holberton School [C#25] Portfolio Project using Agile methodology.

---

## Architecture

Below a simple architecture diagram that shows the global structure of the project :

```plaintext
+-----------------------+          HTTP                   +-------------------+
|                       |   <--------------------------> |                    |
|    Frontend           |                                | Backend            |
|     Angular           |                                |  Node.js + Express |
|      (port 3000)      |                                |   (port 4200)      |
+-----------------------+                                +-------------------+
                                                                   |
                                                                   |
                                    +----------------+             |
                                    | Database       |             |
                                    |  MySQL          | <----------+
                                    |                 |
                                     +----------------+
```

---

## Project Structure
```bash
coprogest/
├── frontend/       # Angular app
├── api/            # Node.js + Express API
├── code_file/      # SQL schema and seed data
└── README.md
```

---

## Technologies Used
- **Front-end:** Angular  
- **Back-end:** Node.js with Express.js  
- **Database:** MySQL (with custom SQL queries)  
- **Tools:** Postman (API testing), Git, Trello (Agile task management)

## Installation

Clone the repo (https://github.com/korneelloy/coprogest) and install dependencies  (frontend & backend) :

```bash
cd api
npm install
npm start
```

```bash
cd frontend
npm install
ng serve
```

The frontend will be visible on :  
http://localhost:4200

The backend is accessible via port 3000

This project also contains a third folder to set up the database.

First, create a MySQL database named `coprogestdb` (or your preferred name), then run:


```bash
cd code_file
mysql -u root -p coprogestdb < ./create_db.sql
```

If you want to populate the database with some phony data: 
```bash
cd code_file
mysql -u root -p coprogestdb < ./create_test_data.sql
```
Then, create a config file at: `api/config/config.json` with the following structure:
{
  "host": "localhost",
  "user": "root",
  "database": "coprogestdb",
  "password": "your_mysql_password"
}


In the phony data, we created 3 types of users, in order to test:
They all have some strange last names: 

Sample users for testing (all passwords: `Password123!`):
- **Ann TheManager:** manager@gmail.com  
- **John TheAssistant:** assistant@gmail.com  
- **Cloe TheCoOwner:** coowner@gmail.com  
---

## Features

- Authentication: Secure login/logout system with role-based access (Admin, Syndic, Co-owner).
- Documents: Upload, list, and manage official copro documents.
- AG Resolutions & Voting: Create meeting notices, draft resolutions, vote based on share ownership, and calculate results.
- AG Minutes: Automatically generate minutes after meetings.
- Invoices & Payments: Track charges, payments, and outstanding balances.
- Dashboards: Overview of important copro metrics for different user roles.

---

## Testing
Manual tests were conducted using Postman and the Angular interface.

---


## Future Improvements

- **Automated Email Notifications**  
  Remind co-owners about upcoming meetings, invoices, or document uploads.

- **File Storage Integration**  
  Store files like PDFs and AG minutes using cloud services (e.g., AWS S3, Google Cloud).

- **Multilingual Support**  
  Add language options (e.g., French, English).

- **Mobile-Friendly Design**  
  Improve responsiveness or develop a mobile app.

- **Audit Logging**  
  Log user actions (e.g., logins, edits, votes) for transparency and accountability.

- **Automated PDF/Word Generation**  
  Generate PDF or Word files for notices, resolutions, and meeting minutes.

- **Unit testing**  
  Create unit tests with JEST 

- **E2E testing**  
  Create E2E tests with Playwrite

---

## Contact
For any questions, contact:  
- slaamri@yahoo.fr
- korneel.loy@gmail.com  
