# 🚀 ScrapeFlow: A Full Stack SaaS Course

Build a modern **workflow-based** web scraping SaaS with **Next.js**, **React**, **TypeScript**, **React Flow**, **Prisma**, and **React Query**. This project/course walks you through setting up authentication, crafting a workflow editor, connecting to databases, and ultimately providing a robust scraping automation platform for end users.

> **Note**: This README focuses on the project's initial setup and core workflow functionalities — covering everything from project configuration to workflow creation and editing.

---

## 🌟 Overview

**ScrapeFlow** is designed to help you learn how to:
- **Set up a Next.js project** with TypeScript for a powerful & typed React environment.
- **Integrate authentication** (e.g., via NextAuth) to secure your SaaS.
- **Leverage Prisma** as an ORM for database interactions (schema design, migrations, etc.).
- **Design dynamic workflows** with React Flow to visually represent scraping tasks and their connections.
- **Handle data fetching** and state management elegantly with React Query.

By the end of this course, you’ll have a firm grasp of how to build a production-ready SaaS with best practices for performance, security, and maintainability.

---

## ⚙️ Tech Stack

1. **Next.js**  
   - **Why?**: Provides a hybrid static & server-rendered environment, file-based routing, and built-in optimizations for performance. Great for quickly building and deploying full-stack applications.

2. **React & TypeScript**  
   - **Why?**: React’s component-based approach is perfect for modular UI development, and TypeScript adds static type checking for fewer runtime bugs and improved developer experience.

3. **React Flow**  
   - **Why?**: Perfect for creating drag-and-drop workflows with customizable nodes and edges. A great UI library for building a visual workflow editor.

4. **Prisma**  
   - **Why?**: A type-safe ORM that boosts developer productivity, offering easy data modeling and migration. Integrates seamlessly with TypeScript.

5. **React Query**  
   - **Why?**: Simplifies data fetching, caching, and state management. Reduces boilerplate and provides powerful features like refetching and intelligent cache management.

---

## 💻 Features Covered So Far

Below are the main milestones we tackle:

### 2️⃣ Project Setup
- **Initialize Next.js with TypeScript**: Start a new project with `create-next-app` to get the ball rolling.  
- **Install dependencies**: From React Flow to Prisma, ensure your environment is fully equipped.

### 3️⃣ Auth Setup
- **Secure your application**: Implement sign-in, sign-out, and protect routes so only authenticated users can access certain pages.  
- **User models with Prisma**: Tie authentication to a robust database model.

### 4️⃣ Database Setup
- **Configure Prisma**: Connect to a local or hosted database, run migrations, and set up your schema.  
- **Seeding**: Populate initial data or seed for testing.

---

## 🏁 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/scrapeflow.git
   cd scrapeflow

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


