export const minutesToHHMM = (minutes: string ) => {
    const hours =  minutes ? Math.floor(Number(minutes) / 60) : 0;
    const min =  minutes ? Number(minutes) % 60 : 0;
    return `${String(hours).padStart(2, "0")}h ${String(min).padStart(2, "0")}min`;
};