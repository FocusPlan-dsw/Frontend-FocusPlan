import { Check, CirclePlay, Trash2 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { TaskCompleted } from "@/types/Task";
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM";
import Link from "next/link";

interface TaskProps {
    task: TaskCompleted
    getTasks?: () => void
    completedTask?: (id: string) => void
    onClick?: () => void
}

export function Task({ task, getTasks, completedTask }: TaskProps) {
    const [openModalCancel, setOpenModalCancel] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let isOverdue = false;

    if (task.dueDate) {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        
        if (due < today) {
            isOverdue = true; 
        }
    }

    return (
        <>
            <div className={`flex border border-gray02 rounded-[9px] p-5 justify-between max-w-[47.5rem] max-lg:max-w-full
                ${task.completed ? "bg-green-sucess" : isOverdue ? "bg-red-200" : "bg-gray01"}
            `}>
                <div className="flex items-center gap-3.5">
                    <Link
                        href={`/stopWatchPage/${task.id}`}
                        className="text-primary"
                        title="Iniciar cronômetro"
                    >
                        <CirclePlay className="w-6 h-6 sm:w-5 sm:h-5" />
                    </Link>

                    <Link className="cursor-pointer" href={`/tasks/${task.id}`}>
                        <p className="text-dark-gray text-lg font-normal break-words hover:underline">{task.title}</p>
                    </Link>
                </div>

                
                <div className="flex items-center justify-center gap-5">
                    <button onClick={() => completedTask && completedTask(task.id)} title={task.completed ? "Desmarcar como concluída" : "Marcar como concluída"} type="button" className="cursor-pointer"><Check className="w-5 h-5" /></button>
                    
                    <TaskForm defaultValues={{ ...task, estimatedTime: task?.estimatedTime ? minutesToHHMM(task.estimatedTime) : "00:00" }} getTasks={getTasks} isOverdueTask={isOverdue} />
                    
                    {
                        !isOverdue && (
                            <button title="Excluir" type="button" className="cursor-pointer" onClick={() => setOpenModalCancel(true)}><Trash2 className="w-4 h-4" /></button>
                        )
                    }
                </div>
                  
            </div>

            {openModalCancel && (
                <DeleteModal id={task.id} getTasks={getTasks} setOpenModalCancel={setOpenModalCancel} />
            )}
        </>
    )
}