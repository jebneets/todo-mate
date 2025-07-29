# Task List Application - Requirements Document

## Project Overview

The Task List Application is a modern, collaborative task management tool built with **Next.js** and backed by a **PostgreSQL** database. Users will be able to create multiple task lists, manage tasks with due dates and icons, and view their productivity on a dashboard. The application will support user authentication and provide a clean, responsive interface designed from custom UI prototypes.

---

## Technology Stack

- **Frontend:** Next.js, Tailwind CSS (optional)
- **Backend:** Next.js API Routes / Node.js
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js or Auth.js
- **ORM/Query Builder:** Prisma (preferred)
- **Deployment:** Vercel / Docker (optional)
- **Design:** Custom prototypes from the design team

---

## Core Features

### 1. User Authentication
- Secure sign-up, login, and logout
- OAuth providers (e.g., Google, GitHub) via NextAuth.js
- Password reset functionality
- Account management (change email, password)

### 2. Task Lists
- Create, rename, delete multiple task lists per user
- Assign icons to each list (from a predefined set)
- Drag and drop reordering (optional feature)

### 3. Tasks
- Add, edit, delete tasks within a list
- Due date (with calendar picker)
- Completion status toggle
- Optional notes field
- Task priority (low, medium, high)

### 4. Dashboard
- Summary of all lists with stats:
  - Completed vs pending tasks
  - Upcoming deadlines
  - Most active lists
- Filter by list, due date, priority
- Visual charts (optional)

---

## Roles and Responsibilities by Skill Set

### 🧑‍💻 Frontend Developers
- Implement responsive UI based on prototype
- Build pages:
  - Sign up / Login
  - Task List Overview
  - Task List Detail
  - Dashboard
  - Settings
- Integrate icon selector, calendar input, and drag-drop UI (e.g., `react-beautiful-dnd`)
- State management (e.g., React Context or Zustand)
- Handle client-side validation and error feedback

### 🧑‍🔧 Backend Developers
- Design and implement API routes (RESTful or tRPC)
- Implement user session handling and middleware
- Create endpoints for:
  - Task CRUD
  - Task List CRUD
  - Dashboard metrics
- Enforce ownership/permissions at API layer

### 🧑‍💻 Fullstack / DB Developers
- Define PostgreSQL schema
- Set up Prisma models and migrations
- Implement relations:
  - `User -> TaskList (1:N)`
  - `TaskList -> Task (1:N)`
- Handle indexing for performance (e.g., due dates, createdAt)
- Seed test data for development

### 🧑‍🎨 Designers
- Create and iterate on UI wireframes and mockups
- Deliver mobile-first, responsive designs
- Define icon set for task list types
- Collaborate with devs on usability feedback
- Provide dark mode/light mode variants (optional)

---

## Database Schema (Simplified)

```sql
User
- id (PK)
- name
- email (unique)
- passwordHash
- createdAt

TaskList
- id (PK)
- userId (FK -> User)
- name
- icon
- createdAt

Task
- id (PK)
- taskListId (FK -> TaskList)
- title
- notes
- dueDate
- isComplete (boolean)
- priority (enum: low | medium | high)
- createdAt
