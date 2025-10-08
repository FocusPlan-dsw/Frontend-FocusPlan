import { Check, CirclePlay, Trash2 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { TaskCompleted } from "@/types/Task";

interface TaskProps {
    title: string
    isCompletedTask: boolean
    isOverdueTask: boolean
    task: TaskCompleted
    view?: boolean
    completedTask?: (id: string) => void
    onClick?: () => void
}

export function Task({ title, isCompletedTask, isOverdueTask, onClick, view, task, completedTask }: TaskProps) {
    const [openModalCancel, setOpenModalCancel] = useState(false);
    

    return (
        <>
            <div className={`flex border border-gray02 rounded-[9px] p-5 justify-between max-w-[47.5rem]
                ${isCompletedTask ? "bg-green-sucess" : isOverdueTask ? "bg-red-200" : "bg-gray01"}
            `}>
                <div className="flex items-center gap-3.5 cursor-pointer" onClick={onClick}>
                    <span className="text-primary"><CirclePlay className="w-3 h-3 sm:w-5 sm:h-5" /></span>
                    <p className="text-dark-gray text-lg font-normal break-words hover:underline">{title}</p>
                </div>

                {!isOverdueTask && !view && (
                    <div className="flex items-center justify-center gap-5">
                        <button onClick={() => completedTask && completedTask(task.id)} title="Concluir" type="button" className="cursor-pointer"><Check className="w-3 h-3 sm:w-5 sm:h-5" /></button>
                        
                        <TaskForm defaultValues={{ title }} />
                        
                        <button title="Excluir" type="button" className="cursor-pointer" onClick={() => setOpenModalCancel(true)}><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                    </div>
                )}
            </div>

            {openModalCancel && (
                <DeleteModal setOpenModalCancel={setOpenModalCancel} />
            )}
        </>
    )
}