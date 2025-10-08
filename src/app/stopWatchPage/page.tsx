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
import { showNotification } from "@/lib/notification";

type TimerMode = 'stopwatch' | 'pomodoro';
type PomodoroState = 'idle' | 'focusing' | 'break' | 'focus_ended';

function parseTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

function formatDedicatedTime(totalSeconds: number): string {
    if (totalSeconds === 0) return "";
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 && hours === 0 && minutes === 0) parts.push(`${seconds}s`); 

    return ` - ${parts.join(' ')}`;
}

export default function StopWatchPage() {
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro'); // Mudei o padrão para pomodoro para facilitar o teste
    const [selectedModeInDialog, setSelectedModeInDialog] = useState<TimerMode>(timerMode);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPomodoroSettingsOpen, setIsPomodoroSettingsOpen] = useState(false);
    
    const [dedicatedTime, setDedicatedTime] = useState(0);

    const [pomodoroState, setPomodoroState] = useState<PomodoroState>('idle');
    const [focusDuration, setFocusDuration] = useState(25 * 60);
    const [breakDuration, setBreakDuration] = useState(10 * 60);
    
    const [tempFocusTime, setTempFocusTime] = useState("00:25:00");
    const [tempBreakTime, setTempBreakTime] = useState("00:10:00");

    const handleTimeSubmit = (elapsedSeconds: number) => {
        setDedicatedTime(prevTime => prevTime + elapsedSeconds);
    };

    const handleSaveChanges = () => {
        setTimerMode(selectedModeInDialog);
        setIsDialogOpen(false);
    };

    const handlePomodoroSettingsSave = () => {
        const newFocusSeconds = parseTimeToSeconds(tempFocusTime);
        const newBreakSeconds = parseTimeToSeconds(tempBreakTime);
        setFocusDuration(newFocusSeconds > 0 ? newFocusSeconds : 1 * 60);
        setBreakDuration(newBreakSeconds > 0 ? newBreakSeconds : 10 * 60);
        setIsPomodoroSettingsOpen(false);
    };

    const handleTimerExpire = () => {
        if (pomodoroState === 'focusing') {
            showNotification('Foco Concluído!', 'Hora de fazer uma pausa.');
            setPomodoroState('focus_ended');
        } else if (pomodoroState === 'break') {
            showNotification('Pausa Terminada!', 'Vamos voltar ao foco?');
            setPomodoroState('idle');
        }
    };

    const handleStartFocus = () => setPomodoroState('focusing');
    const handleStartBreak = () => setPomodoroState('break');
    const handleSkipBreak = () => setPomodoroState('idle');

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-transparent">
            <div className="flex flex-col w-full items-center gap-10 max-lg:gap-8 max-w-3xl">
                <div className="w-full flex flex-col items-center gap-12 sm:gap-8 md:gap-12">
                    <img src="/white-logo.svg" alt="logo branca" className="w-48 md:w-64" />
                    
                    <div className="flex items-center w-full max-w-md py-3 px-4 border border-[#9C9C9C] rounded-[9px] bg-[#F5F5F5] gap-3">
                        <Logs className="flex-shrink-0 h-4 w-4 text-gray-600" />
                        <p className="truncate text-sm">
                            Iniciar implementação de telas
                            <span className="font-normal text-gray-600">
                                {formatDedicatedTime(dedicatedTime)}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
                    {timerMode === 'stopwatch' 
                        ? <Chronometer onTimeSubmit={handleTimeSubmit} /> 
                        : <PomodoroTimer
                            key={`${pomodoroState}-${focusDuration}-${breakDuration}`}
                            pomodoroState={pomodoroState}
                            focusDuration={focusDuration}
                            breakDuration={breakDuration}
                            onTimeSubmit={handleTimeSubmit}
                            onExpire={handleTimerExpire}
                            onStartFocus={handleStartFocus}
                            onStartBreak={handleStartBreak}
                            onSkipBreak={handleSkipBreak}
                          />
                    }
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-lg">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                             <DialogTrigger asChild>
                                 <Button variant="outline" className="w-full sm:flex-1 bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
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

                        <Dialog open={isPomodoroSettingsOpen} onOpenChange={setIsPomodoroSettingsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full sm:flex-1 bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                                    <Timer className="mr-2 h-4 w-4" />
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
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-4">
                                    <TimePicker label="Tempo de foco" value={tempFocusTime} onChange={setTempFocusTime} />
                                    <TimePicker label="Tempo de pausa" value={tempBreakTime} onChange={setTempBreakTime} />
                                </div>
                                <DialogFooter>
                                    <Button onClick={handlePomodoroSettingsSave} className="w-[75px] text-sm weight-medium">Salvar</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button asChild variant="outline" className="w-full sm:flex-1 bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                            <Link href="/">
                                <ClipboardList className="mr-2 h-4 w-4" />
                                Tarefas
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}