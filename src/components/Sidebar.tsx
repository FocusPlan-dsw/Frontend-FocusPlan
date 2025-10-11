import Image from "next/image";

import { LogOut } from "lucide-react";
import React from "react";
import { useStep } from "@/context/StepContext";
import { buttons } from "@/constants/buttonsSidebar";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const { step, setStep } = useStep();

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");

        router.push("/login");
    }

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

                <li>
                    <button className={`w-full px-8 py-2 flex gap-3 text-xl text-white items-center cursor-pointer ${step === "logout" ? "bg-light-gray/40" : ""} hover:opacity-80`} onClick={handleLogout}>
                        <LogOut /> Sair
                    </button>
                </li>
            </ul>
        </aside>
    )
}