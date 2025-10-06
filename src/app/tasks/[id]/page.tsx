"use client";
import { TaskView } from "@/components/TaskView";
import { useParams, useRouter } from "next/navigation";

export default function TaskPage() {
    const router = useRouter();
    const params = useParams();

    const { id } = params;

    const tasks = [
        {id: 1, title: "Iniciar implementação de telas", description: "Detalhes da tarefa 1", completed: false, estimatedTime: "2h", startDate: new Date(), dueDate: new Date()},
        {id: 2, title: "Implementar login", description: "Detalhes da tarefa 2", completed: true, estimatedTime: "1h", startDate: new Date(), dueDate: new Date()},
        {id: 3, title: "Atividade de IHC", description: "Detalhes da tarefa 3", completed: false, estimatedTime: "3h", startDate: new Date(), dueDate: new Date()},
    ]

    const task = tasks.find((task) => task.id === Number(id));

    if (!task) {
        return <div>Tarefa não encontrada</div>;
    }

    return (
        <div>
            <button className="mb-10" onClick={() => router.back()}>Voltar</button>
            <TaskView {...task} />
        </div>
    );

}