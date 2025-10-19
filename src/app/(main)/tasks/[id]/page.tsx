"use client";
import { BackButton } from "@/components/BackButton";
import { TaskView } from "@/components/TaskView";
import api from "@/lib/api";
import { TaskCompleted } from "@/types/Task";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskPage() {
    const [task, setTask] = useState<TaskCompleted>();

    const params = useParams();

    const { id } = params;

    const getTaskById = async (id: string) => {
        try {
            const response = await api.get(`/tasks/${id}`);
            setTask(response.data)

        } catch (error) {
            toast.error("Erro ao buscar tarefa");
        }
    }
    
    useEffect(() => {
        if (id && typeof id === "string") {
            getTaskById(id);
        }
    }, [id]);


    return (
        <div>
            <BackButton />
            {task ? <TaskView {...task} /> : <p>Carregando...</p>}
        </div>
    );

}