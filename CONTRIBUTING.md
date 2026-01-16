# Contributing to Task Management Application

Thank you for your interest in contributing to the Task Management Application! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other contributors

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git
- Basic knowledge of React and TypeScript
- Auth0 account (for testing authentication features)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`
5. Start the development server:
   ```bash
   npm run dev
   ```

## Development Process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Branch

```bash
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in your feature branch
2. Follow the coding standards (see below)
3. Test your changes thoroughly
4. Run type checking: `npm run type-check`
5. Run linting: `npm run lint`
6. Commit your changes with clear commit messages

## Pull Request Process

1. **Update Documentation**: Update the README.md if you've made changes that affect usage
2. **Add Tests**: If applicable, add tests for new features
3. **Run Checks**: Ensure all type checks and linting pass
4. **Update Changelog**: Add your changes to CHANGELOG.md
5. **Create Pull Request**:
   - Use a clear and descriptive title
   - Reference any related issues
   - Provide a detailed description of changes
   - Include screenshots for UI changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

## Coding Standards

### TypeScript

- **Use Strict Mode**: Enable all strict type-checking options
- **Define Types**: Always define explicit types for function parameters and return values
- **Avoid `any`**: Use specific types or `unknown` instead
- **Use Interfaces**: Define interfaces for all data structures
- **Type Aliases**: Use type aliases for union types

Example:

```typescript
// Good
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

type TaskStatus = "pending" | "in-progress" | "completed";

function createTask(data: CreateTaskInput): Task {
  // Implementation
}

// Bad
function createTask(data: any): any {
  // Implementation
}
```

### React Components

- **Functional Components**: Use functional components with hooks
- **Props Typing**: Always type component props
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Avoid Prop Drilling**: Use Context API for global state

Example:

```typescript
// Good
interface Props {
  title: string;
  onSave: (data: TaskData) => void;
}

const TaskForm: React.FC<Props> = ({ title, onSave }) => {
  // Implementation
};

// Bad
const TaskForm = (props: any) => {
  // Implementation
};
```

### Styling

- **CSS Variables**: Use CSS custom properties for theming
- **BEM Naming**: Follow BEM-like naming conventions
- **Mobile First**: Design for mobile first, then scale up
- **Component Styles**: Keep styles modular with component-specific CSS files

Example:

```css
/* Good */
.task-card {
  /* styles */
}

.task-card__title {
  /* styles */
}

.task-card--active {
  /* styles */
}

/* Bad */
.taskCard {
  /* styles */
}

.TC {
  /* styles */
}
```

### File Organization

- **One Component Per File**: Each component should be in its own file
- **Named Exports**: Use named exports for components and utilities
- **Index Files**: Use index files to simplify imports
- **Consistent Naming**: Use PascalCase for components, camelCase for utilities

## Commit Messages

Follow the Conventional Commits specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
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
feat(tasks): add task filtering by priority

Add ability to filter tasks by priority level (low, medium, high, critical).
Includes UI updates and backend integration.

Closes #123

---

fix(auth): resolve login redirect issue

Fixed bug where users were not redirected to dashboard after successful login.
Issue was caused by incorrect callback URL handling.

Fixes #456

---

docs(readme): update installation instructions

Added detailed steps for Auth0 configuration and environment variable setup.
```

## Testing

### Manual Testing

Before submitting a PR, test the following:

1. **Core Functionality**:

   - Create, read, update, delete tasks
   - Filter and sort tasks
   - Authentication flow

2. **Responsive Design**:

   - Test on mobile, tablet, and desktop
   - Verify all UI elements are accessible

3. **Error Handling**:

   - Test form validation
   - Test error messages display correctly
   - Test edge cases

4. **TypeScript**:

   - Run `npm run type-check`
   - Verify no type errors

5. **Linting**:
   - Run `npm run lint`
   - Fix any linting issues

## Questions?

If you have questions or need help, feel free to:

- Open an issue
- Reach out to the maintainers
- Join our community discussions

Thank you for contributing! 🎉
