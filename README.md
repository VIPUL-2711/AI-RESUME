# AI Resume Analyzer & Interview Preparation

An AI-powered resume analysis and interview preparation application built with React, Node.js, Express, MongoDB, and the Google Gemini API.

The application accepts a PDF resume and a target job description, then generates a structured interview-preparation report. It also includes an AI-assisted resume PDF generation flow.

**Live application:** https://ai-resume-frontend-2b51.onrender.com  
**Repository:** https://github.com/VIPUL-2711/AI-RESUME

---

## Features

- User registration, login, and logout
- Password hashing with bcrypt
- JWT-based authentication
- PDF resume upload and text extraction
- AI-generated interview preparation report using Google Gemini
- Resume/job-description analysis with a match score
- Technical and behavioral interview questions, with guidance for answering
- Identified skill gaps with severity levels
- Day-wise interview preparation plan
- AI-generated resume HTML rendered to PDF using Puppeteer
- Per-user interview report listing and retrieval

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite, Axios, Sass |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API (@google/genai) |
| Authentication | JSON Web Tokens, bcrypt, cookie-parser |
| File handling | Multer, pdf-parse |
| Validation / output structure | Zod |
| PDF generation | Puppeteer |

## Application Flow

1. A user registers or logs in.
2. The user uploads a PDF resume and provides a self-description and target job description.
3. The backend extracts text from the PDF.
4. The backend sends the candidate information and job description to the Gemini API.
5. The generated report is stored in MongoDB and returned to the authenticated user.
6. The user can retrieve saved reports and request an AI-generated resume PDF.

## Project Structure

~~~text
AI-RESUME/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── router/
│   ├── services/
│   ├── .env.example
│   └── index.js
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
~~~

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (local or hosted)
- A Google Gemini API key

### 1. Clone the repository

~~~bash
git clone https://github.com/VIPUL-2711/AI-RESUME.git
cd AI-RESUME
~~~

### 2. Configure and run the backend

~~~bash
cd backend
npm install
~~~

Create a .env file in the backend/ directory. Use .env.example as the template:

~~~env
MONGODB_URL=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_long_random_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
~~~

Start the backend in development mode:

~~~bash
npm run dev
~~~

The backend listens on the port configured by PORT (the application falls back to port 3000 if it is not set).

### 3. Configure and run the frontend

Open a second terminal from the repository root:

~~~bash
cd Frontend
npm install
npm run dev
~~~

Vite prints the local frontend URL in the terminal (typically http://localhost:5173).

## Environment Variables

| Variable | Purpose |
|---|---|
| MONGODB_URL | MongoDB connection string |
| PORT | Backend HTTP port |
| JWT_SECRET | Secret used to sign and verify JWTs |
| GOOGLE_GENAI_API_KEY | API key used by the Gemini integration |

Keep credentials in your local .env file or deployment environment. **Never commit real API keys, database credentials, or JWT secrets.**

## API Reference

The following routes are mounted by the backend.

### Authentication — /api/auth

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Log in |
| GET | /api/auth/logout | Log out |
| GET | /api/auth/getAll | Get the authenticated user's account details |

### Interview reports — /api/interview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/interview/ | Upload a resume and generate an interview report |
| GET | /api/interview/ | List the authenticated user's reports |
| GET | /api/interview/report/:interviewId | Retrieve a report by ID |
| POST | /api/interview/resume/pdf/:interviewReportId | Generate a resume PDF from a saved report |

The report-generation endpoint expects a multipart form request containing:

- resume — PDF file (maximum upload size: 3 MB)
- selfDescription — candidate self-description
- jobDescription — target role description

Protected routes require the application's authentication cookie/token.

## Screenshots

Screenshots have not been added yet. Add genuine application screenshots here when available, for example:

- Dashboard / report list
- Resume upload and job-description form
- Generated interview report
- Downloaded resume PDF

## Future Improvements

- Add automated backend and frontend tests.
- Validate AI-generated responses against the Zod schema before persisting or returning them.
- Add request validation, rate limiting, and centralized error handling.
- Add end-to-end documentation and verified screenshots.
- Strengthen authorization checks on every report-related operation.

## Author

**Vipul Verma**
- GitHub: https://github.com/VIPUL-2711
- LinkedIn: https://www.linkedin.com/in/vipul-verma-2a2071276/

---

## License

No license file is currently specified in this repository. Contact the author for usage and distribution permissions.
