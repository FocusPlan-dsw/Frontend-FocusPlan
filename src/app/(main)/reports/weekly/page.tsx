"use client";

import { useStep } from "@/context/StepContext";
import { useEffect } from "react";
import Link from 'next/link'; 
import { BackButton } from "@/components/BackButton";

export default function WeeklyReportsPage() {
  const { setStep } = useStep();

  useEffect(() => {
    setStep("reports");
  }, [setStep]);

  return (
    <div>
    <BackButton />
      <h1 className="text-3xl text-primary">Relatório Semanal</h1>
      
      
    </div>
  );
}