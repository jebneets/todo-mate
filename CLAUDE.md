# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Start Next.js development server
- **Build**: `npm run build` - Build production application  
- **Production start**: `npm start` - Start production server
- **Linting**: `npm run lint` - Run ESLint with Next.js config
- **Database seeding**: `npx prisma db seed` - Seed database using prisma/seed.ts

## Project Architecture

This is a Next.js 14 todo application with basic T3 Stack setup:

### Core Stack
- **Next.js 14** with App Router - Main framework
- **TypeScript** - Type safety with strict config
- **Tailwind CSS** - Styling with custom brand colors (`brand-blue: #4a69ff`, `brand-blue-light: #eef2ff`)
- **Prisma** - ORM with PostgreSQL database
- **NextAuth.js** - Authentication system (Discord OAuth)

### Project Structure
The project has a hybrid structure with both App Router and T3 Stack patterns:
```
├── src/app/                # T3 Stack App Router structure
│   ├── api/               # API routes (auth, tRPC)
│   ├── components/        # React components (Header, Sidebar, TaskCard)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main todo interface
├── src/server/            # T3 server-side code
│   ├── api/               # tRPC routers
│   ├── auth/              # NextAuth configuration
│   └── db.ts              # Prisma client
├── src/trpc/              # tRPC client configuration
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding script
└── lib/                   # Utility libraries and mock data
```

### Database Schema
Prisma schema with PostgreSQL includes:
- **NextAuth.js models**: User (CUID), Account, Session, VerificationToken
- **Task management**: TaskList (UUID), Task (UUID) with priority, due dates, completion status
- **Posts system**: Post model for additional content
- **Relationships**: Users own TaskLists, TaskLists contain Tasks

### Key Configurations
- **Path aliases**: `@/*` maps to project root, `~/*` maps to src directory
- **Image domains**: `i.imgur.com` allowed for remote images
- **Tailwind**: Custom brand colors configured
- **TypeScript**: Strict mode enabled with ES5 target

### Authentication Setup
- **NextAuth.js** with Discord OAuth provider
- Environment variables needed: `AUTH_SECRET`, `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`, `DATABASE_URL`
- Authentication routes at `/api/auth/*`
- Prisma adapter for session management

### Development Notes
- Project uses T3 Stack patterns but appears to be in development/prototype phase
- Mock data available in `lib/mockData.ts` for development
- Database uses UUID for TaskList/Task IDs, CUID for User-related models
- Both `/app` and `/src/app` directories exist - `/src/app` contains the active implementation