
# Notes Keeper - MERN Stack CRUD Application

**Notes Keeper** is a full-stack application for managing and organizing personal notes, built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to perform CRUD (Create, Read, Update, Delete) operations on their notes with a user-friendly interface.

Live Link : https://noteskeeper-project.vercel.app/

<img src="https://github.com/user-attachments/assets/e3d45513-248d-4943-844c-83bc0a333508" alt="Screenshot 2024-08-09 103847" width="600">


## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Create Notes**: Add new notes with titles and content.
- **Read Notes**: View a list of all notes.
- **Update Notes**: Edit existing notes.
- **Delete Notes**: Remove notes.
- **Responsive Design**: Adaptable interface for various screen sizes.
- **Floating Action Button**: Easy access to add new notes.

## Tech Stack

- **Frontend**: React.js with React Bootstrap for styling.
- **Backend**: Node.js and Express.js for server-side logic and API endpoints.
- **Database**: MongoDB with Mongoose for data management.
- **Authentication**: JWT (JSON Web Tokens) for secure authentication.

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/yourusername/mern-notes-keeper.git
```

### Navigate to the Project Directory

```bash
cd mern-notes-keeper
```

### Install Dependencies

- **For the Backend**:

  ```bash
  cd backend
  npm install
  ```

- **For the Frontend**:

  ```bash
  cd ../frontend
  npm install
  ```

### Set Up Environment Variables

Create a `.env` file in the `backend` directory with the following environment variables:

```plaintext
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

### Start the Application

- **Run the Backend Server**:

  ```bash
  cd backend
  npm start
  ```

- **Run the Frontend Application**:

  ```bash
  cd ../frontend
  npm start
  ```

### Access the Application

Open your browser and navigate to `http://localhost:3000` to use the Notes Keeper application.

## Contributing

Contributions are welcome! You can help by:

- Reporting issues
- Submitting pull requests
- Suggesting new features

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


---

Happy note-keeping!

```
