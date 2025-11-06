---
name: Setup Prisma Database
about: Configure Prisma ORM with initial schema
title: '[DATABASE] Setup Prisma ORM'
labels: database, backend
assignees: ''
---

## Description
Set up Prisma ORM with a basic schema for the AI Social Metaverse, including user authentication and basic social features.

## Acceptance Criteria
- [ ] Prisma installed and configured
- [ ] `prisma/schema.prisma` created with initial models
- [ ] Database models:
  - User (id, email, username, avatar, createdAt, updatedAt)
  - Post (id, content, userId, createdAt, updatedAt)
  - Follow (id, followerId, followingId, createdAt)
- [ ] Prisma Client generated
- [ ] Database migration scripts set up
- [ ] `.env.example` with DATABASE_URL

## Technical Details
- Use PostgreSQL as the database
- Configure Prisma Client in TypeScript
- Add scripts for migrations and seeding
- Set up connection pooling

## Database Schema
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
