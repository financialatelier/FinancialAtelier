"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MainLayout({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <Navbar />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
    </LazyMotion>
  );
}
