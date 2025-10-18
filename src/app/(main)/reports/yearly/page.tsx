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

interface YearlyReport {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  progressTasks: number;
  percentageCompleted: number;
  totalEstimatedTime: string;
  totalTimeDedicated: number;
}

export default function YearlyReportsPage() { 
  const { setStep } = useStep();

  const [availableYears, setAvailableYears] = useState<number[]>([]);
  
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  const [report, setReport] = useState<YearlyReport | null>(null);

  useEffect(() => {
    setStep("reports");

    async function fetchAccountYears() {
      try {
        const response = await api.get<number[]>("/auth/account-years");
        const years = response.data;
        
        setAvailableYears(years);

        if (years.length > 0) {
          const currentYear = years[years.length - 1];
          setSelectedYear(currentYear);
        }
      } catch (error) {
        console.error("Erro ao buscar anos da conta:", error);
      }
    }

    fetchAccountYears();
  }, [setStep]);

  useEffect(() => {
    if (!selectedYear) {
      return;
    }

    async function fetchReport() {
      try {
        setReport(null);
        const response = await api.get(`/reports/yearly?year=${selectedYear}`);
        setReport(response.data);
      } catch (error) {
        console.error("Erro ao buscar o relatório anual:", error);
      }
    }

    fetchReport();
  }, [selectedYear]);

  const handleYearChange = (yearString: string) => {
    setSelectedYear(Number(yearString));
  };

  return (
    <div>
      <BackButton />
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl text-primary">Relatório Anual</h1>
        <main className="flex flex-col gap-10">
          
          <Select
            value={selectedYear ? String(selectedYear) : ""}
            onValueChange={handleYearChange}
          >
            <SelectTrigger label="Ano" className="w-[200px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <p>Durante o ano de {selectedYear || "..."} o seu planejamento e horas líquidas de estudo foram coletados e você obteve os seguintes resultados:</p>
          
          {report ? (
            <div className="flex flex-wrap gap-x-5 gap-y-10 w-full max-w-[1200px] mx-auto mb-15 items-start">
              <InformationBlockReports quantity={minutesToHHMM(report.totalEstimatedTime)} value="Tempo total estimado" icon={Clock10}/>
              <InformationBlockReports quantity={formatSeconds(report.totalTimeDedicated)} value="Tempo total percorrido" icon={Clock10}/>
              <InformationBlockReports quantity={`${report.percentageCompleted}%`} value="Tarefas Concluídas"/>
              <InformationBlockReports quantity={report.totalTasks} value="Tarefas Planejadas"/>
              <InformationBlockReports quantity={report.completedTasks} value="Tarefas Concluídas"/>
              <InformationBlockReports quantity={report.overdueTasks} value="Tarefas Não Concluídas"/>
            </div>
          ) : (
            <p>Carregando dados do relatório...</p>
          )}

        </main>
      </div>
    </div>
  );
}