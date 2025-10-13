import { ChevronRight } from "lucide-react";

interface ReportTypeCardProps {
        icon: React.ElementType
        title: string
        description: string
    }

export function ReportTypeCard({ icon: Icon, title, description }: ReportTypeCardProps) {
    return (
        <div
        className="group flex justify-between items-center p-5 bg-gray01 border border-[#C5C4C4] 
                    rounded-[10px] w-[776px] h-[130px] cursor-pointer transition-all duration-300 
                    hover:shadow-lg hover:scale-[1.02] hover:border-primary"
        >
        <div className="flex items-center gap-[17px]">
            <Icon className="w-6 h-6 text-primary transition-colors duration-300" />
            <div className="flex flex-col gap-[8px]">
            <h1 className="text-primary text-lg">{title}</h1>
            <p className="text-dark-gray text-sm">{description}</p>
            </div>
        </div>

        <ChevronRight
            className="text-gray02 transition-colors duration-300 group-hover:text-primary"
        />
        </div>
    );
}