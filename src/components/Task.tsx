import { Check, CirclePlay, Trash2 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { TaskCompleted } from "@/types/Task";
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM";
import Link from "next/link";

interface TaskProps {
    title: string
    isCompletedTask?: boolean
    isOverdueTask?: boolean
    task: TaskCompleted
    view?: boolean
    getTasks?: () => void
    completedTask?: (id: string) => void
    onClick?: () => void
}

export function Task({ title, isCompletedTask, isOverdueTask, view, task, getTasks, completedTask }: TaskProps) {
    const [openModalCancel, setOpenModalCancel] = useState(false);

    return (
        <>
            <div className={`flex border border-gray02 rounded-[9px] p-5 justify-between max-w-[47.5rem] max-lg:max-w-full
                ${isCompletedTask ? "bg-green-sucess" : isOverdueTask ? "bg-red-200" : "bg-gray01"}
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
                        <p className="text-dark-gray text-lg font-normal break-words hover:underline">{title}</p>
                    </Link>
                </div>

                {!isOverdueTask && !view && (
                    <div className="flex items-center justify-center gap-5">
                        <button onClick={() => completedTask && completedTask(task.id)} title="Concluir" type="button" className="cursor-pointer"><Check className="w-5 h-5" /></button>
                        
                        <TaskForm defaultValues={{ ...task, estimatedTime: task?.estimatedTime ? minutesToHHMM(task.estimatedTime) : "00:00" }} getTasks={getTasks} />
                        
                        <button title="Excluir" type="button" className="cursor-pointer" onClick={() => setOpenModalCancel(true)}><Trash2 className="w-4 h-4" /></button>
                    </div>
                )}
            </div>

            {openModalCancel && (
                <DeleteModal id={task.id} getTasks={getTasks} setOpenModalCancel={setOpenModalCancel} />
            )}
        </>
    )
}