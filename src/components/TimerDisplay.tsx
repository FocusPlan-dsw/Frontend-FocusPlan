import { Button } from './ui/button';

interface TimerDisplayProps {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    isPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
}

export function TimerDisplay({
    minutes,
    seconds,
    isRunning,
    isPaused,
    onStart,
    onPause,
    onResume,
    onReset,
}: TimerDisplayProps) {
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
            <div className="flex items-center justify-center w-full py-16 border border-[#9C9C9C] rounded-[10px] bg-[#F3F3F3] shadow-lg">
                <p className="text-5xl sm:text-6xl md:text-7xl leading-none text-center text-dark-gray tracking-tighter">
                    <span>{formattedMinutes}</span>:<span>{formattedSeconds}</span>
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                {isRunning && (
                    <Button onClick={onPause} className="flex-1 py-6 text-lg">Pausar</Button>
                )}

                {isPaused && (
                    <>
                        <Button onClick={onResume} className="flex-1 py-6 text-lg">Continuar</Button>
                        <Button onClick={onReset} className="flex-1 py-6 text-lg">Reiniciar</Button>
                    </>
                )}
                
                {!isRunning && !isPaused && (
                    <Button onClick={onStart} className="flex-1 py-6 text-lg">Começar</Button>
                )}
            </div>
        </div>
    );
}