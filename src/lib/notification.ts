let notificationSound: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
    notificationSound = new Audio('/ding-ding-small-bell-76305.mp3');
}

export function playNotificationSound() {
    notificationSound?.play().catch(error => console.error("Erro ao tocar o som:", error));
}

export async function showNotification(title: string, body: string) {
    if (!('Notification' in window)) {
        alert("Este navegador não suporta notificações de desktop");
        return;
    }

    if (Notification.permission === 'granted') {
        new Notification(title, { body });
        playNotificationSound();
    } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            new Notification(title, { body });
            playNotificationSound();
        }
    }
}