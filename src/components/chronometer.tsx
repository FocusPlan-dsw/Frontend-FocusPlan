"use client";

import { useStopwatch } from 'react-timer-hook';
import { Button } from './ui/button';

export function Chronometer() {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const isPaused = !isRunning && (minutes > 0 || seconds > 0);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center w-[428px] h-[195px] border border-[#9C9C9C] rounded-[10px] bg-[#F3F3F3]">
                <p className="font-medium text-[64px] leading-none text-center text-dark-gray">
                    <span>{formattedMinutes}</span> : <span>{formattedSeconds}</span>
                </p>
            </div>

            <div className="flex gap-4 w-[428px]">
                {isRunning && (
                    <Button onClick={pause} className="flex-1">Pausar</Button>
                )}

                {isPaused && (
                    <>
                        <Button onClick={start} className="flex-1">Continuar</Button>
                        <Button onClick={() => reset(undefined, false)} className="flex-1">Reiniciar</Button>
                    </>
                )}
                
                {!isRunning && !isPaused && (
                    <Button onClick={start} className="flex-1">Começar</Button>
                )}
            </div>
        </div>
    );
}