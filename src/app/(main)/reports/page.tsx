'use client';
import { ReportTypeCard } from "@/components/ReportTypeCard";
import { useStep } from "@/context/StepContext";
import { CalendarSync, RefreshCw, Zap } from "lucide-react";
import { useEffect } from "react";

export default function ReportsPage() {
   const { setStep } = useStep();

  useEffect(() => {
    setStep("reports");
  }, [setStep]);

  return (
    
    <div className="flex flex-col gap-[60px]">
      <h1 className="text-3xl text-primary">Relatórios</h1>
      <ReportTypeCard icon={RefreshCw} title="Semanal" description="Visualize seus resultados durante a semana" link="/reports/weekly" />
      <ReportTypeCard icon={CalendarSync} title="Mensal" description="Visualize seus resultados a cada mês" link="/"/>
      <ReportTypeCard icon={Zap} title="Anual" description="Visualize seus resultados a cada ano" link="/"/>
    </div>
  );
}