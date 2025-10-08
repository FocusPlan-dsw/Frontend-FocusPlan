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

const getExpiryTimestamp = (duration: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
};

export function PomodoroTimer({ 
    pomodoroState,
    focusDuration,
    breakDuration,
    onTimeSubmit, 
    onExpire,
    onStartFocus,
    onStartBreak,
    onSkipBreak
}: PomodoroTimerProps) {
    
    const duration = pomodoroState === 'break' ? breakDuration : focusDuration;

    const {
        seconds,
        minutes,
        isRunning,
        pause,
        resume,
    } = useTimer({ 
        expiryTimestamp: getExpiryTimestamp(duration), 
        autoStart: pomodoroState === 'focusing' || pomodoroState === 'break',
        onExpire: () => {
            if (pomodoroState === 'focusing') {
                onTimeSubmit(duration);
            }
            onExpire();
        }
    });

    const isPaused = !isRunning && (pomodoroState === 'focusing' || pomodoroState === 'break');

    const handleReset = () => {
        if (pomodoroState === 'focusing') {
            const remainingSeconds = (minutes * 60) + seconds;
            const elapsedSeconds = duration - remainingSeconds;
            
            if (elapsedSeconds > 0) {
                onTimeSubmit(Math.round(elapsedSeconds));
            }
        }

        onSkipBreak(); 
    };

    return (
        <TimerDisplay
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            pomodoroState={pomodoroState}
            onStart={onStartFocus}
            onPause={pause}
            onResume={resume}
            onReset={handleReset}
            onStartBreak={onStartBreak}
            onSkipBreak={onSkipBreak}
        />
    );
}