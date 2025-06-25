# TaskGen - AI-Powered Task Management

A full-stack task management application that uses AI to generate actionable tasks and helps you track your progress.

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Download and Extract**
   - Download the project ZIP file
   - Extract to your desired directory

2. **Install Dependencies**
   \`\`\`bash
   cd taskgen-app
   npm install
   \`\`\`

3. **Environment Setup**
   - The `.env.local` file is already configured with demo keys
   - No additional setup required for local development

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open Application**
   - Visit `http://localhost:3000`
   - You can sign up/sign in or try the demo mode

## 🎯 Features

- **AI Task Generation**: Generate 5 actionable tasks from any topic
- **Complete CRUD**: Create, read, update, delete tasks
- **Progress Tracking**: Visual progress bars and statistics
- **User Authentication**: Secure login with Clerk
- **Responsive Design**: Works on desktop and mobile
- **Demo Mode**: Try without signing up

## 🔧 Usage

1. **Sign Up/Sign In**: Create an account or use demo mode
2. **Generate Tasks**: Enter a topic (e.g., "Learn Python") and get AI-generated tasks
3. **Manage Tasks**: Edit, delete, or mark tasks as complete
4. **Track Progress**: View your completion statistics and category breakdown

## 📁 Project Structure

\`\`\`
taskgen-app/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── demo/           # Demo mode pages
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── ui/            # ShadCN UI components
│   ├── task-generator.tsx
│   ├── task-list.tsx
│   └── task-stats.tsx
├── .env.local         # Environment variables
└── package.json       # Dependencies
\`\`\`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Authentication**: Clerk
- **State Management**: React hooks
- **Icons**: Lucide React

## 🔑 Environment Variables

The `.env.local` file includes demo keys that work out of the box. For production:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Replace the demo keys with your actual keys

## 📝 Notes

- Currently uses mock AI responses (Gemini API integration ready)
- Data is stored in memory (ready for database integration)
- Designed for easy backend integration with Express.js + PostgreSQL

## 🚀 Next Steps

- Set up Express.js backend with PostgreSQL
- Integrate real Google Gemini API
- Deploy to production
