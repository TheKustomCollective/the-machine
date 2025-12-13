# Quick Start Guide

This guide will help you get The Machine AI Social Metaverse up and running in minutes.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ and npm 9+ installed
- (Optional) PostgreSQL 14+ for database functionality
- (Optional) Expo Go app on your mobile device for testing

## Step 1: Install Dependencies

```bash
npm install
```

This will install all dependencies for the server, mobile app, and shared packages.

## Step 2: Configure Environment

### Server Configuration

```bash
# Copy the example environment file
cp apps/server/.env.example apps/server/.env

# Edit the .env file with your settings
# For quick testing, the defaults will work!
```

**Important**: The `DATABASE_URL` is configured but not required for the basic server to start. You can test the API endpoints without setting up PostgreSQL first.

### Mobile Configuration (Optional)

```bash
# Copy the example environment file
cp apps/mobile/.env.example apps/mobile/.env

# If testing on a physical device, update the API URL
# Replace localhost with your computer's IP address
# Example: EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

## Step 3: Start the Server

```bash
npm run dev:server
```

You should see:
```
🚀 Server is running!
    
📡 API available at: http://localhost:3000
🏥 Health check: http://localhost:3000/health
📊 Status: http://localhost:3000/api/v1/status
🌍 Environment: development
```

### Test the Server

Open a new terminal and test the endpoints:

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test status endpoint
curl http://localhost:3000/api/v1/status

# Test root endpoint
curl http://localhost:3000/
```

## Step 4: Start the Mobile App (Optional)

In a new terminal:

```bash
npm run dev:mobile
```

This will start the Expo development server. You can then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

The mobile app will automatically try to connect to your backend server and display the API status.

## Project Structure

```
the-machine/
├── apps/
│   ├── server/          # Fastify backend API
│   │   ├── src/
│   │   │   └── server.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── .env
│   │
│   └── mobile/          # Expo React Native app
│       ├── App.tsx
│       └── app.json
│
└── packages/
    └── shared/          # Shared TypeScript types
        └── src/
```

## Available API Endpoints

### Current Endpoints
- `GET /` - API information
- `GET /health` - Health check
- `GET /api/v1/status` - API status

### Coming Soon (see GitHub Issues)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/posts/feed` - Get social feed
- `POST /api/v1/posts` - Create post
- And more!

## Next Steps

### 1. Set Up Database (Optional)

If you want to use the database functionality:

```bash
# Start PostgreSQL (using Docker)
docker run --name themachine-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14

# Update your .env file with the DATABASE_URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/themachine"

# Run Prisma migrations
npm run db:migrate -w apps/server

# Generate Prisma Client
npm run db:generate -w apps/server
```

### 2. Explore the Code

- Check out `apps/server/src/server.ts` for the backend implementation
- Look at `apps/mobile/App.tsx` for the mobile app
- Review `apps/server/prisma/schema.prisma` for the database schema

### 3. Check GitHub Issues

We've created 10 GitHub issue templates to guide development:

1. **Setup Monorepo Structure** ✅ (Done)
2. **Setup TypeScript Configuration** ✅ (Done)
3. **Setup Fastify Server** ✅ (Done)
4. **Setup Prisma Database** ✅ (Schema ready)
5. **Setup Expo React Native App** ✅ (Done)
6. **Implement Authentication** (Coming next)
7. **Implement Social Feed** (Coming next)
8. **Implement User Profiles** (Coming next)
9. **Implement Follow System** (Coming next)
10. **Implement AI Features** (Coming next)

See `.github/ISSUE_TEMPLATE/` for detailed implementation plans.

## Development Workflow

### Working on the Server

```bash
# Start dev server with auto-reload
npm run dev -w apps/server

# Build for production
npm run build -w apps/server

# Start production server
npm start -w apps/server

# Open Prisma Studio (database GUI)
npm run db:studio -w apps/server
```

### Working on the Mobile App

```bash
# Start Expo dev server
npm start -w apps/mobile

# Run on iOS
npm run ios -w apps/mobile

# Run on Android
npm run android -w apps/mobile

# Run on web
npm run web -w apps/mobile
```

### Working on Shared Package

```bash
# Build shared types
npm run build -w packages/shared
```

## Troubleshooting

### Server won't start
- Check if port 3000 is already in use: `lsof -i :3000`
- Verify your `.env` file exists and has the required variables
- Check the error messages in the terminal

### Mobile app can't connect to server
- If using a physical device, make sure your computer and phone are on the same WiFi
- Update `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` to use your computer's IP address
- Check if the server is running: `curl http://localhost:3000/health`

### Database connection errors
- Ensure PostgreSQL is running
- Verify the `DATABASE_URL` in your `.env` file is correct
- Try connecting with `psql` to verify credentials

## Common Commands

```bash
# Install all dependencies
npm install

# Start server
npm run dev:server

# Start mobile app
npm run dev:mobile

# Build everything
npm run build

# Clean all node_modules
npm run clean
```

## Resources

- [Fastify Documentation](https://www.fastify.io/)
- [Expo Documentation](https://docs.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

If you encounter any issues:
1. Check the error messages carefully
2. Review the logs in the terminal
3. Check existing GitHub issues
4. Create a new issue with details about your problem

---

Happy coding! 🚀
