# AI Medical Voice Agent

This is a Next.js-based AI Medical Voice Agent designed to assist with health queries and patient session management.

## 🌐 Live Demo
https://medical-voice-assistant-two.vercel.app/

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
