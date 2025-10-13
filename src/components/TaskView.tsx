import { TaskCompleted } from "@/types/Task";
import { ClipboardList } from "lucide-react"

export function TaskView({ title, description, completed, estimatedTime, startDate, dueDate }: TaskCompleted) {
    const getTaskStatus = (completed: boolean, dueDate?: Date) => {
        if (completed) return { label: "Concluída", style: "text-green-text bg-green-sucess" };

        if (dueDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const due = new Date(dueDate);
            due.setHours(0, 0, 0, 0);

            if (due < today) {
            return { label: "Atrasada", style: "text-[#b91c1c] bg-[#fee2e2]" };
            }
        }

        return { label: "Em andamento", style: "text-[#b45309] bg-[#fef3c7] " };
    };

    const status = getTaskStatus(completed, dueDate);

    return (
        <section className="flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <div className="flex items-start gap-3">
                    <ClipboardList size={30} className="text-primary"/> 
                    <h1 className="text-primary text-3xl max-md:text-lg m-0 leading-none">{title}</h1>
                </div>
                <span className={`text-sm px-7 py-2 rounded-full max-md:px-5 max-md:text-[12px] whitespace-nowrap ${status.style}`}>{status.label}</span>
            </div>

            <p className="text-xl max-md:text-lg">{description ?? "Atividade sem descrição"}</p>

            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-5 bg-light-gray border-[0.5px] border-gray02 rounded-[10px] w-full max-w-[47.5rem] max-lg:max-w-full p-5">

                    <p>
                        <span className="text-primary">Prazo estimado: </span>
                        {startDate ? new Date(startDate).toLocaleDateString("pt-BR") : "Atividade sem data de início"} á { dueDate ? new Date(dueDate).toLocaleDateString("pt-BR") : "Atividade sem data de conclusão"}
                    </p>
                     <p>
                        <span className="text-primary">Intervalo em que foi feita: </span>
                        {startDate ? new Date(startDate).toLocaleDateString("pt-BR") : "Atividade sem data de início"} á { dueDate ? new Date(dueDate).toLocaleDateString("pt-BR") : "Atividade sem data de conclusão"}
                    </p>
                </div>
                <div className="flex flex-col gap-5 bg-light-gray border-[0.5px] border-gray02 rounded-[10px] w-full max-w-[47.5rem] max-lg:max-w-full p-5">
                    <p>
                        <span className="text-primary">Tempo de foco estimado: </span>
                        {estimatedTime ?? "Atividade sem tempo estimado"}
                    </p>

                    <p>
                        <span className="text-primary">Tempo de foco percorrido: </span>
                        {estimatedTime ?? "Atividade sem tempo percorrido"}
                    </p>
                </div>
            </div>
        </section>
    )
}