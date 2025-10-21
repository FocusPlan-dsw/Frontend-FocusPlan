export const minutesToHHMM = (totalMinutes: number | undefined | null): string => {
    if (!totalMinutes || totalMinutes <= 0 || isNaN(totalMinutes)) {
        return "0 min";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];
    if (hours > 0) {
        parts.push(`${hours} h`);
    }
    if (minutes > 0) {
        const minStr = (hours > 0) ? String(minutes).padStart(2, '0') : String(minutes);
        parts.push(`${minStr} min`);
    }
    
    if (parts.length === 0) return '0 min';
    return parts.join(' ');
};