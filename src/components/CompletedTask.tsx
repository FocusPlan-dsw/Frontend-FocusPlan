import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"

export function CompletedTask() {
    return (
        <section className="w-full flex flex-col gap-20">
            <h1 className="text-3xl text-primary">Tarefas concluídas</h1>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} />
                </div>
            </div>

            <div className="flex flex-col gap-12">
                <Task title="Implementar login" isCompletedTask />
            </div>
        </section>    
    )
}