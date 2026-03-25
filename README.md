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

## 🛠 Tech Stack
- **Framework**: Next.js 15
- **Auth**: Clerk
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Voice Agent**: Vapi AI
- **AI Models**: OpenRouter (Gemini / OpenAI)
- **Styling**: Tailwind CSS v4, Lucide Icons, Shadcn/UI, Tabler Icons.
- **Animations**: Framer Motion, tw-animate-css.
