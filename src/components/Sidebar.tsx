import Image from "next/image";

import { CalendarCheck2, CalendarRange, Target, BookCheck, TriangleAlert, ClipboardClock, LogOut } from "lucide-react";
import React from "react";
import { Step } from "@/types/Step";

interface SidebarProps {
    step: string;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export function Sidebar({ step, setStep }: SidebarProps) {
    const buttons = [
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
            name: "Tarefas atrasadas", icon: TriangleAlert, step: "late"
        },
        {
            name: "Relatórios", icon: ClipboardClock, step: "reports"
        },
        {
            name: "Sair", icon: LogOut, step: "logout"
        }
    ] as const;

    return (
        <aside className="fixed bg-gradient h-screen w-[23.1rem] py-14 flex flex-col gap-20">
            <Image src={"/sidebar.svg"} alt="sidebar" width={210} height={75} className="mx-auto" />

            <ul className="flex flex-col gap-[1.5rem] h-full">
                {buttons.map(button => (
                    <li key={button.name}>
                        <button className={`w-full px-8 py-2 flex gap-3 text-xl text-white items-center cursor-pointer ${step === button.step ? "bg-light-gray/40" : ""} hover:opacity-80`} onClick={() => setStep(button.step)}>
                            <button.icon />{button.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}