export function getBirthDateFromPesel(pesel: string): string | null {
    if (!/^\d{11}$/.test(pesel)) return null;

    const yearStr = pesel.substring(0, 2);
    const monthStr = pesel.substring(2, 4);
    const dayStr = pesel.substring(4, 6);

    let year = Number(yearStr);
    let month = Number(monthStr);
    const day = Number(dayStr);

    if (month >= 1 && month <= 12) {
        year += 1900;
    } else if (month >= 21 && month <= 32) {
        year += 2000;
        month -= 20;
    } else if (month >= 81 && month <= 92) {
        year += 1800;
        month -= 80;
    } else if (month >= 41 && month <= 52) {
        year += 2100;
        month -= 40;
    } else if (month >= 61 && month <= 72) {
        year += 2200;
        month -= 60;
    } else {
        return null;
    }

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}