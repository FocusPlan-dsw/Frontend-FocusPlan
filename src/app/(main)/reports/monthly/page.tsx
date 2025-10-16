"use client";

import { useStep } from "@/context/StepContext";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { InformationBlockReports } from "@/components/InformationBlockReports";
import { Clock10 } from "lucide-react";
import { formatSeconds } from "@/utils/FormatSeconds";
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM";
import api from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WeeklyReportsPage() {
  const { setStep } = useStep();

  const [selectedMonth, setSelectedMonth] = useState("janeiro");

  const [report, setReport] = useState({
    "totalTasks": 0,
    "completedTasks": 0,
    "overdueTasks": 0,
    "progressTasks": 0,
    "percentageCompleted": 0,
    "totalEstimatedTime": "",
    "totalTimeDedicated": 0,
  })


  useEffect(() => {
    setStep("reports");

    async function fetchReport() {
      try {
        const response = await api.get(`/reports/monthly?month=${selectedMonth}`);
        setReport(response.data);
      } catch (error) {
        console.error("Erro ao buscar o relatório mensal:", error);
      }
    }

    fetchReport();
  }, [setStep, selectedMonth]);

  return (
    <div>
    <BackButton />
      <div className="flex flex-col gap-10">
          <h1 className="text-3xl text-primary">Relatório Mensal</h1>
          <main className="flex flex-col gap-10">
            <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
            >
              <SelectTrigger label="Mês" className="w-[200px]">
                <SelectValue placeholder="Selecione um mês para visualizar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="janeiro">Janeiro</SelectItem>
                <SelectItem value="fevereiro">Fevereiro</SelectItem>
                <SelectItem value="marco">Março</SelectItem>
                <SelectItem value="abril">Abril</SelectItem>
                <SelectItem value="maio">Maio</SelectItem>
                <SelectItem value="junho">Junho</SelectItem>
                <SelectItem value="julho">Julho</SelectItem>
                <SelectItem value="agosto">Agosto</SelectItem>
                <SelectItem value="setembro">Setembro</SelectItem>
                <SelectItem value="outubro">Outubro</SelectItem>
                <SelectItem value="novembro">Novembro</SelectItem>
                <SelectItem value="dezembro">Dezembro</SelectItem>
              </SelectContent>
            </Select>
            <p>No mês de {selectedMonth} dessse ano o seu planejamento e horas líquidas de estudo foram coletados e você obteve os seguintes resultados:</p>
            <div className="flex flex-wrap gap-x-5 gap-y-10 w-full max-w-[1200px] mx-auto mb-15 items-start">
              <InformationBlockReports quantity={minutesToHHMM(report.totalEstimatedTime)} value="Tempo total estimado" icon={Clock10}/>
                <InformationBlockReports quantity={formatSeconds(report.totalTimeDedicated)} value="Tempo total percorrido" icon={Clock10}/>
                <InformationBlockReports quantity={`${report.progressTasks}%`} value="Tarefas Concluídas"/>
                <InformationBlockReports quantity={report.totalTasks} value="Tarefas Planejadas"/>
                <InformationBlockReports quantity={report.completedTasks} value="Tarefas Concluídas"/>
                <InformationBlockReports quantity={report.overdueTasks} value="Tarefas Não Concluídas"/>
            </div>
          </main>
      </div>
      
      
    </div>
  );
}