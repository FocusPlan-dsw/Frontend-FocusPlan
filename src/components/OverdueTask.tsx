import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Task } from "./Task"

export function OverdueTask() {
    return (
        <section className="w-full flex flex-col gap-20">
            <h1 className="text-3xl text-primary">Tarefas atrasadas</h1>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} />
                </div>
            </div>

            <div className="flex flex-col gap-12">
                <Task title="Iniciar implementação de telas" isOverdueTask />
                <Task title="Atividade de IHC" isOverdueTask />
            </div>
        </section>    
    )
}