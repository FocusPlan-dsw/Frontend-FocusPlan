import { CalendarCheck2, CalendarRange, Target, BookCheck, TriangleAlert, ClipboardClock } from "lucide-react";

export const buttons = [
    {
        name: "Hoje", icon: CalendarCheck2, step: "today"
    },
    {
        name: "Amanhã", icon: CalendarCheck2, step: "tomorrow"
    },
    {
        name: "Essa semana", icon: CalendarRange, step: "week"
    },
    {
        name: "Todas as tarefas", icon: Target, step: "all"
    },
    {
        name: "Tarefas concluídas", icon: BookCheck, step: "completed"
    },
    {
        name: "Tarefas atrasadas", icon: TriangleAlert, step: "overdue"
    },
    {
        name: "Relatórios", icon: ClipboardClock, step: "reports"
    }
] as const;