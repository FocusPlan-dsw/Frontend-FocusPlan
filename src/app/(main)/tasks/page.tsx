"use client";

import { AllTasks } from "@/components/AllTasks";
import { CompletedTask } from "@/components/CompletedTask";
import { OverdueTask } from "@/components/OverdueTask";
import { TodayTask } from "@/components/TodayTask";
import { TomorrowTask } from "@/components/TomorrowTask";
import { WeekTask } from "@/components/WeekTask";
import { useStep } from "@/context/StepContext";

export default function TasksPage() {
  const { step } = useStep();

  return (
    <>
      {step === "today" && <TodayTask />}
      {step === "tomorrow" && <TomorrowTask />}
      {step === "week" && <WeekTask />}
      {step === "all" && <AllTasks />}
      {step === "completed" && <CompletedTask />}
      {step === "overdue" && <OverdueTask />}
    </>
  );
}