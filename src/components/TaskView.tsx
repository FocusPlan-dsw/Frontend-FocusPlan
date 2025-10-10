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
            return { label: "Atrasada", style: "text-red-500 bg-red-200" };
            }
        }

        return { label: "Em andamento", style: "text-yellow-500 bg-yellow-200" };
    };

    const status = getTaskStatus(completed, dueDate);

    return (
        <section className="flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <h1 className="text-primary text-3xl flex items-center gap-5"><ClipboardList size={22} /> {title}</h1>
                <span className={`text-sm px-7 py-2 rounded-full ${status.style}`}>{status.label}</span>
            </div>

            <p className="text-xl">{description ?? "Atividade sem descrição"}</p>

            <div className="flex flex-col gap-7">
                <div>
                    <p className="font-light text-xl">
                        <span className="text-primary">Prazo estimado: </span>
                        {startDate ? new Date(startDate).toLocaleDateString("pt-BR") : "Atividade sem data de início"} á { dueDate ? new Date(dueDate).toLocaleDateString("pt-BR") : "Atividade sem data de conclusão"}
                    </p>
                </div>
                <div className="flex gap-12">
                    <p className="font-light text-xl">
                        <span className="text-primary">Tempo de foco estimado: </span>
                        {estimatedTime ?? "Atividade sem tempo estimado"}
                    </p>

                    <p className="font-light text-xl">
                        <span className="text-primary">Tempo de foco percorrido: </span>
                        {estimatedTime ?? "Atividade sem tempo percorrido"}
                    </p>
                </div>
            </div>
        </section>
    )
}