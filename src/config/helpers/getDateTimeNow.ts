


export const getDateTimeNow = (): string => {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric', 
        hour12: true,
    });

    return formattedDate;
}

