# AI Medical Voice Agent

This is a Next.js-based AI Medical Voice Agent designed to assist with health queries and patient session management.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (Neon PostgreSQL)
DATABASE_URL=your_neon_db_url

# AI APIs
OPEN_ROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=your_vapi_assistant_id
```
Refer to `.env.example` for the template.

### 3. Setup Database Tables
Run the following command to push your schema to Neon:
```bash
npx drizzle-kit push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Core Features
- **🎙️ Real-time AI Voice Agent**: Powered by Vapi and Deepgram (Nova-2) for ultra-fast, reliable conversational health consultations.
- **📋 Automated Medical Reports**: Safely extracts clinical data from voice transcripts to generate instantly accessible medical summaries.
- **📄 PDF Export**: Users can easily download their generated medical reports as clean, formatted PDF documents.
- **🎨 Premium UI/UX**: Built with Framer Motion, styled with Aceternity UI, featuring frosted-glass dash headers, dynamic bento-grid layouts, and interactive premium components.
- **🗄️ Scalable Architecture**: Robust serverless database powered by Neon Postgres and Drizzle ORM, with perfectly decoupled storage for raw conversations and parsed medical reports.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk
- **Database**: Neon (Serverless PostgreSQL) + Drizzle ORM
- **Voice AI**: Vapi / Deepgram Nova-2
- **LLMs**: OpenRouter (OpenAI, Gemini)
- **Styling**: Tailwind CSS, Shadcn UI, Aceternity UI
- **PDF Generation**: `jspdf` & `html2canvas`
- **Animations**: Framer Motion
