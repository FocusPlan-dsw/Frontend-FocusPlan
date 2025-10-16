"use client";

import { useStep } from "@/context/StepContext";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { InformationBlockReports } from "@/components/InformationBlockReports";
import { Clock10 } from "lucide-react";
import { formatSeconds } from "@/utils/FormatSeconds";
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM";
import { formatDate } from "@/utils/FormatDate";
import api from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WeeklyReportsPage() {
  const { setStep } = useStep();

  const [selectedWeek, setSelectedWeek] = useState("thisWeek");

  const [report, setReport] = useState({
    "totalTasks": 0,
    "completedTasks": 0,
    "overdueTasks": 0,
    "progressTasks": 0,
    "percentageCompleted": 0,
    "totalEstimatedTime": "",
    "totalTimeDedicated": 0,
    period: {
      currentWeek: {
        start: null,
        end: null
      },
      previousWeek: {
        start: null,
        end: null
      }
    }
  })

  const displayedPeriod = selectedWeek === 'thisWeek'
  ? report.period?.currentWeek
  : report.period?.previousWeek;

  useEffect(() => {
    setStep("reports");

    async function fetchReport() {
      try {
        const response = await api.get(`/reports/weekly?period=${selectedWeek}`);
        setReport(response.data);
      } catch (error) {
        console.error("Erro ao buscar o relatório semanal:", error);
      }
    }

    fetchReport();
  }, [setStep, selectedWeek]);

  return (
    <div>
    <BackButton />
      <div className="flex flex-col gap-10">
          <h1 className="text-3xl text-primary">Relatório Semanal</h1>
          <main className="flex flex-col gap-10">
            <Select
            value={selectedWeek}
            onValueChange={(value) => setSelectedWeek(value)}
            >
              <SelectTrigger label="Semana" className="w-[200px]">
                <SelectValue placeholder="Selecione a semana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisWeek">Essa semana</SelectItem>
                <SelectItem value="previousWeek">Semana passada</SelectItem>
              </SelectContent>
            </Select>
            <p>Na semana de {formatDate(displayedPeriod?.start)} a {formatDate(displayedPeriod?.end)} o seu planejamento e horas líquidas de estudo foram coletados e você obteve os seguintes resultados:</p>
            <div className="flex flex-wrap gap-x-5 gap-y-10 w-full max-w-[1200px] mx-auto mb-15 items-start">
              <InformationBlockReports quantity={minutesToHHMM(report.totalEstimatedTime)} value="Tempo total estimado" icon={Clock10}/>
                <InformationBlockReports quantity={formatSeconds(report.totalTimeDedicated)} value="Tempo total percorrido" icon={Clock10}/>
                <InformationBlockReports quantity={`${report.percentageCompleted}%`} value="Tarefas Concluídas"/>
                <InformationBlockReports quantity={report.totalTasks} value="Tarefas Planejadas"/>
                <InformationBlockReports quantity={report.completedTasks} value="Tarefas Concluídas"/>
                <InformationBlockReports quantity={report.overdueTasks} value="Tarefas Não Concluídas"/>
            </div>
          </main>
      </div>
      
      
    </div>
  );
}