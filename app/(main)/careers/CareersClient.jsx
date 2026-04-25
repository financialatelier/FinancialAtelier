"use client";

// Third party imports
import { m } from "framer-motion";

// Components
import Boilerplate from "@/components/Boilerplate";

// Animations
import { fadeUp } from "@/lib/animations";

export default function CareersClient() {
  return (
    <Boilerplate
      title="Title"
      highlightedWord="Highlighted Word"
      titleSuffix="Title Suffix"
      description="Description"
      includesCTA={false}
    ></Boilerplate>
  );
}