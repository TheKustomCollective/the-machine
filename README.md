# The Machine - AI Social Metaverse

An AI-powered social metaverse application built with TypeScript, featuring a Fastify backend and Expo React Native mobile app.

## 🏗️ Monorepo Structure

```
the-machine/
├── apps/
│   ├── server/          # Fastify backend API
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── routes/
│   │   │   └── plugins/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mobile/          # Expo React Native app
│       ├── App.tsx
│       ├── src/
│       │   ├── screens/
│       │   ├── components/
│       │   └── navigation/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/          # Shared types and utilities
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── ISSUE_TEMPLATE/  # GitHub issue templates
│
├── package.json         # Root workspace configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 14+ (or use Docker)
- Expo CLI for mobile development
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheKustomCollective/the-machine.git
   cd the-machine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example env file in server
   cp apps/server/.env.example apps/server/.env
   
   # Edit apps/server/.env with your database credentials
   ```

4. **Start PostgreSQL (optional - using Docker)**
   ```bash
   # Start PostgreSQL in Docker
   docker-compose up -d
   
   # Or use your own PostgreSQL instance
   ```

5. **Set up the database (optional)**
   ```bash
   # Run Prisma migrations
   npm run db:migrate -w apps/server
   
   # (Optional) Seed the database
   npm run db:seed -w apps/server
   ```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started quickly
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## 📦 Available Commands

### Root Level Commands

```bash
# Install all dependencies
npm install

# Clean all node_modules
npm run clean

# Build all packages
npm run build

# Run tests across all packages
npm test

# Lint all packages
npm run lint
```

### Server Commands

```bash
# Start server in development mode
npm run dev -w apps/server

# Build server
npm run build -w apps/server

# Start production server
npm start -w apps/server

# Run database migrations
npm run db:migrate -w apps/server

# Generate Prisma client
npm run db:generate -w apps/server

# Seed database
npm run db:seed -w apps/server

# Open Prisma Studio
npm run db:studio -w apps/server
```

### Mobile App Commands

```bash
# Start Expo development server
npm start -w apps/mobile

# Start on iOS simulator
npm run ios -w apps/mobile

# Start on Android emulator
npm run android -w apps/mobile

# Start on web
npm run web -w apps/mobile

# Build for production (iOS)
npm run build:ios -w apps/mobile

# Build for production (Android)
npm run build:android -w apps/mobile
```

## 🔧 Development

### Running the Full Stack

1. **Terminal 1 - Start the backend server**
   ```bash
   npm run dev -w apps/server
   ```
   Server will be available at `http://localhost:3000`

2. **Terminal 2 - Start the mobile app**
   ```bash
   npm start -w apps/mobile
   ```
   Scan the QR code with Expo Go app or run on emulator

### Environment Variables

#### Server (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/themachine"

# Server
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION="7d"

# AI (Optional)
OPENAI_API_KEY="your-openai-api-key"

# CORS
CORS_ORIGIN="*"
```

#### Mobile (.env)
```env
# API
API_URL=http://localhost:3000
API_TIMEOUT=30000

# Environment
EXPO_PUBLIC_ENV=development
```

## 🏛️ Architecture

### Backend (Fastify)
- **Framework**: Fastify with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth
- **API Style**: RESTful API
- **Logging**: Pino (built into Fastify)

### Mobile (Expo/React Native)
- **Framework**: Expo with React Native
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Context/Hooks (or add Redux/Zustand)
- **UI**: React Native components

### Shared Package
- Shared TypeScript types
- Common utilities
- API contracts/interfaces

## 📡 API Endpoints

### Health & Status
- `GET /health` - Health check
- `GET /api/v1/status` - API status

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout

### Users
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/me` - Update profile
- `POST /api/v1/users/avatar` - Upload avatar

### Posts
- `GET /api/v1/posts/feed` - Get feed
- `POST /api/v1/posts` - Create post
- `GET /api/v1/posts/:id` - Get post
- `DELETE /api/v1/posts/:id` - Delete post

### Follow System
- `POST /api/v1/users/:id/follow` - Follow user
- `DELETE /api/v1/users/:id/follow` - Unfollow user
- `GET /api/v1/users/:id/followers` - Get followers
- `GET /api/v1/users/:id/following` - Get following

### AI Features
- `POST /api/v1/ai/moderate` - Moderate content
- `POST /api/v1/ai/chat` - AI chatbot
- `GET /api/v1/ai/recommendations` - Get recommendations

## 🗄️ Database Schema

### User
- id (UUID)
- email (unique)
- username (unique)
- password (hashed)
- avatar
- bio
- location
- createdAt
- updatedAt

### Post
- id (UUID)
- content
- userId (FK)
- createdAt
- updatedAt

### Follow
- id (UUID)
- followerId (FK)
- followingId (FK)
- createdAt

## 🧪 Testing

```bash
# Run all tests
npm test

# Run server tests
npm test -w apps/server

# Run mobile tests
npm test -w apps/mobile

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### Server Deployment

**Docker**
```bash
docker build -t the-machine-server ./apps/server
docker run -p 3000:3000 --env-file apps/server/.env the-machine-server
```

**Recommended Platforms**:
- Railway
- Render
- Fly.io
- AWS ECS
- DigitalOcean App Platform

### Mobile Deployment

**iOS**
```bash
cd apps/mobile
eas build --platform ios
eas submit --platform ios
```

**Android**
```bash
cd apps/mobile
eas build --platform android
eas submit --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Issue Templates

We provide GitHub issue templates for:
1. Setup Monorepo Structure
2. Setup TypeScript Configuration
3. Setup Fastify Server
4. Setup Prisma Database
5. Setup Expo React Native App
6. Implement Authentication
7. Implement Social Feed
8. Implement User Profiles
9. Implement Follow System
10. Implement AI Features

Find them in `.github/ISSUE_TEMPLATE/`

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for security
- Environment variables for secrets
- Input validation on all endpoints
- Rate limiting on auth endpoints

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Fastify for the excellent Node.js framework
- Expo team for React Native tooling
- Prisma for the amazing ORM
- OpenAI for AI capabilities

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing issues and discussions
- Review the documentation

---

**Built with ❤️ for the AI Social Metaverse community**
