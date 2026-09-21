# Library System API

A RESTful Library System API built with **Node.js, TypeScript, and Express**.
The API manages authors and books using an in-memory data structure. Each book is associated with an author through the `authorId` field.

## Features

* Create, read, update, and delete authors
* Create, read, update, and delete books
* Retrieve all books written by a specific author
* Validate author and book input data
* Validate relationships between books and authors
* Detect duplicate books
* Return appropriate HTTP status codes
* Log incoming HTTP requests
* Handle invalid routes
* Centralized error handling
* Generate unique IDs for newly created records


## Technologies Used

* Node.js
* TypeScript
* Express.js
* ts-node
* Nodemon
* Postman

## Installation

Clone or download the project and open the project folder in the terminal.

Install the dependencies:

```bash
npm install
```

## Running the API

### Development mode

Run the server using Nodemon:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

### Start mode

The API can also be started with:

```bash
npm start
```

## API Endpoints

### Authors

Method  Endpoint            

 GET     `/authors`          
 POST    `/authors`          
 GET     `/authors/:id`      
 PUT     `/authors/:id`      
 DELETE  `/authors/:id`      
 GET     `/authors/:id/books`

### Books

 Method  Endpoint

 GET     `/books`     
 POST    `/books`     
 GET     `/books/:id` 
 PUT     `/books/:id` 
 DELETE  `/books/:id` 

## Author Request Example

### POST `/authors`

```json
{
  "name": "J.R.R. Tolkien",
  "email": "tolkien@example.com"
}
```

The API returns `201 Created` when the author is successfully created.

## Book Request Example

### POST `/books`

```json
{
  "title": "The Hobbit",
  "year": 1937,
  "authorId": 1
}
```

The `authorId` must refer to an existing author.

The API returns `201 Created` when the book is successfully created.

## Validation

The API validates incoming author and book data before processing requests.

### Author validation

The API checks that:

* `name` is provided
* `name` is a string
* `email` is provided
* `email` is a string

### Book validation

The API checks that:

* `title` is provided
* `title` is a string
* `year` is provided
* `year` is an integer
* `authorId` is provided
* `authorId` is an integer
* The specified author exists

### 400 Bad Request

Returned when invalid data is submitted.

Example:

```json
{
  "title": "Test Book",
  "year": "invalid",
  "authorId": 1
}
```

### 404 Not Found

Returned when the requested author, book, or route does not exist.

Example:

```json
{
  "message": "Book not found"
}
```

### 409 Conflict

Returned when a duplicate book is submitted for the same author.

Example:

```json
{
  "message": "A book with this title already exists for this author"
}
```

### 500 Internal Server Error

Unexpected errors are handled by the centralized error-handling middleware.

```json
{
  "message": "Internal server error"
}
```

## Middleware

### Logger

The logger middleware records the HTTP method and URL for each request.

Example:

```text
GET /authors
POST /authors
GET /books
DELETE /books/2
```

### Validation

The validation middleware checks author and book request data before the route handlers process the request.

### Error Handler

The centralized error handler provides a consistent response when an unexpected server error occurs.

## ID Generation

New authors and books receive unique IDs based on the highest existing ID.

This prevents duplicate IDs when an existing record has been deleted.

## Data Storage

The API currently uses **in-memory arrays** for storing authors and books.

This means:

* No database is required.
* Data is available while the server is running.
* Restarting the server resets the data to the initial data stored in the `data` folder.

## Testing

The API endpoints were tested using **Postman**.

The following areas were tested:

* Author CRUD operations
* Book CRUD operations
* Author-book relationships
* Valid requests
* Invalid request data
* Missing resources
* Invalid routes
* Duplicate books
* ID generation
* Logger middleware
* Error handling

## Query Parameters

Optional query parameters were not implemented because they were not required for the core functionality of this project.

## Conclusion

The Library System API provides a RESTful interface for managing authors and books. The project separates routes, models, data, and middleware to keep the application organized and maintainable.

The API implements CRUD operations, input validation, author-book relationships, duplicate detection, logging, and appropriate HTTP error responses.

## Author 
- Malesela Phineas Ngoasheng