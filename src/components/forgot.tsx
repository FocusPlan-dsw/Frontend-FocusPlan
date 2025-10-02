"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SidePanel } from "@/components/SidePanel";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AtSign } from "lucide-react"
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { Spin } from "@/components/Spin";

const forgotPasswordSchema = z.object({
  email: z.string().refine((email) => !!email, {
    message: "O email é obrigatório.",
  }),
})

interface ForgotProps {
    onCodeVerified: () => void;
    setEmail: (email: string) => void
}

export default function Forgot({ onCodeVerified, setEmail }: ForgotProps) {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    })

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        setLoading(true);

        try {
            await api.post("/auth/forgot-password", {
                email: data.email
            })

            toast.success('Email enviado com sucesso!')
            onCodeVerified();
            setEmail(data.email);
       
        } catch (error) {
            toast.error('Erro ao enviar email!')
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full flex max-xl:flex-col">
            <SidePanel />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full justify-center items-center gap-[6.25rem] max-lg:p-5">
                    <h1 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Esqueci minha senha</h1>
                    
                    <div className="w-full flex flex-col gap-[3.125rem] max-w-[531px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input icon={AtSign} placeholder="Digite o email cadastrado" id="email" type="text" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button>{loading ? <Spin /> : "Recuperar minha senha"}</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}