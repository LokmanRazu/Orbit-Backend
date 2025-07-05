# Todos API

A simple and effective RESTful API for managing tasks and categories. Built with Node.js, Express, and Sequelize, this API provides a foundation for a feature-rich to-do list application.

## Features

- **User Authentication:** Secure user registration and login using JWT.
- **Task Management:** Full CRUD (Create, Read, Update, Delete) operations for tasks.
- **Category Management:** Organize tasks with customizable categories.
- **Filtering and Searching:** Easily find tasks by category, status, priority, or a search query.
- **Database Migrations:** A robust migration system to manage database schema changes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- A running MySQL instance (e.g., via [XAMPP](https://www.apachefriends.org/index.html), [Docker](https://www.docker.com/), or a standalone installation).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/todos-api.git
   cd todos-api
   ```

2. **Install NPM packages:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Create a `.env` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual database credentials.

   ```env
 DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=ABtest
DB_HOST=localhost
DB_DATABASE_TEST=todos_test_db
DB_DATABASE_PROD=todos_prod_db
JWT_SECRET=your_jwt_secret


PORT = 3001
   ```

4. **Run database migrations:**

   This command will create all the necessary tables in your database.

   ```bash
   npx sequelize-cli db:migrate
   ```

### Running the Application

To start the development server, run the following command:

```bash
npm run start:dev
```

The server will start on the port specified in your `.env` file (default is `3001`).

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in an existing user and receive a JWT.

### Tasks

_Note: All task routes require a valid JWT._

- `GET /tasks`: Get all tasks. Can be filtered by `category`, `status`, `priority`, or `search` query parameters.
- `GET /tasks/:id`: Get a single task by its ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.

### Categories

_Note: All category routes require a valid JWT._

- `GET /categories`: Get all categories.
- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update an existing category.
- `DELETE /categories/:id`: Delete a category.

## Database Migrations

This project uses `sequelize-cli` to manage database schema changes.

- **Create a new migration:**
  ```bash
  npx sequelize-cli migration:generate --name <migration-name>
  ```

- **Run migrations:**
  ```bash
  npx sequelize-cli db:migrate
  ```

- **Undo the last migration:**
  ```bash
  npx sequelize-cli db:migrate:undo
  ```

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [Sequelize](https://sequelize.org/) - ORM for Node.js
- [MySQL2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js
- [Passport.js](http://www.passportjs.org/) - Authentication middleware
- [JWT](https://jwt.io/) - JSON Web Tokens
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Library for hashing passwords

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
