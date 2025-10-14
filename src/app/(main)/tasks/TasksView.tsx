"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useStep } from "@/context/StepContext";
import { Step } from "@/types/Step";

export function TasksView({ children }: { children: ReactNode }) {
  const { step, setStep } = useStep();

  const handleStepChange = (selectedStep: Step) => {
    setStep(selectedStep);
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeStep={step} onStepChange={handleStepChange} />
      <main className="flex-1 lg:ml-[23.1rem] py-20 px-14 max-lg:ml-0">
        {children}
      </main>
    </div>
  );
}