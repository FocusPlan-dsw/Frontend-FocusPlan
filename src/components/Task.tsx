import { Check, CirclePlay, Trash2 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { TaskCompleted } from "@/types/Task";
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM";
import Link from "next/link";
import { Tooltip,TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
                        <p className="text-dark-gray text-lg font-normal break-words hover:underline max-md:text-[15px] max-md:truncate max-md:block max-md:max-w-[8rem]">{task.title}</p>
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => completedTask && completedTask(task.id)} type="button" className="flex items-center justify-center cursor-pointer rounded-[5px] w-[40px] h-[33px] hover:border-[0.5px] hover:border-shadowTitle transition-all">
                                <Check className="w-5 h-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{task.completed ? "Desmarcar como concluída" : "Marcar como concluída"}</p>
                        </TooltipContent>
                    </Tooltip>
                    
                    <TaskForm defaultValues={{ ...task, estimatedTime: task?.estimatedTime ? minutesToHHMM(task.estimatedTime) : "00:00" }} getTasks={getTasks} isOverdueTask={isOverdue} />
                    
                    {
                        !isOverdue && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="flex items-center justify-center cursor-pointer rounded-[5px] w-[40px] h-[33px] hover:border-[0.5px] hover:border-shadowTitle transition-all" onClick={() => setOpenModalCancel(true)}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Excluir</p>
                                </TooltipContent>
                            </Tooltip>
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