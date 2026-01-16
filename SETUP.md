# Setup Guide - Task Management Application

This guide will walk you through setting up the Task Management Application on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Auth0 Configuration](#auth0-configuration)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16 or higher

  - Check version: `node --version`
  - Download from: [nodejs.org](https://nodejs.org/)

- **npm**: Usually comes with Node.js

  - Check version: `npm --version`

- **Git**: For cloning the repository

  - Check version: `git --version`
  - Download from: [git-scm.com](https://git-scm.com/)

- **Text Editor**: VS Code recommended
  - Download from: [code.visualstudio.com](https://code.visualstudio.com/)

## Installation

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/yourusername/task-management-app.git

# Navigate to project directory
cd task-management-app
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:

- React and React DOM
- TypeScript
- Vite
- Auth0 React SDK
- Development tools and type definitions

### Step 3: Verify Installation

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint
```

Both commands should complete without errors.

## Auth0 Configuration

Auth0 is used for user authentication. Follow these steps to set it up:

### Step 1: Create Auth0 Account

1. Go to [auth0.com](https://auth0.com/)
2. Click "Sign Up" and create a free account
3. Complete the registration process

### Step 2: Create Application

1. Log in to your Auth0 Dashboard
2. Navigate to **Applications** → **Applications**
3. Click **Create Application**
4. Enter application name: "Task Management App"
5. Select **Single Page Web Applications**
6. Choose **React** as the technology
7. Click **Create**

### Step 3: Configure Application Settings

In your Auth0 application settings, configure the following:

#### Application URIs

For **Development**:

```
Allowed Callback URLs:
http://localhost:5173

Allowed Logout URLs:
http://localhost:5173

Allowed Web Origins:
http://localhost:5173
```

For **Production** (when deployed):

```
Allowed Callback URLs:
https://yourdomain.com

Allowed Logout URLs:
https://yourdomain.com

Allowed Web Origins:
https://yourdomain.com
```

#### Application Type

- Ensure "Application Type" is set to **Single Page Application**
- Token Endpoint Authentication Method: **None**

#### Advanced Settings (Optional)

Under **Advanced Settings** → **OAuth**:

- JsonWebToken Signature Algorithm: **RS256**
- OIDC Conformant: **Enabled**

### Step 4: Get Credentials

From your Auth0 application page, note down:

- **Domain** (e.g., `dev-abc123.us.auth0.com`)
- **Client ID** (e.g., `Abc123XyzDefGhi456`)

## Environment Variables

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

### Step 2: Update Environment Variables

Open `.env` in your text editor and update with your Auth0 credentials:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_AUDIENCE=https://your-api-audience.com  # Optional

# Application Configuration
VITE_APP_NAME=Task Management Application
VITE_API_URL=http://localhost:3001/api  # For future backend
```

### Important Notes

- **Replace** `your-domain.auth0.com` with your actual Auth0 domain
- **Replace** `your-client-id-here` with your actual Auth0 Client ID
- The `.env` file is **gitignored** - never commit it to version control
- Environment variables must start with `VITE_` to be accessible in the app

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:

- Local: http://localhost:5173/
- Network: Use `--host` flag to expose to network

### Build for Production

Create a production build:

```bash
npm run build
```

Built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Additional Scripts

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:

```bash
# Kill the process using the port (Windows)
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

#### 2. Auth0 Configuration Error

**Error**: `Invalid callback URL` or `Cross origin authentication` errors

**Solution**:

- Verify callback URLs in Auth0 dashboard match exactly (including protocol and port)
- Check that environment variables are set correctly
- Ensure `.env` file is in the root directory
- Restart the dev server after changing `.env`

#### 3. Module Not Found Errors

**Error**: `Cannot find module '@auth0/auth0-react'`

**Solution**:

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. TypeScript Errors

**Error**: Type errors when running the app

**Solution**:

```bash
# Run type checking
npm run type-check

# Check tsconfig.json is correct
# Ensure all @types/* packages are installed
```

#### 5. Vite Cache Issues

**Error**: Stale imports or unexpected behavior

**Solution**:

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Getting Help

If you encounter issues not covered here:

1. **Check the Console**: Browser console and terminal output often show detailed errors
2. **Review Auth0 Logs**: Auth0 Dashboard → Monitoring → Logs
3. **Search Issues**: Check GitHub issues for similar problems
4. **Open an Issue**: Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

## Next Steps

### 1. Test Authentication

1. Open the application in your browser
2. Click "Login with Auth0"
3. Create a test account or sign in
4. Verify you're redirected back to the dashboard

### 2. Explore Features

Try out the application features:

- ✅ Create a new task
- ✅ Edit an existing task
- ✅ Filter and search tasks
- ✅ Change task status
- ✅ View task statistics

### 3. Customize

Make the application your own:

- Update colors in `src/styles/globals.css`
- Modify task fields in `src/types/index.ts`
- Add new features using the component patterns
- Update branding and text

### 4. Development Workflow

Recommended workflow:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run type checking: `npm run type-check`
4. Run linting: `npm run lint`
5. Test thoroughly
6. Commit with clear messages
7. Push and create a pull request

### 5. Deploy to Production

When ready to deploy:

1. **Update Environment Variables**: Set production Auth0 URLs
2. **Build**: `npm run build`
3. **Test**: `npm run preview`
4. **Deploy**: Upload `dist` folder to your hosting provider

Popular hosting options:

- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting for static sites
- **AWS S3 + CloudFront**: Scalable cloud hosting

### 6. Backend Integration (Future)

To add backend functionality:

1. Set up a backend API (Node.js, Python, etc.)
2. Update `VITE_API_URL` environment variable
3. Modify context files to use API endpoints
4. Add axios calls in service functions
5. Handle authentication tokens

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite Guide](https://vitejs.dev/guide/)
- [Auth0 React Quickstart](https://auth0.com/docs/quickstart/spa/react)
- [MDN Web Docs](https://developer.mozilla.org/)

## Support

For support:

- 📧 Email: support@example.com
- 💬 Discord: [Join our community]
- 📝 GitHub Issues: [Create an issue]
- 📖 Documentation: [Read the docs]

---

**Congratulations!** 🎉 You've successfully set up the Task Management Application. Happy coding!
