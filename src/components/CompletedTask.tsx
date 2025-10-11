import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"
import { useEffect, useState } from "react";
import { TaskCompleted } from "@/types/Task";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

export function CompletedTask() {
    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");

    const router = useRouter();

    const completedTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.filter((task: TaskCompleted) => task.completed));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        completedTasks();
    }, []);

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Tarefas concluídas</h1>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-col gap-12">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                        Nenhuma tarefa encontrada.
                    </p>
                    ) : (
                    filteredTasks.map((task) => (
                        <Task 
                            key={task.id}
                            title={task.title} 
                            onClick={() => router.push(`/tasks/${task.id}`)}
                            view
                            isCompletedTask
                            task={task}
                        />
                    ))
                )}
            </div>
        </section>    
    )
}