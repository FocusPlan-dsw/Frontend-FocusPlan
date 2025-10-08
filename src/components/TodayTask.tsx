import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"
import { TaskForm } from "./TaskForm"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { useEffect, useState } from "react"
import { TaskCompleted } from "@/types/Task"

export function TodayTask() {
    const router = useRouter();

    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");

    const getTodayTasks = async () => {
        try {
            const today = new Date().toISOString().split("T")[0];
            const response = await api.get(`/tasks?dueDate=${today}`);
            setTasks(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    const pendindTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    const completedTask = async (id: string) => {
        try {
            await api.patch(`/tasks/${id}/complete`);
            await getTodayTasks();

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodayTasks();
    }, [])

    console.log(tasks)

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Tarefas de hoje</h1>

            <div className="flex gap-12 w-full">
                <TaskBlock title="Pendentes" value={pendindTasks} />
                <TaskBlock title="Concluídas" value={completedTasks} />
                <TaskBlock title="Tempo gasto" value="12h e 20min" />
            </div>

            <div className="flex items-center w-full max-w-[36.25rem] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <TaskForm getTasks={getTodayTasks} />
            </div>

            <div className="flex flex-col gap-12">
                {filteredTasks.map((task) => (
                    <Task key={task.id} title={task.title} task={task} completedTask={completedTask} isCompletedTask={task.completed} onClick={() => router.push(`/tasks/${task.id}`)} isOverdueTask={!!(!task.completed && task.dueDate && new Date(task.dueDate) < new Date())} />
                ))}
            </div>
        </section>    
    )
}