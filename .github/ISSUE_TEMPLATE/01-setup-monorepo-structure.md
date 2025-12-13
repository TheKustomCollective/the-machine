---
name: Setup Monorepo Structure
about: Initialize the monorepo with proper workspace configuration
title: '[SETUP] Initialize Monorepo Structure'
labels: setup, infrastructure
assignees: ''
---

## Description
Set up a monorepo structure using npm workspaces (or pnpm/yarn) to organize the AI Social Metaverse application into multiple packages.

## Acceptance Criteria
- [ ] Root `package.json` configured with workspaces
- [ ] Directory structure created:
  - `apps/server` - Backend API server
  - `apps/mobile` - React Native mobile app
  - `packages/shared` - Shared code and types
- [ ] Basic `.gitignore` configured for Node.js projects
- [ ] Each workspace has its own `package.json`

## Technical Details
- Use npm workspaces or equivalent
- Ensure proper TypeScript path mappings for cross-package imports
- Set up consistent Node.js version requirements

## Resources
- [npm workspaces documentation](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
