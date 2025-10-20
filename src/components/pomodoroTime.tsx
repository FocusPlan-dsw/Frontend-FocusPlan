"use client";

import { useTimer } from 'react-timer-hook';
import { TimerDisplay } from './TimerDisplay';

type PomodoroState = 'idle' | 'focusing' | 'break' | 'focus_ended';

interface PomodoroTimerProps {
    pomodoroState: PomodoroState;
    focusDuration: number;
    breakDuration: number;
    onTimeSubmit: (elapsedSeconds: number) => void;
    onExpire: () => void;
    onStartFocus: () => void;
    onStartBreak: () => void;
    onSkipBreak: () => void;
}

export function PomodoroTimer({
    pomodoroState,
    focusDuration,
    breakDuration,
    onTimeSubmit,
    onExpire,
    onStartFocus,
    onStartBreak,
    onSkipBreak,
}: PomodoroTimerProps) {

    const getDuration = () => {
        switch (pomodoroState) {
            case 'focusing':
                return focusDuration;
            case 'break':
                return breakDuration;
            case 'idle':
            case 'focus_ended':
            default:
                return focusDuration;
        }
    }
    const durationInSeconds = getDuration();

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + durationInSeconds);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
        resume,
    } = useTimer({ 
        expiryTimestamp, 
        onExpire: onExpire,
        
        autoStart: pomodoroState === 'focusing' || pomodoroState === 'break'
    });

    const totalMinutes = (hours * 60) + minutes;

    const isPaused = !isRunning && durationInSeconds > (totalMinutes * 60 + seconds);

    const handleStart = () => {
        onStartFocus();
    };

    const handleReset = () => {
        const initialDuration = (pomodoroState === 'focusing') ? focusDuration : breakDuration;
        const remainingSeconds = (totalMinutes * 60) + seconds;
        const elapsedSeconds = initialDuration - remainingSeconds;

        if (pomodoroState === 'focusing' && elapsedSeconds > 0) {
            onTimeSubmit(Math.round(elapsedSeconds));
        }

        onSkipBreak(); 
    };

    return (
        <TimerDisplay
            minutes={totalMinutes}
            seconds={seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            pomodoroState={pomodoroState}
            onStart={handleStart}
            onPause={pause}
            onResume={resume}
            onReset={handleReset}
            onStartBreak={onStartBreak}
            onSkipBreak={onSkipBreak}
        />
    );
}