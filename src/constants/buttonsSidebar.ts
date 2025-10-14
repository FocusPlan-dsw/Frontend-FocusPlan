import { CalendarCheck2, CalendarRange, Target, BookCheck, TriangleAlert, ClipboardClock } from "lucide-react";

export const buttons = [
    {
        name: "Hoje", icon: CalendarCheck2, step: "today", link: "/tasks"
    },
    {
        name: "Amanhã", icon: CalendarCheck2, step: "tomorrow", link: "/tasks"
    },
    {
        name: "Essa semana", icon: CalendarRange, step: "week", link: "/tasks"
    },
    {
        name: "Todas as tarefas", icon: Target, step: "all", link: "/tasks"
    },
    {
        name: "Tarefas concluídas", icon: BookCheck, step: "completed", link: "/tasks"
    },
    {
        name: "Tarefas atrasadas", icon: TriangleAlert, step: "overdue", link: "/tasks"
    },
    {
        name: "Relatórios", icon: ClipboardClock, step: "reports", link: "/reports"
    }
] as const;

export type ButtonType = typeof buttons[number];