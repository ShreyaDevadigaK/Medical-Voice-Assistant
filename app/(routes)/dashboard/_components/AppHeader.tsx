"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const menuOptions = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "History", path: "/dashboard/history" },
  { id: 3, name: "Pricing", path: "/dashboard/billing" },
  { id: 4, name: "Profile", path: "/dashboard/profile" },
];

function AppHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-6 md:px-20 lg:px-40 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="MediVoice AI" width={160} height={80} className="object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuOptions.map((option) => {
            const isActive = pathname === option.path;
            return (
              <Link
                key={option.id}
                href={option.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {option.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:block text-sm text-gray-500">
              Hi, <span className="font-medium text-gray-800">{user.firstName}</span>
            </span>
          )}
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 ring-2 ring-blue-100 hover:ring-blue-300 transition-all",
              },
            }}
          />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          {menuOptions.map((option) => {
            const isActive = pathname === option.path;
            return (
              <Link
                key={option.id}
                href={option.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default AppHeader;
