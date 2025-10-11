"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Logs, Hourglass, ClipboardList, Timer } from "lucide-react";

import { Chronometer } from "@/components/chronometer";
import { PomodoroTimer } from "@/components/pomodoroTime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/time-picker";
import { showNotification } from "@/lib/notification";

import { TaskCompleted } from "@/types/Task";
import api from "@/lib/api";

type TimerMode = 'stopwatch' | 'pomodoro';
type PomodoroState = 'idle' | 'focusing' | 'break' | 'focus_ended';

function parseTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + (seconds || 0);
}

function formatDedicatedTime(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds === 0) return "";
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    if (parts.length === 0 && totalSeconds > 0) {
        return " - menos de 1 minuto";
    }
    
    return ` - ${parts.join(' ')}`;
}

export default function StopWatchPage() {
    const params = useParams();
    const id = params.id as string;

    const [task, setTask] = useState<TaskCompleted | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');
    const [dedicatedTime, setDedicatedTime] = useState(0);
    const [pomodoroState, setPomodoroState] = useState<PomodoroState>('idle');
    const [focusTime, setFocusTime] = useState('00:25:00');
    const [breakTime, setBreakTime] = useState('00:05:00');
    const [tempFocusTime, setTempFocusTime] = useState(focusTime);
    const [tempBreakTime, setTempBreakTime] = useState(breakTime);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPomodoroSettingsOpen, setIsPomodoroSettingsOpen] = useState(false);
    const [selectedModeInDialog, setSelectedModeInDialog] = useState<TimerMode>(timerMode);

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                setIsLoading(true);
                try {
                    const response = await api.get<TaskCompleted>(`/tasks/${id}`);
                    setTask(response.data);
                    setDedicatedTime(response.data.timeDedicated || 0);
                } catch (err) {
                    console.error("Erro ao buscar a tarefa:", err);
                    setError("Não foi possível carregar a tarefa.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleTimeSubmit = async (elapsedSeconds: number) => {
        if (!id || elapsedSeconds <= 0) return;
        
        const roundedSeconds = Math.round(elapsedSeconds);

        setDedicatedTime(prevTime => prevTime + roundedSeconds);

        try {
            await api.post(`/tasks/${id}/time-dedicated`, {
                time: roundedSeconds
            });
        } catch (error) {
            console.error("Erro ao salvar o tempo dedicado:", error);
            setDedicatedTime(prevTime => prevTime - roundedSeconds);
        }
    };

    const handleSaveChanges = () => {
        setTimerMode(selectedModeInDialog);
        setIsDialogOpen(false);
    };
    const handlePomodoroSettingsSave = () => {
        setFocusTime(tempFocusTime);
        setBreakTime(tempBreakTime);
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

    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center">Carregando tarefa...</div>;
    }
    if (error) {
        return <div className="flex h-screen w-full items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-transparent">
            <div className="flex flex-col w-full items-center gap-10 max-lg:gap-8 max-w-3xl">
                <div className="w-full flex flex-col items-center gap-12 sm:gap-8 md:gap-12">
                    <img src="/white-logo.svg" alt="logo branca" className="w-48 md:w-64" />
                    
                    <div className="flex items-center w-full max-w-md py-3 px-4 border border-[#9C9C9C] rounded-[9px] bg-[#F5F5F5] gap-3">
                        <Logs className="flex-shrink-0 h-4 w-4 text-gray-600" />
                        <p className="truncate text-sm">
                            {task?.title}
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
                            key={`${pomodoroState}-${focusTime}-${breakTime}`}
                            pomodoroState={pomodoroState}
                            focusDuration={parseTimeToSeconds(focusTime)}
                            breakDuration={parseTimeToSeconds(breakTime)}
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
                                      <DialogDescription>Selecione o modo do timer que você quer usar.</DialogDescription>
                                  </DialogHeader>
                                  <RadioGroup value={selectedModeInDialog} onValueChange={(value: string) => setSelectedModeInDialog(value as TimerMode)} className="py-4 space-y-4">
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
                                      <DialogDescription>Defina o tempo de foco e de pausa/descanso que você deseja utilizar.</DialogDescription>
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
                              <Link href="/tasks">
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