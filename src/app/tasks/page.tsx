"use client";

import { TodayTask } from "@/components/TodayTask";
import { TomorrowTask } from "@/components/TomorrowTask";
import { useStep } from "@/context/StepContext";

export default function TasksPage() {
  const { step } = useStep();

  return (
    <>
        {step === "today" && <TodayTask />}
        {step === "tomorrow" && <TomorrowTask />}
    </>
  );
}