import { Search, Plus } from "lucide-react"
import { Input } from "./ui/input"
import { TaskBlock } from "./TaskBlock"
import { Task } from "./Task"

export function WeekTask() {
    return (
        <section className="w-full flex flex-col gap-20">
            <h1 className="text-3xl text-primary">Tarefas da semana</h1>

            <div className="flex gap-12 w-full">
                <TaskBlock title="Pendentes" value="10" />
                <TaskBlock title="Concluídas" value="12" />
                <TaskBlock title="Tempo gasto" value="12h e 20min" />
            </div>

            <div className="flex items-center w-full max-w-[580px] gap-9">
                <div  className="flex-1">
                    <Input placeholder="Pesquisar tarefa" icon={Search} />
                </div>
                <button title="Criar tarefa" className="flex items-center justify-center text-primary bg-gray01 border-[0.5px] border-gray02 rounded-[9px] w-[60px] h-[48px] cursor-pointer hover:opacity-80"><Plus size={18} /></button>
            </div>

            <div className="flex flex-col gap-12">
                <Task title="Iniciar implementação de telas" />
                <Task title="Implementar login" />
                <Task title="Atividade de IHC" />
            </div>
        </section>    
    )
}