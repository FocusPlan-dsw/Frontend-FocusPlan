"use client";
import { TaskView } from "@/components/TaskView";
import api from "@/lib/api";
import { TaskCompleted } from "@/types/Task";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskPage() {
    const [task, setTask] = useState<TaskCompleted>();

    const router = useRouter();
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
            <button className="mb-10 cursor-pointer" onClick={() => router.back()}>Voltar</button>
            {task ? <TaskView {...task} /> : <p>Carregando...</p>}
        </div>
    );

}