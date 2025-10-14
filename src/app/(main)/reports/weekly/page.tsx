"use client";

import { useStep } from "@/context/StepContext";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { InformationBlockReports } from "@/components/InformationBlockReports";
import { Clock10 } from "lucide-react";
import { formatSeconds } from "@/utils/FormatSeconds";
import api from "@/lib/api";

export default function WeeklyReportsPage() {
  const { setStep } = useStep();

  const [report, setReport] = useState({
    "totalTasks": 0,
    "completedTasks": 0,
    "overdueTasks": 0,
    "progressTasks": 0,
    "percentageCompleted": 0,
    "totalEstimatedTime": 0
  })

  useEffect(() => {
    setStep("reports");

    async function fetchReport() {
      try {
        const response = await api.get("/reports/weekly");
        setReport(response.data);
      } catch (error) {
        console.error("Erro ao buscar o relatório semanal:", error);
      }
    }

    fetchReport();
  }, [setStep]);

  return (
    <div>
    <BackButton />
      <div className="flex flex-col gap-10">
          <h1 className="text-3xl text-primary">Relatório Semanal</h1>
          <main className="flex flex-col gap-10">
            <p>Nessa semana (de 12 a 18 de outubro) o seu planejamento e horas líquidas de estudo foram coletados e você obteve os seguintes resultados:</p>
            <div className="grid grid-cols-2 gap-10 w-full max-w-[1200px] mx-auto">
                <InformationBlockReports quantity={formatSeconds(report.totalEstimatedTime)} value="Tempo total percorrido" icon={Clock10}/>
                <InformationBlockReports quantity={report.totalTasks} value="Tarefas Planejadas"/>
                <InformationBlockReports quantity={report.completedTasks} value="Tarefas Concluídas"/>
                <InformationBlockReports quantity={report.overdueTasks} value="Tarefas Não Concluídas"/>
            </div>
          </main>
      </div>
      
      
    </div>
  );
}