
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formateDate(d: Date): string {

    let hours = d.getUTCHours().toString();
    let minutes = d.getUTCMinutes().toString();
    let AM_or_PM = "AM";
    // Adjust AM or PM
    if (hours === "0") {
        hours = "12";
    } else if (parseInt(hours) > 12) {
        hours = (parseInt(hours)-12).toString();
        AM_or_PM = "PM";
    }
    // Adjust padding
    if (parseInt(hours) < 10) {
        hours = "0"+hours;
    }
    if (parseInt(minutes) < 10) {
        minutes = "0"+minutes;
    }

    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}, ${hours}:${minutes} ${AM_or_PM}`;
}

export default formateDate;