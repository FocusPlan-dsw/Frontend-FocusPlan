"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SidePanel } from "@/components/SidePanel";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spin } from "./Spin";

const resetPasswordSchema = z.object({
  password: z.string().refine((password) => !!password, {
    message: "A senha é obrigatória.",
  }),
})

interface ResetPasswordProps {
    code: string
}

export default function ResetPassword({ code }: ResetPasswordProps) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        setLoading(true);

        try {
            const res = await api.post("/auth/reset-password", {
                code: code,
                password: data.password
            })

            if (res.status === 200) {
                toast.success('Senha redefinida com sucesso!')
                
                setTimeout(() => {    
                    router.push("/login");
                }, 2000);
            }


        } catch (error) {
            toast.error('Erro ao alterar senha!')
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nova senha</FormLabel>
                                    <FormControl>
                                        <Input icon={LockKeyhole} placeholder="Digite a sua nova senha" id="passwordRP" type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button>{loading ? <Spin /> : "Redefinir senha"}</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}