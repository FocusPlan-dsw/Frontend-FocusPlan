"use client";

import { useStopwatch } from 'react-timer-hook';
import { TimerDisplay } from './TimerDisplay';

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

    return (
        <TimerDisplay
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={start}
            onPause={pause}
            onResume={start}
            onReset={() => reset(undefined, false)}
        />
    );
}