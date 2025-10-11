import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"
import { TaskForm } from "./TaskForm"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { TaskCompleted } from "@/types/Task"

import api from "@/lib/api"

export function TodayTask() {
    const router = useRouter();

    const [tasks, setTasks] = useState<TaskCompleted[]>([]);
    const [search, setSearch] = useState("");

    const getTodayTasks = async () => {
        try {
            const response = await api.get("/tasks");
            const tasks = response.data;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todayTasks = tasks.filter((task: TaskCompleted) => {
                if (!task.startDate || !task.dueDate) return false;

                const start = new Date(task.startDate);
                const due = new Date(task.dueDate);

                return start <= today && today <= due;
            });

            setTasks(todayTasks);

        } catch (error) {
            console.log(error);
        }
    };

    const pendingTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;

            const due = new Date(task.dueDate);
            due.setHours(0, 0, 0, 0);

            return due >= today;
        }).length;
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.completed).length;
    }, [tasks]);

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
            await api.patch(`/tasks/${id}/complete`);
            await getTodayTasks();

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodayTasks();
    }, []);

    const filteredTasks = search ? tasks.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : tasks;

    return (
        <section className="w-full flex flex-col gap-20 pb-10">
            <h1 className="text-3xl text-primary">Tarefas de hoje</h1>

            <div className="flex gap-12 w-full max-lg:flex-col max-[1220px]:gap-3">
                <TaskBlock title="Pendentes" value={pendingTasks} />
                <TaskBlock title="Concluídas" value={completedTasks} />
                <TaskBlock title="Tempo gasto" value="12h 30min" />
            </div>

            <div className="flex items-center w-full max-w-[36.25rem] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <TaskForm getTasks={getTodayTasks} />
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
                            getTasks={getTodayTasks}
                            title={task.title}
                            task={task}
                            completedTask={completedTask}
                            isCompletedTask={task.completed}
                            onClick={() => router.push(`/tasks/${task.id}`)}
                            isOverdueTask={!!(!task.completed && task.dueDate && new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))}
                            view={isCompletedTaskDue().includes(task)}
                        />
                    ))
                )}
            </div>
        </section>    
    )
}