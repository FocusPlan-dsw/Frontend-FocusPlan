"use client";

import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    
    return (
        <button 
            className="flex items-center gap-2 mb-10 text-dark-gray cursor-pointer hover:underline px-2 py-1 -ml-2"
            onClick={() => router.back()}
            aria-label="Voltar para página anterior"
        >
            <CircleArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
        </button>
    );
}