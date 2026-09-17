# AI Resume

AI Resume is a web application that helps users analyze their resumes and prepare for interviews using artificial intelligence.

## Features

* User registration and login
* JWT-based authentication
* Secure password hashing
* Resume PDF upload
* Resume text extraction
* AI-generated interview reports
* Job description and resume analysis
* MongoDB database integration

## Technologies Used

### Frontend

* React
* JavaScript
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Google Gemini API

## Project Structure

```text
AI-RESUME/
├── backend/
├── frontend/
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-RESUME.git
cd AI-RESUME
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
PORT=3000
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

The following environment variables are required:

| Variable             | Description                       |
| -------------------- | --------------------------------- |
| MONGODB_URL          | MongoDB database connection       |
| JWT_SECRET           | Secret key for JWT authentication |
| GOOGLE_GENAI_API_KEY | Google Gemini API key             |
| PORT                 | Backend server port               |

Do not commit the `.env` file to GitHub.

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/getAll
```

### Interview

```text
POST /api/interview/
```

## Usage

1. Register an account.
2. Log in using your credentials.
3. Upload your resume.
4. Enter your self-description and job description.
5. Generate an AI-powered interview report.

## Author

Your Name

## License

This project is for educational and development purposes.
