import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"
import { useEffect, useMemo, useState } from "react";
import { TaskCompleted } from "@/types/Task";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { TaskBlock } from "./TaskBlock";
import { formatSeconds } from "../utils/FormatSeconds";
import { TaskForm } from "./TaskForm";

export function AllTasks() {
    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");
    const [timeDedicated, setTimeDedicated] = useState("0h e 0min");

    const router = useRouter();

    const  getAllTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const getTimeDedicated = async () => {
        try {
            const response = await api.get("/tasks/summary/time-dedicated")
            const formattedTime = formatSeconds(response.data.allTime)
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

    const completedTask = async (id: string) => {
        try {
            await api.patch(`/tasks/${id}/complete`)
            await Promise.all([getAllTasks(), getTimeDedicated()])
        } catch (error) {
            console.error("Erro ao marcar tarefa como concluída:", error)
        }
    }

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        getAllTasks();
        getTimeDedicated();
    }, []);

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary max-md:text-2xl">Todas as tarefas</h1>

            <div className="flex gap-12 w-full max-lg:flex-col max-[1220px]:gap-3">
                <TaskBlock title="Pendentes" value={pendingTasks} />
                <TaskBlock title="Concluídas" value={completedTasks} />
                <TaskBlock title="Tempo dedicado" value={timeDedicated} />
            </div>

            <div className="flex items-center w-full max-w-[580px] gap-9 ">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <TaskForm getTasks={() => Promise.all([getAllTasks(), getTimeDedicated()])} />
            </div>

            <div className="flex flex-col gap-12">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                        Nenhuma tarefa encontrada.
                    </p>
                    ) : (
                        filteredTasks.map(task => {
                            return (
                                <Task
                                    key={task.id}
                                    getTasks={() => Promise.all([getAllTasks(), getTimeDedicated()])}
                                    task={task}
                                    onClick={() => router.push(`/tasks/${task.id}`)}
                                    completedTask={completedTask} 
                                />
                            );
                        })
                    )}
            </div>
        </section>    
    )
}