# The Machine

AI Social Metaverse - A monorepo project for creating and interacting with AI-powered avatars.

## Project Structure

```
the-machine/
├── apps/
│   └── mobile/          # Expo React Native mobile application
├── packages/
│   ├── common/          # Shared types and utilities
│   └── server/          # Fastify backend server with Prisma
├── .github/
│   └── workflows/
│       └── ci.yml       # GitHub Actions CI pipeline
└── [config files]       # TypeScript, ESLint, Prettier configs
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- PostgreSQL (for server)

### Installation

Install dependencies for all workspaces:

```bash
yarn install
```

### Running the Projects

#### Mobile App

```bash
yarn workspace @app/mobile start
```

This will start the Expo development server. You can then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

#### Server

1. Copy the environment file:
```bash
cp packages/server/.env.example packages/server/.env
```

2. Update the `.env` file with your database credentials

3. Run Prisma migrations:
```bash
yarn workspace @pkg/server prisma:migrate
```

4. Start the development server:
```bash
yarn workspace @pkg/server dev
```

The server will be available at `http://localhost:3000`

### API Endpoints

#### Health Check
- `GET /api/health` - Server health status

#### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and receive JWT token

#### Avatars
- `GET /api/avatars` - List all avatars for authenticated user
- `POST /api/avatars` - Create a new avatar
- `GET /api/avatars/:id` - Get a specific avatar
- `PATCH /api/avatars/:id` - Update an avatar

#### Jobs
- `POST /api/jobs/generate-preview` - Enqueue avatar preview generation
- `GET /api/jobs/:id` - Get job status

#### Chat
- `POST /api/avatars/:id/chat` - Chat with an avatar (LLM + TTS)

## Development

### Linting

Run ESLint across all workspaces:
```bash
yarn lint
```

Fix linting issues:
```bash
yarn lint:fix
```

### Type Checking

Run TypeScript type checking:
```bash
yarn typecheck
```

### Testing

Run tests across all workspaces:
```bash
yarn test
```

### Code Formatting

Check code formatting:
```bash
yarn format:check
```

Format code:
```bash
yarn format
```

## Technologies

- **Mobile**: Expo, React Native, React Navigation, TypeScript
- **Server**: Fastify, Prisma, PostgreSQL, JWT, TypeScript
- **Tooling**: ESLint, Prettier, GitHub Actions
- **AI Integration**: Stubbed LLM and TTS services (ready for integration)

## CI/CD

The project uses GitHub Actions for continuous integration:
- Runs on all PRs and pushes to main/develop
- Executes linting, type checking, and tests
- Configured in `.github/workflows/ci.yml`

## License

Proprietary
