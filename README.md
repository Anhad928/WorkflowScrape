# 🚀 Workflow Scrape

Build a modern **workflow-based** web scraping SaaS with **Next.js**, **React**, **TypeScript**, **React Flow**, **Prisma**, and **React Query**. This project/course walks you through setting up authentication, crafting a workflow editor, connecting to databases, and ultimately providing a robust scraping automation platform for end users.

> **Note**: This README focuses on the project's initial setup and core workflow functionalities—covering everything from project configuration to workflow creation and editing. This is my JOURNEY!

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

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React Flow](https://img.shields.io/badge/React_Flow-0078D7?style=for-the-badge&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-0078D7?style=for-the-badge&logoColor=white)
![Cheerio js](https://img.shields.io/badge/Cheeriojs-F27102?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-3c11a2?style=for-the-badge)


---

## 🤔 Why This TechStack ????????

- **Next.js:** Balances server-side rendering (SSR) with static site generation (SSG), offering optimized performance and SEO benefits.
- **React & TypeScript:** A powerful combo for building robust, type-safe UIs with minimal runtime errors.
- **React Flow:** Perfect for visualizing node-based processes such as scraping workflows, data transformations, or automation pipelines.
- **Prisma:** Streamlines database operations with a type-safe, intuitive API, reducing common DB mistakes.
- **React Query:** Eliminates heavy lifting around async data fetching and caching, making your data layer more maintainable.

---

## 💻 Features Covered So Far

### Project Setup
- **Initialize Next.js with TypeScript**: Start a new project with `create-next-app` to get the ball rolling.  
- **Install dependencies**: From React Flow to Prisma, ensure your environment is fully equipped.

### Auth Setup
- **Secure your application**: Implement sign-in, sign-out, and protect routes so only authenticated users can access certain pages.  
- **User models with Prisma**: Tie authentication to a robust database model.

### Database Setup
- **Configure Prisma**: Connect to a local or hosted database, run migrations, and set up your schema.  
- **Seeding**: Populate initial data or seed for testing.

### Workflows Page
- **List workflows**: Show all available workflows for a user.  
- **CRUD operations**: Create, read, update, and delete workflows using React Query for data fetching.

### Workflow Card
- **Quick info**: Display the name, status, and other key metadata for each workflow.  
- **Link to edit**: A clickable card to jump into editing mode.

### Delete Workflow Dialog
- **Confirmation**: Avoid accidental deletions with a modal pop-up.  
- **UI feedback**: Show spinners or success/error messages.

### Workflow Introduction
- **Conceptual overview**: Understand nodes, edges, tasks, and how they form a workflow.  
- **Planning**: Discover how tasks connect to form a bigger scraping pipeline.

### Workflow Editor
- **Drag-and-drop**: Utilize React Flow to let users visually manage tasks and connections.  
- **Zoom & pan**: Navigate large workflows with an intuitive UI.

### Extract Text from Element Task
- **Scraping 101**: Demonstrate how to parse a webpage’s DOM.  
- **Task parameters**: Save selectors or special filters in your database.

### Node Component
- **Custom design**: A React component to render each “task node” in the workflow.  
- **Props & state**: Manage inputs/outputs via props for dynamic updates.

### Task/Node Inputs
- **Input structure**: Define how data flows in, ensuring the node can perform its job.  
- **Validation**: Check if all required fields (e.g., selectors) are provided.

### Save Button
- **Persist changes**: Commit the current workflow state to the server.  
- **Optimistic updates**: Provide instant UI feedback while saving in the background.

### Task Menu
- **Context menu**: Quickly add or configure tasks.  
- **Improved UX**: A polished menu for editing node details, naming tasks, etc.

### Task/Node Outputs
- **Data chaining**: Pass results from one task to the next.  
- **Edge definitions**: Outline what data points can connect to other nodes.

### Deletable Edge
- **Edit connections**: Remove unwanted links between nodes.  
- **Flexibility**: Let users rewire tasks as their scraping logic evolves.

### Connections Validation
- **Check compatibility**: Only connect outputs to matching inputs.  
- **Error handling**: Prevent invalid links or missing fields.

### Delete/Duplicate Task
- **Removal**: Get rid of tasks you no longer need.  
- **Duplication**: Clone tasks/nodes if you need a similar configuration in your workflow.

### Workflow Type
- **Multiple Categories**: Introduce different workflow types (scraping, data transformation, AI augmentation, etc.).  
- **Customization**: Vary parameters and settings based on the workflow type, offering flexible scenarios to end users.

### Workflow Execution Part 1
- **Initiate Workflow**: Start the execution from the editor or a dedicated button.  
- **Processing**: The system orchestrates tasks in sequence or parallel, logging progress and handling any errors.

### Workflow Validation/Execution
- **Validation**: Ensure each node is properly configured and that no critical connections are missing.  
- **Execution**: Trigger the actual pipeline once validation passes, providing real-time feedback or logs for each step.

### Workflow execution viewer
- Build a UI to visualize execution progress and logs.
- Provide real-time updates or job statuses.

### Workflow execution part 2
- Delve deeper into execution mechanics (parallel vs. sequential).
- Handle potential errors mid-workflow.

### Execution environment
- Discuss the runtime environment (Node.js, headless browser, etc.).
- Manage environment variables or user credentials securely.

### Workflow execution part 3
- Further refine the execution process, including timeouts or retries.
- Introduce advanced debugging or logging.

### Log collector 
- Create a system to collect logs from each task execution.
- Provide a more detailed debugging UI.

### Workflow execution viewer part 2 
- Expand on the viewer with filtering, sorting, or searching of logs.
- Improve user feedback and error messages.

---

## Set up environment variables 
- **Create a .env file with your database URL and other secrets.**
- **Example:**
  ```bash
  DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
  ```
  
---

## Database Migration
```bash
npx prisma migrate dev
```
- **This will sync your database schema.**

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


