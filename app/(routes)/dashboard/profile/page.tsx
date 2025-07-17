"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16 flex flex-col items-center justify-start">
      {/* Heading Section */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Your Profile
        </h1>
        <p className="text-lg text-gray-600">
          Manage your account, update settings, or sign out securely.
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Options
        </h2>
        <UserButton afterSignOutUrl="/" />
        <p className="text-sm text-gray-500 mt-4">
          Use the menu to update your profile or sign out.
        </p>
      </div>
    </div>
  );
}
