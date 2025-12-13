---
name: Implement User Profiles
about: Add user profile viewing and editing capabilities
title: '[FEATURE] Implement User Profiles'
labels: feature, backend, frontend
assignees: ''
---

## Description
Create user profile functionality allowing users to view and edit their profiles, and view other users' profiles.

## Acceptance Criteria
- [ ] Get user profile endpoint (`GET /api/v1/users/:userId`)
- [ ] Update profile endpoint (`PUT /api/v1/users/me`)
- [ ] Upload avatar endpoint (`POST /api/v1/users/avatar`)
- [ ] User profile screen in mobile app
- [ ] Edit profile screen in mobile app
- [ ] Avatar image upload and display

## Technical Details
- Support profile fields: username, bio, avatar, location
- Implement file upload for avatars
- Image optimization and storage
- Validate file types and sizes
- Cache profile data appropriately

## API Endpoints
- `GET /api/v1/users/:userId` - Get user profile
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `POST /api/v1/users/avatar` - Upload avatar image

## Mobile Screens
- ProfileScreen - View any user's profile
- EditProfileScreen - Edit current user's profile
- Profile settings

## Database Changes
- Add bio, location, website fields to User model
- Store avatar URL

## Resources
- [File Upload Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
