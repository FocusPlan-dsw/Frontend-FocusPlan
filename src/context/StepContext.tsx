import { Step } from "@/types/Step";
import { createContext, useContext, useState } from "react";

interface StepContextProps {
    step: Step;
    setStep: (step: Step) => void;   
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<Step>("today");

    return (
        <StepContext.Provider value={{ step, setStep }}>
            {children}
        </StepContext.Provider>
    )
}

export function useStep() {
    const context = useContext(StepContext);

    if (!context) {
        throw new Error("useStep must be used within a StepProvider");
    }

    return context;
}