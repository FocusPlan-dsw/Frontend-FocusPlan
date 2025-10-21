export const minutesToHHMM = (totalMinutes: number | undefined | null): string => {
    
    if (!totalMinutes || totalMinutes <= 0 || isNaN(totalMinutes)) {
        return "00:00";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');

    return `${hoursStr}:${minutesStr}`;
};