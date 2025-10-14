import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"
import { TaskCompleted } from "@/types/Task";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskForm } from "./TaskForm";

import api from "@/lib/api";
import { formatSeconds } from "../utils/FormatSeconds";

export function TomorrowTask() {
    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");
    const [timeDedicated, setTimeDedicated] = useState("0h e 0min")

    const router = useRouter();

    const getTomorrowTasks = async () => {
        try {
            const response = await api.get("/tasks", {
                params: {
                    period: "tomorrow"
                }
            });
            const tasks = response.data

            setTasks(tasks);

        } catch (error) {
            console.log(error);
        }
    };

    const getTimeDedicated = async () => {
        try {
        const response = await api.get("/tasks/summary/time-dedicated")
        const formattedTime = formatSeconds(response.data.today)
        setTimeDedicated(formattedTime)
        } catch (error) {
        console.error("Erro ao buscar tempo dedicado:", error)
        }
    }

    const pendingTasks = useMemo(
        () => tasks.filter((task) => !task.completed).length,
        [tasks]
    );
    
    const completedTasks = useMemo(
        () => tasks.filter((task) => task.completed).length,
        [tasks]
    )

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

    const completedTask = async (id: string) => {
        try {
            await api.patch(`/tasks/${id}/complete`)
            await Promise.all([getTomorrowTasks(), getTimeDedicated()])
        } catch (error) {
            console.error("Erro ao marcar tarefa como concluída:", error)
        }
    }

    useEffect(() => {
        getTomorrowTasks();
        getTimeDedicated();
    }, []);

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary max-md:text-2xl">Tarefas de amanhã</h1>

            <div className="flex gap-12 w-full max-lg:flex-col max-[1220px]:gap-3">
                <TaskBlock title="Pendentes" value={pendingTasks} />
                <TaskBlock title="Concluídas" value={completedTasks} />
                <TaskBlock title="Tempo dedicado" value={timeDedicated} />
            </div>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <TaskForm getTasks={() => Promise.all([getTomorrowTasks(), getTimeDedicated()])} />
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
                            getTasks={() => Promise.all([getTomorrowTasks(), getTimeDedicated()])}
                            title={task.title} 
                            task={task} 
                            completedTask={completedTask} 
                            isCompletedTask={task.completed} 
                            onClick={() => router.push(`/tasks/${task.id}`)} 
                            isOverdueTask={!!(!task.completed && task.dueDate && new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))} view={isCompletedTaskDue().includes(task)} 
                        />
                    ))
                )}
            </div>
        </section>    
    )
}