"use client";

// Third party imports
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

export default function AuthFormClient({ mode }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form
      action="/"
      className="flex flex-col justify-start gap-7 mt-14 md:mt-13"
    >
      {mode === "signup" && (
        <div className="flex flex-col relative gap-3">
          <label
            htmlFor="name"
            className="font-manrope font-bold text-xs uppercase text-secondary/90 tracking-wider"
          >
            Full Name
          </label>

          <input
            type="name"
            id="name"
            name="name"
            placeholder="John Doe"
            className="bg-surface-highlight/70 rounded-xl p-4 pl-15 border border-border/60 active:outline-2 outline-primary/50"
          />

          <BsPerson className="w-6 h-6 absolute left-5 bottom-[1.05rem] opacity-40" />
        </div>
      )}

      <div className="flex flex-col relative gap-3">
        <label
          htmlFor="email"
          className="font-manrope font-bold text-xs uppercase text-secondary/90 tracking-wider"
        >
          Email Address
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@example.com"
          className="bg-surface-highlight/70 rounded-xl p-4 pl-15 border border-border/60 active:outline-2 outline-primary/50"
        />

        <Mail className="w-5.5 h-5.5 absolute left-5 bottom-[1.1rem] opacity-40" />
      </div>

      <div className="flex flex-col relative gap-3">
        <div className="flex flex-row justify-between">
          <label
            htmlFor="password"
            className="font-manrope font-bold text-xs uppercase text-secondary/90 tracking-wider"
          >
            Password
          </label>

          {mode === "login" && (
            <Link
              href="forgot-password"
              className="font-manrope font-bold text-xs text-primary/90 hover:text-primary leading-tight"
            >
              Forgot Password?
            </Link>
          )}
        </div>

        <input
          type={isPasswordShown ? "text" : "password"}
          id="password"
          name="password"
          placeholder="••••••••••••"
          className="bg-surface-highlight/70 rounded-xl p-4 pl-15 border border-border/60 active:outline-2 outline-primary/50"
        />

        <Lock className="w-5.5 h-5.5 absolute left-5 bottom-[1.1rem] opacity-40" />
        {isPasswordShown ? (
          <EyeOff
            className="w-5.5 h-5.5 absolute right-5 bottom-[1.1rem] opacity-40 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
            onClick={togglePassword}
          />
        ) : (
          <Eye
            className="w-5.5 h-5.5 absolute right-5 bottom-[1.1rem] opacity-40 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
            onClick={togglePassword}
          />
        )}
      </div>

      <button className="border-none flex justify-center gap-2 items-center rounded-lg px-12 md:px-14 py-3.5 text-[0.95rem] text-white dark:text-white/90 bg-linear-to-r from-blue-700/90 to-blue-700 hover:scale-[1.01] transition-transform font-bold font-manrope tracking-wide transition-colors duration-200 mt-2 group cursor-pointer">
        {mode === "login" ? "Sign In" : "Create Account"}
        <span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>
    </form>
  );
}
