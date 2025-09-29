"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SidePanel } from "@/components/SidePanel";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  password: z.string().refine((password) => !!password, {
    message: "A senha é obrigatória.",
  }),
})


export default function ForgotPassword() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: ""
        }
    })

    function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        console.log(data)
    }

    return (
        <section className="w-full flex max-xl:flex-col">
            <SidePanel />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full justify-center items-center gap-[6.25rem] max-lg:p-5">
                    <h1 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Redefinir senha</h1>

                    <div className="w-full flex flex-col gap-[3.125rem] max-w-[531px]">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input icon={LockKeyhole} placeholder="Digite sua nova senha" id="password" type="text" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button>Alterar senha</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}