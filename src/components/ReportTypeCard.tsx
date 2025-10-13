import { ChevronRight } from "lucide-react";

interface ReportTypeCardProps {
        icon: React.ElementType
        title: string
        description: string
    }

export function ReportTypeCard({ icon: Icon, title, description }: ReportTypeCardProps) {
    return (
        <div
        className="group flex justify-between items-center p-4 sm:p-5 bg-gray01 border border-[#C5C4C4] 
                    rounded-[10px] w-full max-w-[776px] min-h-[110px] cursor-pointer 
                    transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary"
        >
        <div className="flex items-center gap-3 sm:gap-[17px] flex-1 min-w-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 transition-colors duration-300" />
            
            <div className="flex flex-col gap-2 sm:gap-[8px] min-w-0">
            <h1 className="text-primary text-base sm:text-lg truncate">
                {title}
            </h1>
            <p className="text-dark-gray text-sm sm:text-base line-clamp-2">
                {description}
            </p>
            </div>
        </div>

        <ChevronRight
            className="text-gray02 flex-shrink-0 transition-all duration-300 
                    group-hover:text-primary group-hover:translate-x-1"
        />
        </div>
    );
}