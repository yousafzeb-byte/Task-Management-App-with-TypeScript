# 🚀 Quick Start Guide

Get up and running with the Task Management Application in **5 minutes**!

## Prerequisites

- Node.js 16+ installed
- Auth0 account (free tier is fine)

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Configure Auth0 (2 minutes)

### A. Create Auth0 Application

1. Go to [auth0.com](https://auth0.com) and sign up
2. Create a new "Single Page Application"
3. Name it "Task Manager"

### B. Configure URLs

In your Auth0 app settings:

- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`

### C. Get Credentials

Copy your:

- **Domain** (e.g., `dev-abc123.us.auth0.com`)
- **Client ID** (e.g., `Abc123XyzDefGhi456`)

## Step 3: Set Environment Variables (1 minute)

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your Auth0 credentials:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
```

## Step 4: Start the Application (1 minute)

```bash
npm run dev
```

Open your browser to: **http://localhost:5173**

## Step 5: Test It Out! ✅

1. Click "Login with Auth0"
2. Create a test account
3. Create your first task
4. Explore the features!

## 🎉 You're Done!

The application is now running with:

- ✅ Full task management
- ✅ Secure authentication
- ✅ Responsive design
- ✅ TypeScript type safety

## Next Steps

- **Read the docs**: Check out [README.md](README.md) for detailed information
- **Customize**: Update colors in `src/styles/globals.css`
- **Add features**: See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for code patterns
- **Deploy**: Build with `npm run build` and deploy to your hosting

## Common Issues

### "Port already in use"

```bash
npm run dev -- --port 3000
```

### Auth0 errors

- Check that URLs in Auth0 dashboard match exactly
- Verify `.env` file is in root directory
- Restart dev server after changing `.env`

### Missing dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

## Quick Commands Reference

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run type-check  # Check TypeScript types
npm run lint        # Run linting
```

## Need Help?

- 📖 **Full Setup Guide**: [SETUP.md](SETUP.md)
- 💻 **Code Reference**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- 🐛 **Issues**: Open an issue on GitHub
- 📧 **Support**: Contact the maintainers

---

**Happy Task Managing!** 📋✨
