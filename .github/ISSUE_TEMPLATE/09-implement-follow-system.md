---
name: Implement Follow System
about: Add ability for users to follow/unfollow each other
title: '[FEATURE] Implement Follow System'
labels: feature, backend, frontend
assignees: ''
---

## Description
Implement a follow/unfollow system that allows users to follow other users and see content from users they follow in their feed.

## Acceptance Criteria
- [ ] Follow user endpoint (`POST /api/v1/users/:userId/follow`)
- [ ] Unfollow user endpoint (`DELETE /api/v1/users/:userId/follow`)
- [ ] Get followers list endpoint (`GET /api/v1/users/:userId/followers`)
- [ ] Get following list endpoint (`GET /api/v1/users/:userId/following`)
- [ ] Check follow status endpoint (`GET /api/v1/users/:userId/follow/status`)
- [ ] Update feed to prioritize followed users
- [ ] Follow button UI in mobile app

## Technical Details
- Prevent users from following themselves
- Prevent duplicate follow relationships
- Efficiently query followed users' posts
- Add follower/following counts to user profiles
- Implement optimistic UI updates

## API Endpoints
- `POST /api/v1/users/:userId/follow` - Follow a user
- `DELETE /api/v1/users/:userId/follow` - Unfollow a user
- `GET /api/v1/users/:userId/followers` - Get followers list
- `GET /api/v1/users/:userId/following` - Get following list
- `GET /api/v1/users/:userId/follow/status` - Check if following

## Database Changes
- Use existing Follow model
- Add indexes for performance
- Add followerCount and followingCount to User model

## Mobile UI
- Follow/Unfollow button on profiles
- Followers list screen
- Following list screen

## Resources
- [Social Graph Design Patterns](https://stackoverflow.com/questions/3066409/social-network-database-design)
