function hoursWorkedCalc(x, y, q, z) {
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
    return hoursWorkedFriday + hoursWorkedSaturday
}

function salaryCalc(concept, hoursWorked,  extras) {
    let salary
    switch (concept) {
        case "Mozo":
            if(extras){
               return salary = (hoursWorked * 370) + Number(extras)
            }
            return salary = hoursWorked * 370
        case "Bartender":
            if(extras){
                return salary = (hoursWorked * 400) + Number(extras)
            } 
            return salary = hoursWorked * 400
        case "Jefe de barra":
        case "Cajero":
            if(extras){
                return salary = (hoursWorked * 470) + Number(extras)
            } 
            return salary = hoursWorked * 470
        case "Anfitriona":
        case "Recepcionista":
            if(extras){
                return salary = (hoursWorked * 500)  + Number(extras)
            }
            return salary = hoursWorked * 500  
        case "Boletero":
            if(extras){
                return salary = (hoursWorked * 500) + Number(extras)
            } 
            return salary = hoursWorked * 500
        case "Runner":
        case "Guardarropa":
            if(extras){
                return salary = (hoursWorked * 370) + Number(extras)
            } 
            return salary = hoursWorked * 370
        case "Presencia":
            if(extras){
                return salary = 3000 + Number(extras)
            } 
            return salary = 3000
        case "Jefe de cocina":  
            if(extras){
                return salary = (hoursWorked * 600) + Number(extras)
            }
            return salary = hoursWorked * 600
        case "Ayudante de cocina":  
            if(extras){
                return salary = (hoursWorked * 400) + Number(extras)
            }
            return salary = hoursWorked * 400
        case "Pizzero":  
            if(extras){
                return salary = (hoursWorked * 400) + Number(extras)
            }
            return salary = hoursWorked * 400            
    }   
}

export{ hoursWorkedCalc, salaryCalc }

