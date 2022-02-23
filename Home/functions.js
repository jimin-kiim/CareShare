export function elapsedTime(date) {
    const dateToday = new Date().getTime();
    return Math.floor((dateToday - date) / (1000 * 60 * 60 * 24));
}
