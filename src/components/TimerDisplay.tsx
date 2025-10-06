import { Button } from './ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";

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
                <p className="font-medium text-5xl sm:text-6xl md:text-7xl leading-none text-center text-dark-gray tracking-tighter">
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
                        
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex-1 py-6 text-lg">Reiniciar</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Você tem certeza?</DialogTitle>
                                    <DialogDescription>
                                        Esta ação irá zerar o cronômetro e registrar o tempo que você parou.
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row sm:gap-5">
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className="w-full sm:w-auto text-sm">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button 
                                        type="button" 
                                        onClick={onReset}
                                        className="w-full sm:w-auto text-sm"
                                    >
                                        Confirmar
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                
                {!isRunning && !isPaused && (
                    <Button onClick={onStart} className="flex-1 py-6 text-lg">Começar</Button>
                )}
            </div>
        </div>
    );
}