export const convertEstimatedTimeToMinutes = (time: string | undefined | null): number => {
    if (!time || !time.includes(':')) {
        const minutes = parseInt(String(time), 10);
        return isNaN(minutes) ? 0 : minutes;
    }
    
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60) + (minutes || 0);
}