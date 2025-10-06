import { Check, CirclePlay, Trash2 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

interface TaskProps {
    title: string
    onClick?: () => void
}

export function Task({ title, onClick }: TaskProps) {
    const [openModalCancel, setOpenModalCancel] = useState(false);

    return (
        <>
            <div className="flex bg-gray01 border border-gray02 rounded-[9px] p-4 justify-between max-w-[47.5rem]">
                <div className="flex items-center gap-[17px] cursor-pointer" onClick={onClick}>
                    <span className="text-primary"><CirclePlay className="w-3 h-3 sm:w-5 sm:h-5" /></span>
                    <p className="text-dark-gray text-lg font-normal break-words hover:underline">{title}</p>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <button title="Concluir" type="button" className="cursor-pointer"><Check className="w-3 h-3 sm:w-5 sm:h-5" /></button>
                    <TaskForm onSubmit={(data) => console.log("Editar:", data)} defaultValues={{ title }} />
                    <button title="Excluir" type="button" className="cursor-pointer" onClick={() => setOpenModalCancel(true)}><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                </div>
            </div>

            {openModalCancel && (
                <DeleteModal setOpenModalCancel={setOpenModalCancel} />
            )}
        </>
    )
}