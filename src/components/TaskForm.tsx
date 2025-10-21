"use client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CalendarIcon, Pen, Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import api from "@/lib/api"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { convertEstimatedTimeToMinutes } from "@/utils/ConvertEstimatedTimeToMinutes"
import { minutesToHHMM } from "@/utils/ConvertMinutesToHHMM" 
import { Spin } from "./Spin"

const createTaskSchema = z.object({
  title: z.string().refine((title) => !!title, {
    message: "O titulo da tarefa é obrigatório.",
  }),
  description: z.string().optional(),
  startDate: z.optional(z.date()),
  dueDate: z.optional(z.date()),

  estimatedTime: z.optional(z.string()),
})

type TaskFormData = z.infer<typeof createTaskSchema>;

interface TaskFormProps {
  defaultValues?: TaskFormData & { id?: string }
  getTasks?: () => void
  isOverdueTask?: boolean
}

export function TaskForm({ defaultValues, getTasks, isOverdueTask }: TaskFormProps) {
    const form = useForm<TaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            startDate: undefined,
            dueDate: undefined,
            estimatedTime: ""
        }
    })

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (defaultValues) {
            const valuesToSet = {
                ...defaultValues,
                startDate: defaultValues.startDate ? new Date(defaultValues.startDate) : undefined,
                dueDate: defaultValues.dueDate ? new Date(defaultValues.dueDate) : undefined,
            };
            form.reset(valuesToSet);
        } else {
            form.reset({
                title: "",
                description: "",
                startDate: undefined,
                dueDate: undefined,
                estimatedTime: ""
            });
        }
    }, [defaultValues, form, open]);

    const maskEstimatedTime = (value: string) => {
        let v = value.replace(/\D/g, "").slice(0, 4)
        if (v.length >= 3) {
            v = v.slice(0, 2) + ":" + v.slice(2)
        }
        return v
    }  

    const createTask = async (data: TaskFormData) => {
        setLoading(true);
        try {
            await api.post("/tasks", {
                title: data.title,
                description: data.description ?? "Sem descrição",
                startDate: data.startDate,
                dueDate: data.dueDate,
                estimatedTime: convertEstimatedTimeToMinutes(data.estimatedTime ?? "00:00"),
            })
            setOpen(false);
            toast.success('Tarefa criada com sucesso!')
            if (getTasks) getTasks();
        } catch (error) {
            console.log(error)
            toast.error('Erro ao criar tarefa!')
        } finally {
            setLoading(false);
        }
    }

    const updateTask = async (data: TaskFormData & { id: string }) => {
        setLoading(true);
        try {
            await api.put(`/tasks/${data.id}`, {
                title: data.title,
                description: data.description ?? "Sem descrição",
                startDate: data.startDate,
                dueDate: data.dueDate,
                estimatedTime: convertEstimatedTimeToMinutes(data.estimatedTime ?? "00:00"),
            })
            setOpen(false);
            toast.success('Tarefa atualizada com sucesso!')
            if (getTasks) getTasks();
        } catch (error) {
            console.log(error)
            toast.error('Erro ao atualizar tarefa!')
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (data: TaskFormData) => {
        if (defaultValues?.id) {
            updateTask({ ...data, id: defaultValues.id });
        } else {
            createTask(data);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {
                    defaultValues ? (
                        <button title="Editar" type="button" className="cursor-pointer"><Pen className="w-4 h-4" /></button>
                    ) : (
                        <button title="Criar tarefa" className="flex items-center justify-center text-primary bg-gray01 border-[0.5px] border-gray02 rounded-[9px] w-[60px] h-[48px] cursor-pointer hover:opacity-80"><Plus size={18} /></button>
                    )
                }
            </SheetTrigger>
            <SheetContent className="overflow-y-auto overflow-x-hidden max-[1025px]:pb-10">
                <SheetHeader>
                    <SheetTitle>{defaultValues ? "Editar tarefa" : "Criar nova tarefa"}</SheetTitle>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-5">
                        <div className="w-full flex flex-col gap-[2rem]">
                            
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title" className="text-[14px] font-medium">Título</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite um título para a tarefa" id="title" type="text" className="border-gray04 rounded-[6px]" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="description" className="text-[14px] font-medium">Descrição</FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="description"
                                                data-slot="textarea"
                                                placeholder="Descreva a atividade"
                                                className={cn(
                                                    "placeholder:text-gray02 focus-visible:border-primary placeholder:text-[13px] dark:bg-input/30 border border-gray04 w-full min-w-0 rounded-[6px] bg-transparent py-2 px-3 text-base transition-color outline-none resize-none h-[6rem] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {!isOverdueTask && (
                                <div className="flex flex-col gap-4">
                                    <p className="text-[14px] font-medium text-dark-gray">Prazo estimado</p>
                                    <div className="flex gap-6 max-md:flex-col">
                                        
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-primary text-[11px] font-normal">Início</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    data-empty={!field.value}
                                                                    className="data-[empty=true]:text-date w-[165px] justify-start text-left font-normal"
                                                                >
                                                                    <CalendarIcon />
                                                                    {field.value ? format(field.value, "dd/MM/yyyy") : <span className="max-md:text-[12px]">Data de início</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar mode="single" selected={field.value} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} onSelect={(date) => {
                                                                    const dueDate = form.getValues("dueDate");
                                                                    if (dueDate && date && date > dueDate) {
                                                                        const newDate = new Date(dueDate);
                                                                        newDate.setDate(newDate.getDate() - 1);
                                                                        form.setValue("startDate", newDate)
                                                                    } else {
                                                                        field.onChange(date)
                                                                    }
                                                                }} />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="dueDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-primary text-[11px] font-normal">Conclusão</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    data-empty={!field.value}
                                                                    className="data-[empty=true]:text-date w-[165px] justify-start text-left font-normal"
                                                                >
                                                                    <CalendarIcon />
                                                                    {field.value ? format(field.value, "dd/MM/yyyy") : <span className="max-md:text-[12px]">Data de conclusão</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar mode="single" selected={field.value} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} onSelect={(date) => {
                                                                    const startDate = form.getValues("startDate");
                                                                    if (startDate && date && date < startDate) {
                                                                        const newDate = new Date(startDate);
                                                                        newDate.setDate(newDate.getDate() + 1);
                                                                        form.setValue("dueDate", newDate)
                                                                    } else {
                                                                        field.onChange(date)
                                                                    }
                                                                }} />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="estimatedTime"
                                render={({ field }) => {
                                    const totalMinutes = convertEstimatedTimeToMinutes(field.value);

                                    return (
                                        <FormItem>
                                            <FormLabel htmlFor="estimatedTime" className="text-[14px] font-medium">Tempo estimado</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="00:00" 
                                                    id="estimatedTime" 
                                                    type="text" 
                                                    className="border-gray04 rounded-[6px]" 
                                                    {...field}
                                                    onChange={(e) => {
                                                        const masked = maskEstimatedTime(e.target.value)
                                                        field.onChange(masked)
                                                    }}
                                                />
                                            </FormControl>
                                            <p className="text-primary text-[11px]">
                                                Equivale a: {minutesToHHMM(totalMinutes)}
                                            </p>
                                        </FormItem>
                                    )
                                }}
                            />
                            
                            <Button type="submit" size="sm" disabled={loading}>{loading ? <Spin /> : (defaultValues ? "Salvar" : "Criar")}</Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}