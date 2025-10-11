"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { StepProvider } from "@/context/StepContext";

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <StepProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 ml-[23.1rem] py-20 px-14 max-lg:ml-0">{children}</main>
      </div>
    </StepProvider>
  );
}