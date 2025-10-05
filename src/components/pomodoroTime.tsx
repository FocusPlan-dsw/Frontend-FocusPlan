"use client";

import { useTimer } from 'react-timer-hook';
import { Button } from './ui/button';

const getExpiryTimestamp = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 25 * 60);
    return time;
};

export function PomodoroTimer() {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: getExpiryTimestamp(), autoStart: false });

    const isPaused = !isRunning && (minutes * 60 + seconds) < (25 * 60);

    const handleReset = () => {
        restart(getExpiryTimestamp(), false);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center w-[428px] h-[195px] border border-[#9C9C9C] rounded-[10px] bg-[#F3F3F3]">
                <p className="font-medium text-[64px] leading-none text-center text-dark-gray">
                    <span>{minutes.toString().padStart(2, '0')}</span> : <span>{seconds.toString().padStart(2, '0')}</span>
                </p>
            </div>

            <div className="flex gap-4 w-[428px]">
                {isRunning && (
                    <Button onClick={pause} className="flex-1">Pausar</Button>
                )}

                {isPaused && (
                    <>
                        <Button onClick={resume} className="flex-1">Continuar</Button>
                        <Button onClick={handleReset} className="flex-1">Reiniciar</Button>
                    </>
                )}
                
                {!isRunning && !isPaused && (
                    <Button onClick={start} className="flex-1">Começar</Button>
                )}
            </div>
        </div>
    );
}