"use client";

import { FeatureBentoGrid } from "@/_components/FeatureBentoGrid";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSectionOne() {
  return (
    <div className="relative my-10 flex flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"🧠 Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          With AI, you can launch your website in hours, not days. Try our best
          in class, state of the art, cutting edge AI tools to get your website
          up.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Link href="/sign-in" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 flex items-center justify-center gap-2">
              Start Building Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-200/50 bg-white/40 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-10 bottom-0 h-40 mt-auto" />
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative">
            <img
              src="/landing.jpeg"
              alt="Dashboard interface"
              className="w-full h-auto object-cover transform transition-transform hover:scale-[1.02] duration-700"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full bg-white dark:bg-slate-850">
        <FeatureBentoGrid />
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">MediVoice AI</h1>
      </div>
      {!user ? (
        <Link href={"./sign-in"}>
          <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <Button 
            className="rounded-lg bg-black text-white hover:bg-gray-800 font-medium px-4 py-2 transition-all"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
          <div className="flex items-center justify-center">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-10 rounded-full border border-gray-200 shadow-sm",
                },
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
