function stringToDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("vi-VN", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    return formattedDate;
}

export default stringToDate;
