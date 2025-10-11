import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"
import { TaskCompleted } from "@/types/Task";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

export function OverdueTask() {
    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");

    const router = useRouter();

    const overdueTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.filter((task: TaskCompleted) => {
                if (!task.dueDate || task.completed) return false;

                const due = new Date(task.dueDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                due.setHours(0, 0, 0, 0);

                return due < today;
            }));

        } catch (error) {
            console.log(error);
        }
    }

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    useEffect(() => {
        overdueTasks();
    }, []);

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Tarefas atrasadas</h1>

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
                            isOverdueTask
                            task={task}
                        />
                    ))
                )}
            </div>
        </section>    
    )
}