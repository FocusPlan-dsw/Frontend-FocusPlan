"use client"
import Link from "next/link";

import { SidePanel } from "@/components/SidePanel";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UserRound, AtSign, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button";

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
})

export default function Register() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    function onSubmit(data: z.infer<typeof registerSchema>) {
        console.log(data)
    }

    return (
        <section className="w-full flex max-xl:flex-col">
            <SidePanel />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full justify-center items-center gap-[6.25rem] max-lg:p-5">
                    <h1 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Criar uma conta</h1>

                    <div className="w-full flex flex-col gap-[3.125rem] max-w-[531px]">
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
                                        <Input icon={LockKeyhole} placeholder="Crie uma senha" id="password" type="text" {...field} />
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
                                        <Input icon={LockKeyhole} placeholder="Confirme sua senha" id="confirmPassword" type="text" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <p className="text-dark-gray font-light text-[1rem] self-end max-lg:text-[0.75rem]">Já tem uma conta? <Link href="/login" className="text-link underline hover:opacity-80">Faça login</Link></p>

                        <Button>Criar conta</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}