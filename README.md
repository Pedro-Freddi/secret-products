# Secret Products

This application was built for a technical test. The objective was to build a full stack application with the PERN stack featuring user registration, login and a list of products that should only be seen by authenticated users.

Highlights:
* Register and login pages.
* Products can only be seen after authentication.
* Thorough input validation and detailed error messages to inform users.
* JWT based authentication.

## Technologies

* Express v4.18.2
* Node v16.13.2
* PostgreSQL v14.4
* React v18.2.0
* Sequelize v6.28.0

Other libraries that were used:

* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js): password hashing.
* [Dotenv](https://github.com/motdotla/dotenv): environment variables loading.
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): generating and manipulating JSON Web Tokens (JWT).
* [Nocache](https://github.com/helmetjs/nocache): Middleware to set HTTP headers in response that disable caching.
* [Nodemon](https://github.com/remy/nodemon): automatic application restart on file changes for ease of development.
* [Validator.js](https://github.com/validatorjs/validator.js): string validation and sanitization.

## Database Schema

<img src="./docs/db-schema.png" alt="Database schema" />

Scripts for database setup and seeding can be found [here](./docs/scripts).

## Running the Application Locally

Requirements: Node.js v16+ and PostgreSQL v14 must be installed on your machine.

1. Clone this repository:
```
git clone https://github.com/Pedro-Freddi/secret-products.git
cd secret-products
```

2. Install back-end dependencies:
```
npm install
```

3. Install client dependencies and build:
```
cd client
npm install
npm run build
```

4. Add missing environments variables values in `/config/EXAMPLE.env` and rename the file to `.env`:
```
# Database URL connection string (format: postgres://user:password@host/database)
DATABASE_URL=

# Secret to sign JWT tokens
JWT_SECRET=
```

5. Run [db-setup.sql](./docs/scripts/db-setup.sql) script in PostgreSQL client to set up the database.

6. Run the application so that Sequelize creates the tables in the database.
```
npm start
```

7. Run [db-seed.sql](./docs/scripts/db-seed.sql) script in PostgreSQL client to populate products table.

8. Run the application again and navigate to `http://localhost:8000` on your browser.
```
npm start
```
