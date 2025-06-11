# todoAPI
basic backend todo API

# desc
no fronted, tested using REST Client

# 🛠️ API Endpoints

### 🔐 Auth

- **`POST /auth/register`**  
  Registers a new user and provides a JWT token
  **Body:** `{ "username": "yourname", "password": "yourpass" }`
  **Returns:** `{ "token": "JWT_TOKEN_HERE" }`

- **`POST /auth/login`**  
  Log in and receive a JWT token
  **Body:** `{ "username": "yourname", "password": "yourpass" }`  
  **Returns:** `{ "token": "JWT_TOKEN_HERE" }`

---

### ✅ Todos (Protected — Requires JWT)

> All routes below require a valid JWT in the header:  
> `Authorization: Bearer <token>`

- **`GET /todos`**  
  Get all tasks for the logged-in user.

- **`POST /todos`**  
  Add a new task.  
  **Body:** `{ "title": "Buy milk", "description": "From grocery store" }`

- **`PUT /todos/:id`**  
  Update a task by ID.  
  **Body:** `{ "title": "Updated", "done": true }`

- **`DELETE /todos/:id`**  
  Delete a task by ID.


# techstack
- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **SQLite** (or any database via `better-sqlite3`)
 
