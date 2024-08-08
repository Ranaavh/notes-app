# Notes Keeper - MERN Stack CRUD Application

**Notes Keeper** is a full-stack notes management application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to perform CRUD (Create, Read, Update, Delete) operations on their notes, making it a comprehensive tool for managing and organizing personal notes.

### Access the Application

Open your browser and navigate to https://noteskeeper-project.vercel.app/ to use the Notes Keeper application.

## Features

- **User Authentication**: Secure login and registration system using JWT for user authentication.
- **Create Notes**: Add new notes with a title and content.
- **Read Notes**: View a list of all notes with their respective details.
- **Update Notes**: Edit existing notes to modify their title or content.
- **Delete Notes**: Remove notes that are no longer needed.
- **Responsive Design**: User-friendly interface that adapts to different screen sizes.
- **Floating Action Button**: Quick access to add new notes.

## Tech Stack

- **Frontend**: React.js with React Bootstrap for styling and a responsive design.
- **Backend**: Node.js and Express.js to handle API requests and server-side logic.
- **Database**: MongoDB with Mongoose for data storage and management.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.

## Setup Instructions

### Clone the Repository

```bash
https://github.com/Ranaavh/notes-keeper.git
```

### Navigate to the Project Directory

```bash
cd mern-notes-keeper
```

### Install Dependencies

- For the backend:

  ```bash
  cd backend
  npm install
  ```

- For the frontend:

  ```bash
  cd ../frontend
  npm install
  ```

### Set Up Environment Variables

Create a `.env` file in the `backend` directory with the necessary environment variables, such as `MONGO_URI` and `JWT_SECRET`.

Example `.env` file:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Start the Application

- Run the backend server:

  ```bash
  cd backend
  npm start
  ```

- Run the frontend application:

  ```bash
  cd ../frontend
  npm start
  ```

## Contributing

Feel free to contribute to this project by submitting issues, pull requests, or feature suggestions. Here are some ways you can contribute:

- Report bugs or issues
- Suggest new features or enhancements
- Submit pull requests with bug fixes or improvements

## License

This project is licensed under the [MIT License](LICENSE).
