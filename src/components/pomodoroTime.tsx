"use client";

import { useTimer } from 'react-timer-hook';
import { TimerDisplay } from './TimerDisplay';

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