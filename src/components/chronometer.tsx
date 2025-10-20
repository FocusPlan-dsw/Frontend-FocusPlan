"use client";

import { useStopwatch } from 'react-timer-hook';
import { TimerDisplay } from './TimerDisplay';

interface ChronometerProps {
    onTimeSubmit: (elapsedSeconds: number) => void;
}

export function Chronometer({ onTimeSubmit }: ChronometerProps) {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const isPaused = !isRunning && (minutes > 0 || seconds > 0);

    const totalMinutes = (hours * 60) + minutes;

    const handleReset = () => {
        const elapsedSeconds = (totalMinutes * 60) + seconds;
        
        if (elapsedSeconds > 0) {
            onTimeSubmit(Math.round(elapsedSeconds));
        }
        
        reset(undefined, false);
    };

    return (
        <TimerDisplay
            minutes={totalMinutes}
            seconds={seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={start}
            onPause={pause}
            onResume={start}
            onReset={handleReset}
        />
    );
}