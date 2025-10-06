import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"
import { TaskForm } from "./TaskForm"
import { useRouter } from "next/navigation"

export function TodayTask() {
    const tasks = [
        {id: 1, title: "Iniciar implementação de telas"},
        {id: 2, title: "Implementar login"},
        {id: 3, title: "Atividade de IHC"},
    ]

    const router = useRouter();

    return (
        <section className="w-full flex flex-col gap-20">
            <h1 className="text-3xl text-primary">Tarefas de hoje</h1>

            <div className="flex gap-12 w-full">
                <TaskBlock title="Pendentes" value="10" />
                <TaskBlock title="Concluídas" value="12" />
                <TaskBlock title="Tempo gasto" value="12h e 20min" />
            </div>

            <div className="flex items-center w-full max-w-[36.25rem] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} />
                </div>
                <TaskForm onSubmit={(data) => console.log("Criar:", data)} />
            </div>

            <div className="flex flex-col gap-12">
                {tasks.map((task) => (
                    <Task key={task.id} title={task.title} onClick={() => router.push(`/tasks/${task.id}`)} />
                ))}
            </div>
        </section>    
    )
}