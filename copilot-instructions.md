# GitHub Copilot Instructions for Task Management Application

## Project Overview

This is a TypeScript-based Task Management Application built with React, Vite, and Auth0 authentication. The project demonstrates modern web development practices with type-safe code, state management using Context API, and comprehensive error handling.

## Technology Stack

- **Frontend**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Authentication**: Auth0 React SDK 2.2
- **State Management**: React Context API with custom hooks
- **Styling**: CSS3 with custom properties (CSS variables)

## Project Architecture

### Component Structure

- **Pages**: High-level page components (Dashboard, CreateEditTask, TaskDetails, Login)
- **Components**: Reusable UI components (TaskCard, TaskForm, TaskFilter, TaskStats, AuthStatus, TaskDetails)
- **Context**: Global state management (TaskContext, AuthContext)
- **Hooks**: Custom React hooks for reusable logic (useTasks.ts)
- **Types**: TypeScript interfaces and type definitions (types/index.ts)
- **Utils**: Utility functions for validation and data processing

### Key Features

1. **Task Management**: Create, read, update, and delete tasks with full CRUD operations
2. **Task Filtering**: Filter tasks by status, priority, and search query
3. **Task Statistics**: Display comprehensive task metrics and progress
4. **Authentication**: Secure Auth0 integration with protected routes
5. **Validation**: Client-side form validation with TypeScript types
6. **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Development Guidelines

### TypeScript Best Practices

- Always use strict TypeScript settings
- Define interfaces for all data structures
- Use type aliases for union types (e.g., TaskStatus, TaskPriority)
- Avoid using `any` type; prefer `unknown` or specific types
- Implement proper error handling with typed catch blocks

### React Best Practices

- Use functional components with hooks
- Implement proper component prop typing with TypeScript interfaces
- Use Context API for global state management
- Create custom hooks for reusable stateful logic
- Implement proper error boundaries and fallbacks

### State Management

- TaskContext manages all task-related state and operations
- AuthContext manages authentication state and user information
- Use custom hooks (useTasks, useTaskFiltering, etc.) for complex state logic
- Keep component state local when possible

### Styling Conventions

- Use CSS custom properties (variables) for consistent theming
- Follow BEM-like naming conventions for CSS classes
- Keep styles modular with component-specific CSS files
- Ensure responsive design for mobile, tablet, and desktop

## Code Patterns

### Context Provider Pattern

```typescript
const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<Props> = ({ children }) => {
  // State and logic
  const value: MyContextType = {
    /* ... */
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used within MyProvider");
  return context;
};
```

### Custom Hook Pattern

```typescript
export const useCustomHook = (dependencies) => {
  const [state, setState] = useState(initialState);

  const action = useCallback(() => {
    // Logic
  }, [dependencies]);

  return { state, action };
};
```

### Form Validation Pattern

```typescript
export const validateInput = (input: Input): ValidationError[] => {
  const errors: ValidationError[] = [];
  // Validation logic
  return errors;
};
```

## Common Tasks

### Adding a New Task Property

1. Update the `Task` interface in `src/types/index.ts`
2. Update validation functions in `src/utils/validation.ts`
3. Update TaskForm component to include new field
4. Update TaskCard and TaskDetails components to display new property
5. Update CSS styles as needed

### Adding a New Filter

1. Add filter property to `TaskFilter` interface in `src/types/index.ts`
2. Update `useTaskFiltering` hook in `src/hooks/useTasks.ts`
3. Update TaskFilter component to include new filter control
4. Update filter application logic in the hook

### Modifying Authentication

1. Update Auth0 configuration in `src/main.tsx`
2. Modify AuthContext in `src/context/AuthContext.tsx`
3. Update environment variables in `.env`
4. Update Auth0 dashboard settings

## Testing Considerations

- Test all TypeScript types are correctly defined
- Verify form validation works for all edge cases
- Test responsive design on multiple screen sizes
- Verify Auth0 authentication flow
- Test task CRUD operations
- Verify error handling and error messages

## Environment Variables

Required environment variables:

- `VITE_AUTH0_DOMAIN`: Auth0 domain
- `VITE_AUTH0_CLIENT_ID`: Auth0 client ID
- `VITE_AUTH0_AUDIENCE`: Auth0 API audience (optional)

## Build and Deployment

- Development: `npm run dev`
- Production build: `npm run build`
- Type checking: `npm run type-check`
- Linting: `npm run lint`
- Preview production build: `npm run preview`

## Common Issues and Solutions

### Auth0 Configuration

- Ensure callback URLs are correctly configured in Auth0 dashboard
- Verify environment variables are set correctly
- Check that Auth0 application type is "Single Page Application"

### TypeScript Errors

- Run `npm run type-check` to identify type errors
- Ensure all components have proper prop types
- Verify context providers are used correctly

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Verify all imports are correct and files exist

## Project Maintenance

- Keep dependencies updated regularly
- Follow semantic versioning for releases
- Document all major changes in CHANGELOG
- Maintain comprehensive README with setup instructions
- Ensure TypeScript strict mode is enabled
- Run linter before commits

## Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components follow React best practices
- [ ] Error handling is implemented
- [ ] Validation is thorough and user-friendly
- [ ] Responsive design works on all screen sizes
- [ ] Code is well-documented with comments
- [ ] No console errors or warnings
- [ ] Authentication works correctly
- [ ] All features are tested manually

## Future Enhancements

- Add backend API integration
- Implement task collaboration features
- Add file attachments to tasks
- Implement task notifications
- Add task templates
- Implement task search with autocomplete
- Add task export functionality (CSV, PDF)
- Implement task recurrence
- Add dark mode support
