# backend_node_25

# Setting Up and Using the Project

## Prerequisites

- Node.js installed on your system
- PostgreSQL database
- Postman or any other API testing tool

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Setting Up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:
   ```env
   PORT=3000
   NEON=<your_postgresql_connection_string>
   ```
   - Replace `<your_postgresql_connection_string>` with your actual PostgreSQL connection string (e.g., `postgres://username:password@host:port/database`).

---

## Running the Server

1. Start the server:
   ```bash
   node index.js
   ```
2. The server will run on the specified port (default: `3000`). You should see:
   ```
   Server running on 3000
   ```

---

## Using the API in Postman

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

#### 1. **Get All Users**

- **URL**: `/users`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "age": 30
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Doe",
      "age": 28
    }
  ]
  ```

#### 2. **Get User by ID**

- **URL**: `/users/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "age": 30
  }
  ```

#### 3. **Create a New User**

- **URL**: `/users`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "first_name": "Alice",
    "last_name": "Smith",
    "age": 25
  }
  ```
- **Response**:
  ```json
  {
    "id": 3,
    "first_name": "Alice",
    "last_name": "Smith",
    "age": 25
  }
  ```

#### 4. **Update a User by ID**

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Body** (JSON):
  ```json
  {
    "first_name": "Alice",
    "last_name": "Johnson",
    "age": 26
  }
  ```
- **Response**:
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "id": 3,
      "first_name": "Alice",
      "last_name": "Johnson",
      "age": 26
    }
  }
  ```

#### 5. **Delete a User by ID**

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "User deleted successfully",
    "user": {
      "id": 3,
      "first_name": "Alice",
      "last_name": "Johnson",
      "age": 26
    }
  }
  ```

---

## Notes

- Ensure your PostgreSQL database is running and accessible.
- Use the correct connection string in the `.env` file.
- If the server crashes or fails to start, check the logs for errors (e.g., database connection issues).
