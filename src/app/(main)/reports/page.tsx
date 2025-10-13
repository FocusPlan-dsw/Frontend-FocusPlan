import { ReportTypeCard } from "@/components/ReportTypeCard";
import { CalendarSync, RefreshCw, Zap } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-[60px]">
      <h1 className="text-3xl text-primary">Relatórios</h1>
      <ReportTypeCard icon={RefreshCw} title="Semanal" description="Visualize seus resultados durante a semana" />
      <ReportTypeCard icon={CalendarSync} title="Mensal" description="Visualize seus resultados a cada mês" />
      <ReportTypeCard icon={Zap} title="Anual" description="Visualize seus resultados a cada ano" />
    </div>
  );
}