# fullstack-MERN-blog-app

# Blog App

Welcome to the Blog App, a simple full-stack application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to register, log in, create, edit, and view blog posts.

## Getting Started

To run the Blog App on your local machine, follow these instructions:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the client directory:

    ```bash
    cd client
    ```

3. Install client dependencies:

    ```bash
    npm install
    ```

4. Navigate to the api directory:

    ```bash
    cd ../api
    ```

5. Install server dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a MongoDB Atlas account and replace the connection string in `api/index.js` with your own.

2. Set the client origin in `api/index.js` for CORS:

    ```javascript
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    ```

### Running the App

1. Start the client:

    ```bash
    cd ../client
    npm start
    ```

2. Start the backend:

    ```bash
    cd ../api
    node index.js
    ```

   Or using nodemon:

    ```bash
    nodemon index.js
    ```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the Blog App.

## Features

- **User Authentication:** Register, log in, and log out securely.
- **Create, Edit, and View Posts:** Users can create new blog posts, edit their own posts, and view posts created by others.
- **File Uploads:** Supports uploading images for blog post covers.
- **Profile Page:** View your own profile information.

## Project Structure

```plaintext
.
├── api
│   ├── index.js
│   ├── models
│   │   ├── Post.js
│   │   └── User.js
│   └── uploads
│       ├── ...
│
├── client
│   ├── ...
│
