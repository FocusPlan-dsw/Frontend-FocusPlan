import { ClipboardList } from "lucide-react"

interface TaskViewProps {
    title: string;
    description?: string;
    completed: boolean;
    estimatedTime?: string;
    startDate?: Date;
    dueDate?: Date;
}

export function TaskView({ title, description, completed, estimatedTime, startDate, dueDate }: TaskViewProps) {
    return (
        <section className="flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <h1 className="text-primary text-3xl flex items-center gap-5"><ClipboardList size={22} /> {title}</h1>
                <span className={`text-sm px-7 py-2 rounded-full ${completed ? "text-green-text bg-green-sucess" : "text-red-500 bg-red-200"}`}>{completed ? "Concluída" : "Atrasada"}</span>
            </div>

            <p className="text-xl">{description ?? "Atividade sem descrição"}</p>

            <div className="flex flex-col gap-7">
                <div>
                    <p className="font-light text-xl">
                        <span className="text-primary">Prazo estimado: </span>
                        {startDate?.toLocaleDateString() ?? "Atividade sem data de início"} á {dueDate?.toLocaleDateString() ?? "Atividade sem data de conclusão"}
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