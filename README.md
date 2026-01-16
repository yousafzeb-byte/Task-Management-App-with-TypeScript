# Task Management Application

A comprehensive task management web application built with **React**, **TypeScript**, **Vite**, and **Auth0** authentication. This project demonstrates modern web development practices with type-safe code, state management, and secure authentication.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat&logo=auth0&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [TypeScript Features](#typescript-features)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Task Management

- **Create Tasks**: Create new tasks with title, description, priority, due date, and tags
- **Edit Tasks**: Update existing task information
- **Delete Tasks**: Remove tasks you no longer need
- **Task Status**: Track task progress (Pending, In Progress, On Hold, Completed)
- **Priority Levels**: Organize tasks by priority (Low, Medium, High, Critical)
- **Tags**: Categorize tasks with custom tags

### Dashboard

- **Task Statistics**: View comprehensive task metrics and completion progress
- **Task Filtering**: Filter tasks by status, priority, and search query
- **Task Sorting**: Sort tasks by due date, priority, or status
- **Responsive Grid**: Modern card-based task display
- **Task Details**: View detailed information for each task

### Authentication & Authorization

- **Auth0 Integration**: Secure user authentication
- **Protected Routes**: Access control for authenticated users
- **User Profile**: Display user information and avatar

### Error Handling & Validation

- **Form Validation**: Client-side validation with TypeScript types
- **Error Messages**: Clear, user-friendly error feedback
- **Type Safety**: Full TypeScript coverage for data validation

## 🛠 Technologies Used

### Core Technologies

- **React 19.2** - Modern React with hooks and functional components
- **TypeScript 5.9** - Type-safe JavaScript for robust code
- **Vite 7.3** - Next-generation frontend build tool
- **Auth0 React SDK 2.2** - Authentication and authorization

### State Management

- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic
- **TypeScript Interfaces** - Type-safe state definitions

### Styling

- **CSS3** - Modern CSS with custom properties
- **Responsive Design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

## 📁 Project Structure

````
## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Auth0 Documentation](https://auth0.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`

4. **Update Environment Variables**
   Edit the `.env` file with your Auth0 credentials:
   ```env
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id-here
   VITE_AUTH0_AUDIENCE=https://your-api-audience.com
````

### TypeScript Configuration

The project uses strict TypeScript settings for maximum type safety:

dueDate: string;
createdAt: string;
updatedAt: string;
userId: string;
tags: string[];
}

// Type aliases for better type safety
type TaskStatus = "pending" | "in-progress" | "completed" | "on-hold";
type TaskPriority = "low" | "medium" | "high" | "critical";

````

### Validation

Form validation is implemented with TypeScript:

- Type-safe validation functions
- Comprehensive error handling
- Runtime type checking

## 🔐 State Management

### Context API

The application uses React Context for global state management:

**TaskContext**: Manages task data and operations

- Task CRUD operations
- Task filtering
- Error handling

**AuthContext**: Manages authentication state

- User authentication status
- User profile data
- Login/logout operations

### Custom Hooks

Reusable hooks for common operations:

- `useTaskFiltering`: Filter tasks by various criteria
- `useSortedTasks`: Sort tasks by different attributes
- `useTaskStats`: Calculate task statistics
- `useTaskForm`: Handle form state and validation

## 🔒 Authentication

### Auth0 Integration

The application uses Auth0 for secure authentication:

**Features**:

- Social login support (Google, GitHub, etc.)
- Email/password authentication
- Multi-factor authentication (MFA) support
- Secure token management
- Automatic session refresh

**Protected Routes**:
All main application routes require authentication. Unauthenticated users are redirected to the login page.

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers (1024px and up)
- Tablets (768px - 1023px)
- Mobile devices (320px - 767px)

## 🧪 Scripts

```bash
# Development
npm run dev              # Start development server

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Type Checking
npm run type-check       # Run TypeScript type checking

# Linting
npm run lint             # Run ESLint
````

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Yousaf Zeb

- GitHub: [@yousafzeb-byte](https://github.com/yousafzeb-byte)

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Auth0 Documentation](https://auth0.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
