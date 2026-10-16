# 1. Project Overview
This project is a full-stack Node.js and Express application integrated with Google's Gemini AI. The backend receives user input, communicates securely with the Gemini API using an API key stored in environment variables, and sends back the AI-generated responses to the frontend.

Calling the Gemini API from the backend ensures that sensitive credentials (like API keys) are never exposed to the client browser or client-side JavaScript.

# 2. Server-Side Architecture
- **`index.js`**: Serves as the main entry point for the Node.js application.
  - Initializes the Express application instance (`express()`).
  - Sets up middleware (`express.json()` and `express.static('public')`).
  - Configures environment variables via `dotenv`.
  - Defines backend routes (`POST` and `GET`) to handle requests and communicate with Gemini API.
  - Listens on a specified port using `app.listen()`.

# 3. Client-Server Communication
1. **Frontend Request**: The browser frontend collects user query input and sends a `POST` request to the backend using `fetch()`.
2. **Backend Route**: Express parses the JSON payload using `express.json()` and receives the query in `req.body`.
3. **Gemini API Call**: The server handles the request inside an `async` function using `try/catch` block, initiating an API call to Gemini using the stored `GEMINI_API_KEY`.
4. **Response Handling**: The AI response is sent back to the frontend as JSON (`res.json()`), which updates the UI without page reload.

# 4. Backend Logic and Routing
- **`express()` Initialization**: Creates the Express application server.
- **`express.json()` Middleware**: Parses incoming JSON payloads from client requests so `req.body` is accessible.
- **`express.static('public')`**: Serves frontend static files (`index.html`, `style.css`, `script.js`).
- **`process.env.GEMINI_API_KEY`**: Reads the secure API key from `.env` without hardcoding.
- **Routes (`app.get` & `app.post`)**: Defines API endpoints for health check and receiving prompts.

# 5. Security and Environment Management
- **API Key Security**: The Gemini API key is loaded into environment variables using `require('dotenv').config()`. It remains strictly on the server side.
- **Static vs API Routes**: Frontend assets are served as static files, while dynamic query processing is restricted to secure server-side POST API routes.

# 6. References
- Server Entry Point: `index.js`
- Configuration: `.env` / `package.json`
- Static Assets: `public/`
