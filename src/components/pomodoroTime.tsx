"use client";

import { useTimer } from 'react-timer-hook';
import { TimerDisplay } from './TimerDisplay';

const POMODORO_DURATION_SECONDS = 25 * 60;

const getExpiryTimestamp = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + POMODORO_DURATION_SECONDS);
    return time;
};

interface PomodoroTimerProps {
    onTimeSubmit: (elapsedSeconds: number) => void;
}

export function PomodoroTimer({ onTimeSubmit }: PomodoroTimerProps) {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: getExpiryTimestamp(), autoStart: false });

    const isPaused = !isRunning && (minutes * 60 + seconds) < POMODORO_DURATION_SECONDS;

    const handleReset = () => {
        const remainingSeconds = (minutes * 60) + seconds;
        const elapsedSeconds = POMODORO_DURATION_SECONDS - remainingSeconds;
        
        if (elapsedSeconds > 0) {
            onTimeSubmit(Math.round(elapsedSeconds));
        }

        restart(getExpiryTimestamp(), false);
    };

    return (
        <TimerDisplay
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={start}
            onPause={pause}
            onResume={resume}
            onReset={handleReset}
        />
    );
}