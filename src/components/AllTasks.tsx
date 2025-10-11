import { Search, Plus } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"
import { useEffect, useState } from "react";
import { TaskCompleted } from "@/types/Task";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

export function AllTasks() {
    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");

    const router = useRouter();

    const allGetTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const isCompletedTaskDue = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return tasks.filter(task => {
            if (!task.dueDate) return false;
                const due = new Date(task.dueDate);
                due.setHours(0, 0, 0, 0);

            return task.completed && due < today;
        });
    };

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        allGetTasks();
    }, []);

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Todas as tarefas</h1>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search } value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button title="Criar tarefa" className="flex items-center justify-center text-primary bg-gray01 border-[0.5px] border-gray02 rounded-[9px] w-[60px] h-[48px] cursor-pointer hover:opacity-80"><Plus size={18} /></button>
            </div>

            <div className="flex flex-col gap-12">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                        Nenhuma tarefa encontrada.
                    </p>
                    ) : (
                        filteredTasks.map(task => {
                            const isCompleted = task.completed;
                            const isOverdue = !task.completed && task.dueDate ? new Date(task.dueDate).setHours(0, 0, 0, 0) < today.getTime() : false;

                            return (
                                <Task
                                    key={task.id}
                                    title={task.title}
                                    task={task}
                                    onClick={() => router.push(`/tasks/${task.id}`)}
                                    isCompletedTask={isCompleted}
                                    isOverdueTask={isOverdue}
                                    view={isCompletedTaskDue().includes(task)}
                                />
                            );
                        })
                    )}
            </div>
        </section>    
    )
}