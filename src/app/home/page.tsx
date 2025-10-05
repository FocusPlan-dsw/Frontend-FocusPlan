"use client";
import { Sidebar } from "@/components/Sidebar";
import { TodayTask } from "@/components/TodayTask";
import { TomorrowTask } from "@/components/TomorrowTask";
import { Step } from "@/types/Step";
import { useState } from "react";

export default function Home() {
    const [step, setStep] = useState<Step>("today");

    return (
        <div className="flex h-screen">
            <Sidebar step={step} setStep={setStep} />
            <main className="flex-1 ml-[23.1rem] py-20 px-14">
                {step === "today" && <TodayTask />}
                {step === "tomorrow" && <TomorrowTask />}
            </main>
        </div>
    );
}