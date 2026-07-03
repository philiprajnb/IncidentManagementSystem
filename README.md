# Incident Management System

A lightweight full-stack incident management application with REST APIs, a React UI, MongoDB persistence, and optional Gemini-powered incident analysis.

## Features

- Create incidents with title, description, and severity
- View all incidents
- Filter incidents by severity and status
- View incident details
- Update incident status
- Generate AI incident analysis with:
  - Executive summary
  - Severity recommendation
  - Severity reasoning
  - Possible root causes
  - Confidence score

## Tech Stack

- Backend: Node.js, Express, TypeScript, Mongoose, Zod
- Frontend: React, TypeScript, Vite, React Query, React Bootstrap
- Database: MongoDB Atlas
- AI: Google Gemini API

## Repository Structure

```text
.
├── client/   # React + Vite frontend
└── server/   # Express + TypeScript backend
```

## Prerequisites

- Node.js 20 or newer
- npm
- Internet access for MongoDB Atlas and Gemini API calls

## Important Configuration Note

The MongoDB connection string is intentionally hard-coded temporarily in `server/src/config/database.ts` so reviewers can clone the repository and test the app using the current shared database without extra setup.

The Gemini integration reads `GEMINI_API_KEY` from the server environment. To test the AI analysis feature, provide a valid Gemini API key before starting the server.

For production or shared source control, move the MongoDB URI into an environment variable such as `MONGODB_URI` and rotate any exposed credentials.

## Server Setup

From the repository root:

```bash
cd server
npm install
```

Create `server/.env` if you want to use the AI analysis feature:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3010
```

Start the backend:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3010
```

Health check:

```text
GET http://localhost:3010/health
```

## Client Setup

In a second terminal, from the repository root:

```bash
cd client
npm install
npm run dev
```

The client runs at:

```text
http://localhost:5173
```

The Vite dev server proxies `/api` requests to:

```text
http://localhost:3010
```

## API Endpoints

Base URL:

```text
http://localhost:3010/api
```

### Create Incident

```text
POST /incidents
```

Body:

```json
{
  "title": "Database latency",
  "description": "Primary database response times are above expected thresholds.",
  "severity": "HIGH"
}
```

### Retrieve Incidents

```text
GET /incidents
```

Optional filters:

```text
GET /incidents?severity=HIGH&status=OPEN
```

Allowed severity values:

```text
LOW, MEDIUM, HIGH, CRITICAL
```

Allowed status values:

```text
OPEN, IN_PROGRESS, RESOLVED
```

### Retrieve Incident Details

```text
GET /incidents/:id
```

### Update Incident Status

```text
PATCH /incidents/:id/status
```

Body:

```json
{
  "status": "IN_PROGRESS"
}
```

### Generate AI Analysis

```text
GET /incidents/:id/analysis
```

Requires `GEMINI_API_KEY` in `server/.env`.

## Validation and Error Handling

- Request bodies and query parameters are validated with Zod.
- Invalid create, filter, or status update requests return `400`.
- Missing incidents return `404`.
- Unexpected failures return `500`.

## Tests

Basic backend tests are included in:

```text
server/src/validators/incident.validator.test.ts
```

These tests use Node's built-in test runner through `tsx` and cover:

- Valid incident creation payloads
- Invalid incident creation payloads
- Valid severity and status filters
- Invalid filter values
- Valid status updates
- Invalid status updates

Run the tests:

```bash
cd server
npm test
```

Expected result:

```text
tests 6
pass 6
fail 0
```

## Build Checks

Server:

```bash
cd server
npm run build
```

Client:

```bash
cd client
npm run build
npm run lint
```

## Notes for Reviewers

- Start the server before starting the client.
- The incident list, creation modal, filters, detail page, status update form, and AI panel are all available from the web UI.
- The AI panel appears on the incident details page and calls the backend Gemini analysis endpoint on demand.
