# License Compliance Tracker - Frontend

React frontend for the Agent License Compliance Tracker. Provides a dashboard for managing insurance agent IRA license compliance.

## Tech Stack

- **React** 18
- **Vite** (Build tool)
- **Tailwind CSS** v4 (Styling)
- **React Router** v6 (Routing)
- **React Query** (Server state management)
- **Zustand** (Client state management)
- **Axios** (HTTP client)
- **date-fns** (Date formatting)
- **react-hot-toast** (Notifications)

## Color Palette

| Usage         | Color   | Hex Code  |
|---------------|---------|-----------|
| Primary       | Blue    | `#027CD0` |
| Compliant     | Green   | `#22C55E` |
| Expiring Soon | Amber   | `#F59E0B` |
| Expired       | Red     | `#EF4444` |

## Typography

- **Primary Font:** Inter (400, 500, 600, 700)
- **Monospace Font:** JetBrains Mono (code, timestamps, IDs)
- **Base Size:** 14px / 1rem
- **Line Height:** 1.5
- **Scale:** 12px, 14px, 16px, 20px, 24px, 30px, 36px

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── shared/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   └── StatsCard.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Select.jsx
│   │       ├── Skeleton.jsx
│   │       ├── StatusBadge.jsx
│   │       └── Table.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useLicense.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   └── AgentDashboardPage.jsx
│   │   ├── licenses/
│   │   │   ├── LicensesPage.jsx
│   │   │   └── MyLicensePage.jsx
│   │   ├── users/
│   │   │   └── UsersPage.jsx
│   │   └── notifications/
│   │       └── NotificationsPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── licenses.js
│   │   ├── notifications.js
│   │   └── users.js
│   ├── store/
│   │   └── authStore.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── netlify.toml
└── Dockerfile
```

## Quick Start (Local Development)

```bash
# Clone the repo
git clone https://github.com/keithkamau/license-tracker-front-end.git
cd license-tracker-front-end

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=License Tracker
```

For production (`.env.production`):

```env
VITE_API_URL=https://your-backend.onrender.com/api
VITE_APP_NAME=License Tracker
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Pages & Access

| Page          | Route           | Access        |
|---------------|-----------------|---------------|
| Login         | /login          | Public        |
| Register      | /register       | Public        |
| Dashboard     | /dashboard      | Admin, HR     |
| Licenses      | /licenses       | Admin, HR     |
| Users         | /users          | Admin, HR     |
| My License    | /my-license     | Agent         |
| Notifications | /notifications  | All           |

## Features

### Authentication

- JWT-based login with token refresh
- Role-based access control (Admin, HR, Agent)
- Automatic redirect based on user role

### Admin/HR Dashboard

- Compliance statistics (total, compliant, expiring, expired)
- Recent licenses overview
- Status badges with traffic-light colors

### License Management

- Filterable license list (status, verification, date range)
- Search by agent name, email, or license number
- CSV export (all licenses or pending renewal only)
- License verification workflow

### Agent Dashboard

- Personal license status with color coding
- Days until expiry countdown
- License upload with file validation
- Renewal reminders for expiring licenses

### User Management

- User list with search and role filters
- Create new users (agents, HR)
- Toggle user active/inactive status

### Notifications

- Real-time notification bell with unread count
- Priority indicators (low, medium, high, urgent)
- Mark as read / mark all read

## Running with Docker

```bash
# Development
docker-compose up --build

# Production build
docker build -f Dockerfile.prod -t license-tracker-frontend .
docker run -p 80:80 license-tracker-frontend
```

## Deployment

This frontend is deployed on Netlify.

### Netlify Setup

- Connect GitHub repository
- Build Command: `npm run build`
- Publish Directory: `dist`
- Add environment variable: `VITE_API_URL`

### Manual Deploy

```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### GitHub Actions

Automated CI/CD on push to `main`:

- Runs linting
- Runs tests
- Builds and deploys to Netlify

## State Management

- **Zustand** for auth state (user, tokens)
- **React Query** for server state (licenses, users, notifications)
- Automatic cache invalidation on mutations
- 30-second stale time for queries

## API Integration

All API calls go through `src/services/api.js` which:

- Attaches JWT token to requests
- Handles token refresh on 401 responses
- Redirects to login on auth failure

## License

Proprietary. All rights reserved.