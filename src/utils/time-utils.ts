function formatDateTime(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${hh}:${min}Z`;
}

export function getNextThreeHours(): string[] {
    const now = new Date();
    const nextHour = new Date(now);

    nextHour.setMinutes(0, 0, 0);
    nextHour.setHours(nextHour.getHours() + 1);

    return [0, 1, 2].map((offset) => {
        const future = new Date(nextHour.getTime() + offset * 60 * 60 * 1000);
        return formatDateTime(future);
    });
}

export function formatTimeStamp(timestamp: string): string {
    return timestamp.replace('T', ' ').replace('Z', '');
}