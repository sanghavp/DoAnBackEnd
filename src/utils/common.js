const moment = require("moment")

const dateString = (value) => {
    return moment(value).format("DD/MM/YYYY")
}

const hours = (time) => {
    return moment(time).format("hh/mm/ss")
}

const compareHours = (time1, time2) => {
    return moment(time1).diff(moment(time2), "minutes");
}
module.exports = {
    dateString,
    hours,
    compareHours,
}