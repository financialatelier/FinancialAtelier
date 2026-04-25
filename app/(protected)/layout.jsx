"use client";

// Third party imports
import { LazyMotion, domAnimation } from "framer-motion";

export default function ProtectedLayout({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
