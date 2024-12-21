"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Sign In with GitHub
      </button>
    </div>
  );
}
