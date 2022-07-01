function twoHours(x, y, q, z) {
    let hoursWorkedFriday
    let hoursWorkedSaturday   
    let horaIngresoViernes = x.split(":")
    let horaEgresoViernes = y.split(":")
    let horaIngresoSabado = q.split(":")
    let horaEgresoSabado = z.split(":")
    let a = Number(horaIngresoViernes[0])
    let b = Number(horaEgresoViernes[0])
    let c = Number(horaIngresoViernes[1])
    let d = Number(horaEgresoViernes[1])
    let e = Number(horaIngresoSabado[0])
    let f = Number(horaEgresoSabado[0])
    let g = Number(horaIngresoSabado[1])
    let h = Number(horaEgresoSabado[1])
    let hoursFriday
    let minutesFriday
    let hoursSaturday
    let minutesSaturday
    if(a <= b){
        hoursFriday = b - a 
    } else {
        hoursFriday = (b + 24) - a
    }
    if(e <= f){
        hoursSaturday = f - e
    } else {
        hoursSaturday = (f + 24) - e
    }
    if (c <= d) {
        minutesFriday = (d - c) / 60 
        hoursWorkedFriday = hoursFriday + minutesFriday
    } else {
        minutesFriday = (d + 60  - c)  / 60
        hoursWorkedFriday = hoursFriday - 1 + minutesFriday
    }
    if (g <= h) {
        minutesSaturday = (h - g) / 60 
        hoursWorkedSaturday =  hoursSaturday + minutesSaturday
    } else {
        minutesSaturday = (h + 60  - g)  / 60
        hoursWorkedSaturday = hoursSaturday - 1 + minutesSaturday
    }
    return [hoursWorkedFriday, hoursWorkedSaturday]
}

module.exports = twoHours