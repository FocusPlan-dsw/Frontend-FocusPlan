import Image from "next/image";
import { LogOut, MenuIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useStep } from "@/context/StepContext";
import { buttons } from "@/constants/buttonsSidebar";
import { useRouter, usePathname } from "next/navigation";
import { Step } from "@/types/Step";

export function Sidebar() {
    const [open, setOpen] = useState(false);
    const { step, setStep } = useStep();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const handleNavigation = (buttonStep: Step) => {
        if (buttonStep === "reports") {
            router.push("/reports");
        } else {
            if (!pathname.startsWith('/tasks')) {
                router.push("/tasks");
            }
            setStep(buttonStep);
        }
        setOpen(false);
    };

    return (
        <>
            <button
                className={`lg:hidden p-3 fixed top-4 left-3 z-[60] bg-primary text-white rounded-lg shadow-md ${open ? "border border-white" : ""}`}
                onClick={() => setOpen(!open)}
            >
                {open ? <X /> : <MenuIcon />}
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 bg-gradient h-screen py-14 flex flex-col gap-20 transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full w-[23.1rem]"} lg:translate-x-0`}
            >
                <Image src="/sidebar.svg" alt="sidebar" width={210} height={75} className="mx-auto" />

                <ul className="flex flex-col gap-[1.5rem] h-full">
                    {buttons.map((button) => {
                        const isActive = (button.step === 'reports' && pathname === '/reports') || (pathname.startsWith('/tasks') && step === button.step);

                        return (
                            <li key={button.name}>
                                <button
                                    className={`w-full px-8 py-2 flex gap-3 text-xl text-white items-center cursor-pointer 
                                    ${isActive ? "bg-light-gray/40" : ""} hover:opacity-80`}
                                    onClick={() => handleNavigation(button.step)}
                                >
                                    <button.icon /> {button.name}
                                </button>
                            </li>
                        );
                    })}

                    <li>
                        <button
                            className="w-full px-8 py-2 flex gap-3 text-xl text-white items-center cursor-pointer hover:opacity-80"
                            onClick={handleLogout}
                        >
                            <LogOut /> Sair
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    )
}