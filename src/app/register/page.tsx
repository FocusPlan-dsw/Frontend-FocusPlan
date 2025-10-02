"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import { SidePanel } from "@/components/SidePanel";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UserRound, AtSign, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button";

import api from "@/lib/api";
import { Spin } from "@/components/Spin";

const registerSchema = z.object({
  fullName: z.string().refine((name) => !!name, {
    message: "O nome completo é obrigatório.",
  }),
  
  email: z.string().refine((email) => !!email, {
    message: "O email é obrigatório.",
  }),

  password: z.string().refine((password) => !!password, {
    message: "A senha é obrigatória.",
  }),

  confirmPassword: z.string().refine((password) => !!password, {
    message: "A confirmação de senha é obrigatória.", 
  })
}).refine((password) => password.password === password.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"]
})

export default function Register() {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const [loading, setLoading] = useState(false);

    const onSubmit = async(data: z.infer<typeof registerSchema>) => {
        setLoading(true);

        try {
            await api.post("/auth/register", {
                name: data.fullName,
                email: data.email,
                password: data.password,
                confirmedPassword: data.confirmPassword
            })

            toast.success('Usuário criado com sucesso!')

            setTimeout(() => {    
                router.push("/login");
            }, 2000);

        } catch (error) {
            toast.error('Erro ao criar usuário!')
            console.log(error)
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full flex max-xl:flex-col">
            <SidePanel />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full justify-center items-center gap-[4rem] max-lg:p-5">
                    <h1 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Criar uma conta</h1>

                    <div className="w-full flex flex-col gap-[2rem] max-w-[531px]">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome completo</FormLabel>
                                    <FormControl>
                                        <Input icon={UserRound} placeholder="Nome" id="fullName" type="text" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl>
                                        <Input icon={LockKeyhole} placeholder="Confirme sua senha" id="confirmPassword" type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <p className="text-dark-gray font-light text-[1rem] self-end max-lg:text-[0.75rem]">Já tem uma conta? <Link href="/login" className="text-link underline hover:opacity-80">Faça login</Link></p>

                        <Button disabled={loading}>{loading ? <Spin /> : "Criar conta"}</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}