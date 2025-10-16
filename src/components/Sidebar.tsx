import Image from "next/image";

import { LogOut, MenuIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useStep } from "@/context/StepContext";
import { buttons } from "@/constants/buttonsSidebar";
import { useRouter } from "next/navigation";
import { set } from "zod";

export function Sidebar() {
    const [open, setOpen] = useState(false);
    const { step, setStep } = useStep();

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");

        router.push("/login");
    }

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
                className={`w-[23.1rem] fixed top-0 left-0 z-50 bg-gradient h-screen py-14 flex flex-col gap-20 transform transition-transform duration-300 max-[1025px]:gap-10
                ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <Image src="/sidebar.svg" alt="sidebar" width={210} height={75} className="mx-auto max-md:pt-10" />

                <ul className="flex flex-col gap-[1.5rem] h-full max-[1025px]:gap-[0.8rem]">
                    {buttons.map((button) => (
                        <li key={button.name}>
                            <button
                                className={`w-full px-8 py-2 flex gap-3 text-xl text-white items-center cursor-pointer 
                                ${step === button.step ? "bg-light-gray/40" : ""} hover:opacity-80`}
                                onClick={() => {
                                    setStep(button.step)
                                    setOpen(false)
                                }}
                            >
                                <button.icon /> {button.name}
                            </button>
                        </li>
                    ))}

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