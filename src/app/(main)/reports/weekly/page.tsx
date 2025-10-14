"use client";

import { useStep } from "@/context/StepContext";
import { useEffect } from "react";
import { BackButton } from "@/components/BackButton";
import { InformationBlockReports } from "@/components/InformationBlockReports";
import { Clock10 } from "lucide-react";

export default function WeeklyReportsPage() {
  const { setStep } = useStep();

  useEffect(() => {
    setStep("reports");
  }, [setStep]);

  return (
    <div>
    <BackButton />
      <div className="flex flex-col gap-20">
          <h1 className="text-3xl text-primary">Relatório Semanal</h1>
          <main className="grid grid-cols-2 gap-10 w-full max-w-[1200px] mx-auto">
              <InformationBlockReports quantity="20h e 30min" value="Tempo total percorrido" icon={Clock10}/>
              <InformationBlockReports quantity="20" value="Tarefas Planejadas"/>
              <InformationBlockReports quantity="10" value="Tarefas Concluídas"/>
              <InformationBlockReports quantity="10" value="Tarefas Não Concluídas"/>
          </main>
      </div>
      
      
    </div>
  );
}