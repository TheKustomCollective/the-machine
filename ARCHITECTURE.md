# Architecture Documentation

This document describes the architecture and design decisions for The Machine AI Social Metaverse.

## System Overview

The Machine is a full-stack AI-powered social metaverse application built using a modern monorepo architecture. It consists of three main components:

1. **Backend API Server** - Fastify-based REST API
2. **Mobile Application** - Expo React Native cross-platform app
3. **Shared Package** - Common TypeScript types and utilities

## Technology Stack

### Backend (apps/server)
- **Framework**: Fastify 4.x
  - Chosen for performance and TypeScript support
  - Built-in schema validation
  - Extensive plugin ecosystem
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 14+
- **ORM**: Prisma 5.x
  - Type-safe database client
  - Automatic migrations
  - Excellent developer experience
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Pino (built into Fastify)

### Mobile (apps/mobile)
- **Framework**: Expo SDK 50.x
  - Cross-platform (iOS, Android, Web)
  - Over-the-air updates
  - Managed workflow for easier development
- **Language**: TypeScript 5.x
- **UI**: React Native
- **Navigation**: React Navigation 6.x
- **HTTP Client**: Fetch API (or axios)

### Shared (packages/shared)
- **Language**: TypeScript 5.x
- **Purpose**: Shared types, interfaces, and utilities
- **Usage**: Imported by both server and mobile apps

### Development Tools
- **Package Manager**: npm with workspaces
- **Build Tool**: TypeScript compiler (tsc)
- **Dev Server**: tsx (TypeScript execute with watch mode)
- **Version Control**: Git

## Architecture Patterns

### Monorepo Structure

We use npm workspaces to manage multiple packages in a single repository:

```
the-machine/
├── apps/           # Applications
├── packages/       # Shared libraries
└── package.json    # Root workspace config
```

**Benefits**:
- Shared dependencies
- Consistent tooling
- Easy cross-package refactoring
- Single version source of truth

### Backend Architecture

The server follows a **modular plugin-based architecture**:

```
apps/server/
├── src/
│   ├── server.ts           # Entry point & app setup
│   ├── routes/             # Route handlers (future)
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── posts.ts
│   ├── plugins/            # Fastify plugins (future)
│   │   ├── auth.ts
│   │   └── prisma.ts
│   ├── services/           # Business logic (future)
│   └── utils/              # Utilities (future)
├── prisma/
│   └── schema.prisma       # Database schema
└── package.json
```

**Key Design Decisions**:

1. **Plugin Architecture**: Fastify's plugin system for modularity
2. **Separation of Concerns**: Routes, services, and data layers are separate
3. **Environment-based Configuration**: Using .env files
4. **Error Handling**: Centralized error handler
5. **Validation**: Schema validation at route level (future)

### Database Schema

The database uses a **relational model** with the following entities:

```prisma
User
├── id: UUID
├── email: unique string
├── username: unique string
├── password: hashed string
├── avatar: optional string
├── bio: optional string
└── timestamps

Post
├── id: UUID
├── content: string
├── userId: FK to User
└── timestamps

Follow
├── id: UUID
├── followerId: FK to User
├── followingId: FK to User
└── createdAt
```

**Relationships**:
- User → Post (one-to-many)
- User → Follow (many-to-many through Follow table)

**Indexes**:
- userId on Post for fast user post lookups
- followerId and followingId on Follow for fast relationship queries
- createdAt on Post for chronological ordering

### Mobile Architecture

The mobile app uses a **component-based architecture**:

```
apps/mobile/
├── App.tsx                 # Root component & navigation
├── src/
│   ├── screens/            # Screen components (future)
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── components/         # Reusable components (future)
│   │   ├── PostCard.tsx
│   │   └── UserAvatar.tsx
│   ├── navigation/         # Navigation setup (future)
│   ├── services/           # API clients (future)
│   │   └── api.ts
│   ├── contexts/           # React contexts (future)
│   │   └── AuthContext.tsx
│   └── utils/              # Utilities (future)
└── package.json
```

**Key Design Decisions**:

1. **React Hooks**: Modern functional components with hooks
2. **Context API**: For global state (auth, user data)
3. **Component Composition**: Small, reusable components
4. **TypeScript**: Full type safety
5. **Expo Managed Workflow**: Easier development and updates

## API Design

### RESTful Principles

The API follows REST conventions:

- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT/PATCH**: Update resources
- **DELETE**: Remove resources

### URL Structure

```
/api/v1/              # API version prefix
  /auth/
    /register         # POST - Register new user
    /login            # POST - Login user
    /me               # GET - Get current user
  /users/
    /:id              # GET - Get user profile
    /me               # PUT - Update own profile
    /:id/follow       # POST - Follow user
    /:id/followers    # GET - Get followers list
  /posts/
    /feed             # GET - Get feed
    /                 # POST - Create post
    /:id              # GET, DELETE - Post operations
  /ai/
    /chat             # POST - Chat with AI
    /moderate         # POST - Moderate content
```

### Response Format

All API responses follow a consistent format:

```typescript
{
  "data": {},           // Success data
  "error": "string",    // Error message (if error)
  "message": "string",  // Info message
  "statusCode": 200     // HTTP status code
}
```

### Authentication Flow

```
Client                    Server
  |                        |
  |--- POST /auth/login -->|
  |<-- JWT token ----------|
  |                        |
  |--- GET /api/v1/users/me (with JWT) -->|
  |<-- User data ----------|
```

JWT tokens are passed in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Security Considerations

### Authentication & Authorization
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for stateless authentication
- Token expiration (7 days default)
- Refresh token mechanism (future)

### Data Protection
- Environment variables for secrets
- HTTPS in production
- CORS configured for trusted origins
- Input validation on all endpoints

### Database Security
- Prepared statements (via Prisma)
- No raw SQL queries
- Connection pooling
- Proper indexes for performance

## Scalability Considerations

### Current Design
- Stateless API (horizontal scaling ready)
- Database connection pooling
- Efficient indexes
- Pagination on list endpoints

### Future Improvements
- Redis for caching
- CDN for static assets
- Database read replicas
- Message queue for async tasks
- Load balancer for multiple instances

## Development Workflow

### Code Organization
1. Keep files small and focused
2. One component/service per file
3. Export types from shared package
4. Use absolute imports where possible

### Git Workflow
1. Feature branches from main
2. Descriptive commit messages
3. PR reviews before merge
4. CI/CD checks (future)

### Testing Strategy (Future)
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical flows
- Snapshot tests for React components

## Monitoring & Observability (Future)

### Logging
- Structured logging with Pino
- Log levels: trace, debug, info, warn, error, fatal
- Request/response logging
- Error tracking

### Metrics
- Response times
- Error rates
- Database query performance
- Active users

### Health Checks
- `/health` endpoint
- Database connectivity
- External service status

## Deployment Strategy (Future)

### Server Deployment
- Docker containers
- Cloud platforms: Railway, Render, Fly.io
- Environment-based configuration
- Automated migrations

### Mobile Deployment
- EAS (Expo Application Services)
- Over-the-air updates
- App Store & Google Play
- Staging and production builds

### Database Deployment
- Managed PostgreSQL (AWS RDS, Supabase, etc.)
- Automated backups
- Migration strategy
- Zero-downtime deployments

## AI Integration (Future)

### Content Moderation
- OpenAI Moderation API
- Automatic content filtering
- Flagging system

### Recommendations
- User recommendations
- Content recommendations
- ML-based feed algorithm

### Chatbot
- AI assistant for users
- Help and navigation
- Natural language queries

## Performance Optimization (Future)

### Backend
- Response caching
- Database query optimization
- Connection pooling
- Compression (gzip)

### Mobile
- Image optimization
- Lazy loading
- Offline support
- Caching strategies

### Database
- Proper indexes
- Query optimization
- Partitioning for large tables
- Read replicas

## Extensibility

The architecture is designed to be extensible:

1. **Plugin System**: Easy to add new Fastify plugins
2. **Modular Routes**: Add new routes without touching existing code
3. **Shared Types**: Central type definitions
4. **Service Layer**: Business logic separation
5. **Component Library**: Reusable UI components

## Technology Choices Rationale

### Why Fastify?
- Excellent performance (fastest Node.js framework)
- Built-in TypeScript support
- Schema validation
- Large plugin ecosystem
- Active development and community

### Why Expo?
- Cross-platform development
- Managed workflow reduces complexity
- Over-the-air updates
- Extensive library of components
- Good documentation

### Why Prisma?
- Type-safe database client
- Automatic migrations
- Excellent DX with IntelliSense
- Multiple database support
- Schema-first approach

### Why PostgreSQL?
- Robust and mature
- Excellent performance
- JSON support for flexibility
- Strong consistency guarantees
- Wide hosting options

### Why Monorepo?
- Code sharing
- Consistent tooling
- Atomic commits across packages
- Easier refactoring
- Single source of truth

## Future Enhancements

### Short Term
1. Complete authentication system
2. Social feed implementation
3. User profiles
4. Follow system
5. Basic AI features

### Medium Term
1. Real-time features (WebSocket)
2. Push notifications
3. Image upload and storage
4. Search functionality
5. Analytics

### Long Term
1. Video support
2. Live streaming
3. AR/VR features
4. Advanced AI personalization
5. Blockchain integration

## References

- [Fastify Documentation](https://www.fastify.io/)
- [Expo Documentation](https://docs.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Last Updated**: November 6, 2025
**Version**: 0.1.0
