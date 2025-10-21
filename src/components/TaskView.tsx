import { TaskCompleted } from "@/types/Task";
import { Calendar, ClipboardList, Clock } from "lucide-react"
import { TaskViewCard } from "./TaskViewCard";

export function TaskView({ 
  title, 
  description, 
  completed, 
  estimatedTime, 
  startDate, 
  dueDate,
  actualStartDate,
  actualEndDate,
  elapsedTime
}: TaskCompleted) {
  
  const getTaskStatus = (completed: boolean, dueDate?: Date) => {
    if (completed) return { label: "Concluída", style: "text-green-text bg-green-sucess" };
    
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      
      if (due < today) {
        return { label: "Atrasada", style: "text-[#b91c1c] bg-[#fee2e2]" };
      }
    }
    
    return { label: "Em andamento", style: "text-[#b45309] bg-[#fef3c7] " };
  };
  
  const status = getTaskStatus(completed, dueDate);
  
  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <ClipboardList size={30} className="text-primary"/>
          <h1 className="text-primary text-3xl max-md:text-lg m-0 leading-none">{title}</h1>
        </div>
        <span className={`text-sm px-7 py-2 rounded-full max-md:px-5 max-md:text-[12px] whitespace-nowrap ${status.style}`}>
          {status.label}
        </span>
      </div>
      
      <p className="text-xl max-md:text-lg">{description ?? "Atividade sem descrição"}</p>
      
      <TaskViewCard 
        title="Planejamento" 
        icon={Calendar}
        type="planned"
        startDate={startDate}
        dueDate={dueDate}
        estimatedTime={estimatedTime}
      />
      

      <TaskViewCard 
        title="Execução" 
        icon={Clock}
        type="executed"
        actualStartDate={actualStartDate}
        actualEndDate={actualEndDate}
        elapsedTime={elapsedTime}
      />
    </section>
  )
}