export const formatSeconds = (totalSeconds: number | undefined | null): string => {
    if (totalSeconds === undefined || totalSeconds === null || isNaN(totalSeconds) || totalSeconds < 0) {
        return 'Não definido';
    }

    if (totalSeconds === 0) {
        return '0 min';
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];
    
    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    
    if (minutes > 0) {
        const minStr = (hours > 0) ? String(minutes).padStart(2, '0') : String(minutes);
        parts.push(`${minStr} min`);
    }
    
    if (parts.length === 0) {
         return '0 min';
    }

    return parts.join(' ');
};