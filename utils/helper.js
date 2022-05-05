// this function formats the created time to be easy to read
function formatTime(createdAt) {

    // creating all of the variables to show the time
    const d = new Date(createdAt)
    let month = d.getMonth()
    let day = d.getDate()
    const year = d.getFullYear()
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let amPm = "am"

    // creating the 3 letter short hand based on the number the month is
    switch (month) {
        case 0: month = "Jan"
            break;
        case 1: month = "Feb"
            break;
        case 2: month = "Mar"
            break;
        case 3: month = "Apr"
            break;
        case 4: month = "May"
            break;
        case 5: month = "Jun"
            break;
        case 6: month = "Jul"
            break;
        case 7: month = "Aug"
            break;
        case 8: month = "Sep"
            break;
        case 9: month = "Oct"
            break;
        case 10: month = "Nov"
            break;
        case 11: month = "Dec"
            break;
    }

    // adding the post-fix to the day
    switch (day) {
        case 1: day = day + "st"
            break;
        case 2: day = day + "nd"
            break;
        case 3: day = day + "rd"
            break;
        default: day = day + "th"
            break;

    }

    // putting the time in an am/pm format
    if (hours > 12) {
        hours = hours - 12;
        amPm = "pm"
    }
    if (hours === 0) {
        hours = 12
    }

    // returning the date and time
    return `${month} ${day}, ${year} at ${hours}:${minutes}${amPm}`
}

// exporting the function
module.exports = formatTime