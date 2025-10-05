"use client";

import { useState } from "react";
import { Chronometer } from "@/components/chronometer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Logs, Hourglass, ClipboardList, Timer } from "lucide-react";
import Link from "next/link";
import { PomodoroTimer } from "@/components/pomodoroTime";
import { TimePicker } from "@/components/time-picker";

type TimerMode = 'stopwatch' | 'pomodoro';

export default function StopWatchPage() {
    const [timerMode, setTimerMode] = useState<TimerMode>('stopwatch');
    
    const [selectedModeInDialog, setSelectedModeInDialog] = useState<TimerMode>(timerMode);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSaveChanges = () => {
        setTimerMode(selectedModeInDialog);
        setIsDialogOpen(false);
    };

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center p-4 bg-gradient-transparent">
            <div className="flex flex-col w-full items-center gap-10 max-lg:gap-8 max-w-3xl">
                <img src="/white-logo.svg" alt="logo branca" width={255} height={64} />
                <div className="flex items-center w-full max-w-[759px] h-[57px] border border-[#9C9C9C] rounded-[9px] bg-[#F5F5F5] p-[17px] gap-[17px]">
                    <Logs />
                    <p>Iniciar implementação de telas</p>
                </div>

                {timerMode === 'stopwatch' ? <Chronometer /> : <PomodoroTimer />}

                <div className="flex items-center justify-center gap-4 md:gap-6 w-full">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-[169px] bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                                <Hourglass className="mr-2 h-4 w-4" />
                                Modo do Timer
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Modo do Timer</DialogTitle>
                                <DialogDescription>
                                    Selecione o modo do timer que você quer usar.
                                </DialogDescription>
                            </DialogHeader>
                            <RadioGroup 
                                value={selectedModeInDialog} 
                                onValueChange={(value: string) => setSelectedModeInDialog(value as TimerMode)}
                                className="py-4 space-y-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pomodoro" id="pomodoro" />
                                    <Label htmlFor="pomodoro">Pomodoro com contagem regressiva (de 25:00 até o fim do timer)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="stopwatch" id="stopwatch" />
                                    <Label htmlFor="stopwatch">Começar a contar do 00:00 até o momento que você parar manualmente</Label>
                                </div>
                            </RadioGroup>
                            <DialogFooter>
                                <Button onClick={handleSaveChanges} className="w-[75px] text-sm weight-medium">Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex items-center w-[169px] bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                                <Timer className="mr-2" />
                                Pomodoro
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Configurar Pomodoro</DialogTitle>
                                <DialogDescription>
                                    Defina o tempo de foco e de pausa/descanso que você deseja utilizar.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-16">
                                <TimePicker label="Tempo de foco" defaultValue="00:00:00" />
                                <TimePicker label="Tempo de pausa" defaultValue="00:00:00" />
                            </div>
                            <DialogFooter>
                                <Button className="w-[75px] text-sm weight-medium">Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button asChild variant="outline" className="w-[169px] bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                        <Link href="/">
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Tarefas
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}