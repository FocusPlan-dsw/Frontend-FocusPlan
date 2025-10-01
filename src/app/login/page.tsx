"use client"
import { SidePanel } from "@/components/SidePanel";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { AtSign, LockKeyhole } from "lucide-react"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/lib/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "@/components/Spin";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().refine((email) => !!email, {
    message: "O email é obrigatório.",
  }),

  password: z.string().refine((password) => !!password, {
    message: "A senha é obrigatória.",
  }),
})

export default function Login() {
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (data: z.infer<typeof loginSchema>) =>{
        setLoading(true);
        console.log(data.password)

        try {
            const response = await api.post("/auth/login", {
                email: data.email,
                password: data.password
            })

            localStorage.setItem("token", response.data);
            toast.success('Usuário logado com sucesso!')

            setTimeout(() => {    
                router.push("/home");
            }, 3500);

        } catch (error) {
            toast.error('Erro ao logar usuário!')
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
                    <h1 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Acesse sua conta</h1>

                    <div className="w-full flex flex-col gap-[3.125rem] max-w-[531px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input icon={AtSign} placeholder="Digite seu email" id="email" type="text" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input icon={LockKeyhole} placeholder="Crie uma senha" id="password" type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Link href="/forgotPassword" className="text-link font-light text-[0.9rem] self-end underline hover:opacity-80 max-lg:text-[0.75rem]">Esqueceu sua senha?</Link>

                        <Button disabled={loading}>{loading ? <Spin /> : "Entrar"}</Button>

                        <p className="text-dark-gray font-light text-[1rem] self-end max-lg:text-[0.75rem]">Não tem uma conta? <Link href="/register" className="text-link underline hover:opacity-80">Crie uma conta</Link></p>
                    </div>
                </form>
            </Form>
        </section>
    )
}