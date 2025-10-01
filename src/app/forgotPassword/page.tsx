"use client"
import { useState } from "react";
import Forgot from "@/components/forgot";
import { EnterCode } from "@/components/EnterCode";
import ResetPassword from "@/components/ResetPassword";

export default function ForgotPassword() {
    const [step, setStep] = useState<"email" | "code" | "password">("email");
    const [code, setCode] = useState("");

    console.log(step)
 
    return (
        <section className="w-full flex max-xl:flex-col">
            <div className="flex flex-col w-full justify-center items-center gap-[6.25rem] max-lg:p-5">
                {step === "email" && <Forgot onCodeVerified={() => setStep("code")} />}
                {step === "code" && <EnterCode onCodeVerified={() => setStep("password")} email="email" onCodeEntered={(code) => setCode(code)} />}
                {step === "password" && <ResetPassword code={code} />}
            </div>
        </section>
    )
}