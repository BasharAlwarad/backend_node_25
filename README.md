# backend_node_25

# 🧩 A simple Web Server

This document explains how to set up and run the file server application. The server allows you to create, read, and delete text files through HTTP requests.

## Prerequisites

- Node.js installed on your system.
- A terminal or command prompt.
- A tool to test HTTP requests, such as Postman or cURL.

---

## Setup Instructions

1. Clone or download the project files to your local system.
2. Navigate to the project directory in your terminal:
   ```bash
   cd /path/to/project
   ```
3. Ensure all necessary dependencies are installed (though this project does not require additional packages).

---

## Running the Server

1. Start the server by running the following command:
   ```bash
   node index.js
   ```
2. The server will start and listen on port 3000. You should see this message in the terminal:
   ```
   Server running at http://localhost:3000/
   ```

---

## API Endpoints

### 1. Create a File

- **URL:** `http://localhost:3000/files`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "message": "Your message here"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "message": "File created successfully!"
    }
    ```
  ```
  - `400 Bad Request` if the `message` field is missing.
  ```

### 2. Read a File

- **URL:** `http://localhost:3000/files/{folder}/{filename}`
  - Replace `{folder}` with the directory name (e.g., `2025-01-16`).
  - Replace `{filename}` with the file name (e.g., `13-19-52.txt`).
- **Method:** `GET`
- **Response:**
  - `200 OK` with the file content.
  - `404 Not Found` if the file does not exist.

### 3. Delete a File

- **URL:** `http://localhost:3000/files/{folder}/{filename}`
  - Replace `{folder}` with the directory name.
  - Replace `{filename}` with the file name.
- **Method:** `DELETE`
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "File deleted successfully!"
    }
    ```
  - `404 Not Found` if the file does not exist.

---

## Testing with Postman

1. Open Postman and create a new request.
2. Select the appropriate HTTP method (`POST`, `GET`, or `DELETE`).
3. For `POST` requests:
   - Set the **Body** tab to `raw` and choose `JSON` format.
   - Enter the payload:
     ```json
     {
       "message": "Hello, world!"
     }
     ```
4. For `GET` and `DELETE` requests:
   - Enter the file path in the URL, e.g., `http://localhost:3000/files/2025-01-16/13-19-52.txt`.

---

## Notes

- The server automatically creates a folder for the current date when a file is created.
- Ensure the file path is valid and corresponds to the structure used when creating the file.
- Logs in the terminal will display resolved file paths and any errors encountered during requests.

---

## Example Usage

1. **Create a File**:

   ```bash
   curl -X POST http://localhost:3000/files \
   -H "Content-Type: application/json" \
   -d '{"message": "Hello, world!"}'
   ```

2. **Read a File**:

   ```bash
   curl -X GET http://localhost:3000/files/2025-01-16/13-19-52.txt
   ```

3. **Delete a File**:
   ```bash
   curl -X DELETE http://localhost:3000/files/2025-01-16/13-19-52.txt
   ```
