import { Label } from "@radix-ui/react-label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useState } from "react";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { Spin } from "./Spin";
import { SidePanel } from "./SidePanel";

interface EnterCodeProps {
    email: string;
    onCodeVerified: () => void;
    onCodeEntered: (code: string) => void;
}

export function EnterCode( { email, onCodeVerified, onCodeEntered }: EnterCodeProps ) {
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState('');

    const handleVerifyCode = async (code: string) => {
        try {
            const res = await api.post("/auth/verify-code", {
                code
            })

            if (res.status === 200) {
                toast.success("Código verificado com sucesso!")
                onCodeEntered(code);
                onCodeVerified();
            }

        } catch (error) {
            toast.error("Código inválido")
        }
    }

    const resendCode = async (email: string) => {
        setLoading(true);
        try {
            const res = await api.post("/api/auth/forgot-password", {
                email
            })

            if (res.status === 200) {
                toast.success("Código reenviado com sucesso!")
                
                onCodeVerified();

            } else {
                toast.error("Código inválido")
            }

        } catch (error) {
            toast.error("Erro inesperado")

        } finally {
            setLoading(false);
        } 
    }

    return (
        <section className="w-full flex max-xl:flex-col">
            <SidePanel />

            <div className="flex flex-col w-full justify-center items-center gap-[6.25rem] max-lg:p-5">
                <h2 className="font-bold text-[2.5rem] text-primary max-lg:text-[1.5rem]">Esqueci minha senha</h2>
                <Label htmlFor="code">Insira o código enviado para {email}</Label>
                
                <div className="w-full flex flex-col gap-[3.125rem] max-w-[531px] items-center">
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={(value) => setCode(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    <Button variant="link" type="button" onClick={() => resendCode(email)}>
                        Reenviar o código
                    </Button>
                    
                    <Button onClick={() => handleVerifyCode(code)}>{loading ? <Spin /> : "Enviar código"}</Button>
                </div>
            </div>
        </section>
    )
}