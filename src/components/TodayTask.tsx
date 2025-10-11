import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"
import { TaskForm } from "./TaskForm"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { useEffect, useMemo, useState } from "react"
import { TaskCompleted } from "@/types/Task"
import { formatSeconds } from "./FormatSeconds"

export function TodayTask() {
    const router = useRouter();

    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");
    const [timeDedicated, setTimeDedicated] = useState("0h e 0min");

    const getTodayTasks = async () => {
        try {
            const response = await api.get("/tasks", {
                params: {
                    period: 'today'
                }
            });
            setTasks(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const getTimeDedicated = async () => {
        try {
            const response = await api.get("/tasks/summary/time-dedicated");
            const formattedTime = formatSeconds(response.data.today);
            setTimeDedicated(formattedTime);
        } catch (error) {
            console.log(error);
        }
    };

    const pendingTasks = useMemo(() => {
        return tasks.filter(task => !task.completed).length;
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.completed).length;
    }, [tasks]);
    
    const completedTask = async (id: string) => {
        try {
            await api.patch(`/tasks/${id}/complete`);
            await Promise.all([getTodayTasks(), getTimeDedicated()]);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodayTasks();
        getTimeDedicated();
    }, []);

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Tarefas de hoje</h1>

            <div className="flex gap-12 w-full">
                <TaskBlock title="Pendentes" value={pendingTasks} />
                <TaskBlock title="Concluídas" value={completedTasks} />
                <TaskBlock title="Tempo Dedicado" value={timeDedicated} />
            </div>

            <div className="flex items-center w-full max-w-[36.25rem] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <TaskForm getTasks={() => Promise.all([getTodayTasks(), getTimeDedicated()])} />
            </div>

            <div className="flex flex-col gap-12">
                {filteredTasks.map((task) => (
                   <Task 
                        key={task.id} 
                        getTasks={() => Promise.all([getTodayTasks(), getTimeDedicated()])} 
                        title={task.title} 
                        task={task} 
                        completedTask={completedTask} 
                        isCompletedTask={task.completed} 
                        onClick={() => router.push(`/tasks/${task.id}`)} 
                        isOverdueTask={!!(!task.completed && task.dueDate && new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))} 
                    />
                ))}
            </div>
        </section>    
    )
}