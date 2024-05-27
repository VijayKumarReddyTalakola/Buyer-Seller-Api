# Book Management Backend

This is a RESTful backend built with Node.js, Express.js, and Prisma ORM for PostgreSQL/MySQL.  supports user and seller functionalities, allowing sellers to manage books via CSV upload, and users to view books. Authentication and authorization are implemented using JWT.


## Features

- User (buyer) and seller can register and login.
- JWT-based authentication.
- Sellers can upload books via CSV.
- Sellers can view, edit, and delete their own books.
- Users can view all books and details of specific books.
- Role-based access control to ensure proper access.

## Requirements

- Node.js (v14.x or later)
- PostgreSQL or MySQL
- npm (v6.x or later)

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/VijayKumarReddyTalakola/Buyer-Seller-Api.git
cd Buyer-Seller-Api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```dotenv
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"  # or MySQL connection string
JWT_SECRET="your_jwt_secret"
```

Replace `username`, `password`, `localhost`, and `mydb` with your actual database credentials and database name. Ensure `JWT_SECRET` is a secure string.

### 4. Configure Prisma
Ensure `prisma/schema.prisma` is properly configured. It should look like this:

```prisma
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### 5. Generate Prisma Client

Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

### 6. Apply Migrations

Run the migration command to apply your schema to the database:

```bash
npx prisma migrate dev --name init
```

### 7. Start the Server

Run the server using the following command:

```bash
npm run dev
```
or 
```bash
nodemon server.js
```

The server should be running on `http://localhost:5000`.
## API Endpoints

### Authentication

- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`

### Books 
  **(Sellers only)**
- **Upload Books via CSV**: `POST /books/upload`
- **Edit Book**: `PUT /books/:id`
- **Delete Book**: `DELETE /books/:id`

- **View All Books**: `Get /books`
- **View Book Details**: `Get /books/:id`

## Sample CSV Format

The CSV file for uploading books should have the following format:

```csv
title,author,price
Book Title 1,Author 1,19.99
Book Title 2,Author 2,9.99
```

## License

This project is licensed under the MIT License.
