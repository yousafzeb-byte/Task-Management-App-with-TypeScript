# Quick Reference Guide

A quick reference for common tasks and patterns in the Task Management Application.

## Table of Contents

- [Project Commands](#project-commands)
- [Component Patterns](#component-patterns)
- [TypeScript Types](#typescript-types)
- [Context API Usage](#context-api-usage)
- [Custom Hooks](#custom-hooks)
- [Styling Guidelines](#styling-guidelines)
- [Common Tasks](#common-tasks)

## Project Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run type-check       # TypeScript type checking
npm run lint             # Run ESLint

# Dependencies
npm install              # Install dependencies
npm update               # Update dependencies
```

## Component Patterns

### Functional Component with TypeScript

```typescript
import React from "react";

interface Props {
  title: string;
  count: number;
  onAction: (id: string) => void;
}

const MyComponent: React.FC<Props> = ({ title, count, onAction }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={() => onAction("123")}>Action</button>
    </div>
  );
};

export default MyComponent;
```

### Component with State

```typescript
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
    </form>
  );
};
```

## TypeScript Types

### Common Type Definitions

```typescript
// Task types
type TaskStatus = "pending" | "in-progress" | "completed" | "on-hold";
type TaskPriority = "low" | "medium" | "high" | "critical";

// Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: string[];
}

// Input types
interface CreateTaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
}

interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}

// Validation
interface ValidationError {
  field: string;
  message: string;
}
```

### Type Guards

```typescript
function isTaskStatus(value: string): value is TaskStatus {
  return ["pending", "in-progress", "completed", "on-hold"].includes(value);
}

function isValidTask(task: any): task is Task {
  return (
    typeof task === "object" &&
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    isTaskStatus(task.status)
  );
}
```

## Context API Usage

### Using TaskContext

```typescript
import { useTaskContext } from "../context/TaskContext";

const MyComponent: React.FC = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    loading,
    error,
  } = useTaskContext();

  const handleCreate = (data: CreateTaskInput) => {
    addTask(data);
  };

  const handleUpdate = (id: string, updates: UpdateTaskInput) => {
    updateTask(id, updates);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};
```

### Using AuthContext

```typescript
import { useAuthContext } from "../context/AuthContext";

const MyComponent: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Custom Hooks

### useTaskFiltering

```typescript
import { useTaskFiltering } from "../hooks/useTasks";

const MyComponent: React.FC = () => {
  const { tasks } = useTaskContext();

  const {
    filteredTasks,
    statusFilter,
    priorityFilter,
    searchQuery,
    applyFilters,
    handleStatusFilter,
    handlePriorityFilter,
    handleSearchQuery,
    clearFilters,
  } = useTaskFiltering(tasks);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
      />
      <button onClick={applyFilters}>Apply</button>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};
```

### useTaskStats

```typescript
import { useTaskStats } from "../hooks/useTasks";

const StatsComponent: React.FC = () => {
  const { tasks } = useTaskContext();
  const stats = useTaskStats(tasks);

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Completion: {stats.completionPercentage}%</p>
    </div>
  );
};
```

## Styling Guidelines

### CSS Variables

```css
/* Using CSS variables */
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

/* Available variables */
--primary-color
--secondary-color
--success-color
--danger-color
--warning-color
--info-color

--bg-primary
--bg-secondary
--bg-tertiary

--text-primary
--text-secondary
--text-tertiary

--spacing-xs (4px)
--spacing-sm (8px)
--spacing-md (16px)
--spacing-lg (24px)
--spacing-xl (32px)

--border-radius (8px)
--box-shadow
--box-shadow-lg
```

### Component Styles

```css
/* Component-specific styles */
.task-card {
  /* Base styles */
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
}

.task-card__title {
  /* Element styles */
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.task-card--active {
  /* Modifier styles */
  border: 2px solid var(--primary-color);
}
```

### Responsive Design

```css
/* Mobile first approach */
.component {
  /* Mobile styles (default) */
  padding: 8px;
}

@media (min-width: 768px) {
  /* Tablet styles */
  .component {
    padding: 16px;
  }
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .component {
    padding: 24px;
  }
}
```

## Common Tasks

### Adding a New Task Property

**1. Update Type Definition** (`src/types/index.ts`):

```typescript
interface Task {
  // ... existing properties
  assignee?: string; // New property
}
```

**2. Update Validation** (`src/utils/validation.ts`):

```typescript
if (input.assignee && input.assignee.length > 100) {
  errors.push({
    field: "assignee",
    message: "Assignee name too long",
  });
}
```

**3. Update Form** (`src/components/TaskForm.tsx`):

```typescript
<input name="assignee" value={formValues.assignee} onChange={handleChange} />
```

**4. Update Display** (`src/components/TaskCard.tsx`):

```typescript
{
  task.assignee && <p>Assigned to: {task.assignee}</p>;
}
```

### Adding a New Filter

**1. Update Filter Type** (`src/types/index.ts`):

```typescript
interface TaskFilter {
  // ... existing filters
  assignee?: string;
}
```

**2. Update Hook** (`src/hooks/useTasks.ts`):

```typescript
if (assigneeFilter && assigneeFilter !== "all") {
  filtered = filtered.filter((task) => task.assignee === assigneeFilter);
}
```

**3. Update UI** (`src/components/TaskFilter.tsx`):

```typescript
<select onChange={handleAssigneeChange}>
  <option value="all">All Assignees</option>
  {/* ... options */}
</select>
```

### Creating a New Page

**1. Create Page Component** (`src/pages/NewPage.tsx`):

```typescript
import React from "react";
import "../styles/NewPage.css";

const NewPage: React.FC = () => {
  return (
    <div className="new-page">
      <h1>New Page</h1>
      {/* Content */}
    </div>
  );
};

export default NewPage;
```

**2. Add Styles** (`src/styles/NewPage.css`):

```css
.new-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}
```

**3. Update App Router** (`src/App.tsx`):

```typescript
{
  appState.currentPage === "newpage" && <NewPage />;
}
```

### Error Handling Pattern

```typescript
try {
  // Operation
  const result = await someOperation();
  // Success handling
} catch (error) {
  // Error handling
  const err = error as Error;
  setError(err.message || "Operation failed");
  console.error("Error:", err);
}
```

### Form Validation Pattern

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validate
  const errors = validateInput(formData);

  if (errors.length > 0) {
    setErrors(errors);
    return;
  }

  // Submit
  onSubmit(formData);
};
```

## File Structure Quick Reference

```
src/
├── components/          # Reusable components
├── pages/               # Page components
├── context/             # React Context
├── hooks/               # Custom hooks
├── types/               # TypeScript types
├── utils/               # Utility functions
├── styles/              # CSS files
├── App.tsx              # Main app
└── main.tsx             # Entry point
```

## Environment Variables

```env
# Development
VITE_AUTH0_DOMAIN=dev-xxx.auth0.com
VITE_AUTH0_CLIENT_ID=xxx
VITE_APP_NAME=Task Manager

# Production
VITE_AUTH0_DOMAIN=prod-xxx.auth0.com
VITE_AUTH0_CLIENT_ID=yyy
VITE_APP_NAME=Task Manager
```

## Useful VS Code Extensions

- ESLint
- Prettier
- TypeScript Error Translator
- Auto Rename Tag
- Path Intellisense
- CSS Peek

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, then commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

## Debugging Tips

```typescript
// Console logging with types
console.log("Task:", task);
console.table(tasks);

// Debugging state
useEffect(() => {
  console.log("State changed:", state);
}, [state]);

// Type checking at runtime
if (process.env.NODE_ENV === "development") {
  console.assert(typeof task.id === "string", "Task ID must be string");
}
```

---

**Need more help?** Check the full documentation in README.md or SETUP.md.
