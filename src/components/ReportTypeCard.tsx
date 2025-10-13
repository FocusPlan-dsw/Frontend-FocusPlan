import { ChevronRight } from "lucide-react";

interface ReportTypeCardProps {
        icon: React.ElementType
        title: string
        description: string
    }

export function ReportTypeCard({ icon: Icon, title, description }: ReportTypeCardProps) {
    return (

        <div className="flex justify-between items-center p-5 bg-gray01 border-[0.5px] border-[#C5C4C4] rounded-[10px] w-[776px] h-[130px] cursor-pointer hover:opacity-80">
            <div className="flex items-center gap-[17px]">
                <Icon className="w-6 h-6 text-primary" />
                <div className="flex flex-col gap-[17px]">
                    <h1 className="text-primary">{title}</h1>
                    <p className="text-dark-gray">{description}</p>
                </div>
            </div>
            <ChevronRight className="text-gray02" />
        </div>
    );
}