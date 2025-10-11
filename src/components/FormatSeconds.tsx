export const formatSeconds = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds === 0) {
        return "0h 0min";
    }
    const totalMinutes = Math.floor(totalSeconds / 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}min`;
};