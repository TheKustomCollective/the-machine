# Contributing to The Machine

Thank you for your interest in contributing to The Machine AI Social Metaverse! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- PostgreSQL 14+ (optional for development)
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/the-machine.git
   cd the-machine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp apps/server/.env.example apps/server/.env
   cp apps/mobile/.env.example apps/mobile/.env
   # Edit .env files as needed
   ```

4. **Verify setup**
   ```bash
   # Build all packages
   npm run build
   
   # Start server
   npm run dev:server
   ```

## Development Process

### Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write code
   - Add tests (when applicable)
   - Update documentation

3. **Test your changes**
   ```bash
   # Build to check for TypeScript errors
   npm run build
   
   # Run tests (when available)
   npm test
   
   # Test manually
   npm run dev:server
   npm run dev:mobile
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a Pull Request on GitHub
   ```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` types - use `unknown` when type is truly unknown
- Use interfaces for object shapes
- Use types for unions and intersections

**Good:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User> {
  // Implementation
}
```

**Bad:**
```typescript
function getUser(id: any): any {
  // Implementation
}
```

### React Native

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

**Good:**
```typescript
interface UserCardProps {
  user: User;
  onPress: () => void;
}

export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
}
```

### Fastify

- Use async/await (avoid callbacks)
- Validate request schemas
- Use proper HTTP status codes
- Handle errors appropriately

**Good:**
```typescript
fastify.get('/users/:id', async (request, reply) => {
  const { id } = request.params;
  
  const user = await prisma.user.findUnique({
    where: { id }
  });
  
  if (!user) {
    return reply.status(404).send({
      error: 'User not found'
    });
  }
  
  return { data: user };
});
```

### General Guidelines

- **Naming Conventions**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and React components
  - `UPPER_SNAKE_CASE` for constants
  - Descriptive names (avoid abbreviations)

- **File Organization**:
  - One component/service per file
  - Group related files in folders
  - Use index files for exports

- **Comments**:
  - Write self-documenting code
  - Add comments for complex logic
  - Use JSDoc for public APIs

- **Imports**:
  - Group imports: external, internal, relative
  - Sort alphabetically within groups
  - No unused imports

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add JWT authentication
fix(mobile): resolve navigation crash on iOS
docs(readme): update installation instructions
refactor(server): extract user service
test(api): add tests for post endpoints
chore(deps): update dependencies
```

### Scope
- `server`: Backend changes
- `mobile`: Mobile app changes
- `shared`: Shared package changes
- `auth`: Authentication related
- `api`: API related
- `db`: Database related

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Ensure builds pass**
   ```bash
   npm run build
   ```

3. **Test thoroughly**
   - Manual testing
   - Automated tests (when available)

4. **Update documentation**
   - README if adding features
   - API docs if changing endpoints
   - Comments for complex code

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Built successfully
- [ ] Tested manually
- [ ] Added/updated tests

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, PR will be merged
4. Delete your feature branch

## Issue Guidelines

### Before Creating an Issue

1. Search existing issues
2. Check if it's already fixed
3. Reproduce the issue

### Issue Templates

We provide templates for:
- Bug reports
- Feature requests
- Questions

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., iOS, Android, macOS]
- Version: [e.g., 0.1.0]
- Node version: [e.g., 18.0.0]
```

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description

**Describe the solution**
What you want to happen

**Describe alternatives**
Alternative solutions considered

**Additional context**
Any other context
```

## Project-Specific Guidelines

### Working on the Server

- Use Prisma for database operations
- Add proper error handling
- Validate input with schemas
- Use environment variables for config
- Log appropriately

### Working on Mobile

- Test on both iOS and Android (if possible)
- Consider offline scenarios
- Handle loading states
- Provide user feedback
- Optimize performance

### Working on Shared

- Keep it minimal
- No platform-specific code
- Export types and utilities
- Document exports

## Code Review Guidelines

When reviewing code:

1. **Be respectful and constructive**
2. **Check for**:
   - Correctness
   - Performance
   - Security
   - Maintainability
   - Test coverage

3. **Ask questions** when unclear
4. **Suggest improvements** but don't demand perfection
5. **Approve** when satisfied

## Getting Help

- Check documentation first
- Search existing issues
- Ask in discussions
- Create a question issue

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Part of the community

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to The Machine! 🚀
