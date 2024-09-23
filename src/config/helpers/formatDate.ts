

export const formatDate = (
    dateString: string,
    showDate: boolean = true,
    showTime: boolean = true
) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hour}:${minute}`;

    if (showDate && showTime) {
        return `${formattedDate}, ${formattedTime}`;
    }

    if (showDate && !showTime) {
        return formattedDate;
    }

    if (!showDate && showTime) {
        return formattedTime;
    }
};
