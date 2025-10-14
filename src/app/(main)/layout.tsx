import { ReactNode } from "react";
import { StepProvider } from "@/context/StepContext";
import { TasksView } from "./tasks/TasksView";

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <StepProvider>
      <TasksView>
        {children}
      </TasksView>
    </StepProvider>
  );
}