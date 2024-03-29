const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  name: { type: String, required: true },
  fridayCheckIn: { type: String, required: true },
  fridayCheckOut: { type: String, required: true },
  fridayHoursWorked: Number,
  SaturdayCheckIn: { type: String, required: true },
  SaturdayCheckOut: { type: String, required: true },
  SaturdayHoursWorked: Number,
  concept: { type: String, required: true },
  extras: String,
  salary: Number,
});

employeeSchema.methods.hoursWorkedCalc = function () {
  x = this.fridayCheckIn;
  y = this.fridayCheckOut;
  q = this.SaturdayCheckIn;
  z = this.SaturdayCheckOut;
  horaIngresoViernes = x.split(":");
  horaEgresoViernes = y.split(":");
  horaIngresoSabado = q.split(":");
  horaEgresoSabado = z.split(":");
  let a = Number(horaIngresoViernes[0]);
  let b = Number(horaEgresoViernes[0]);
  let c = Number(horaIngresoViernes[1]);
  let d = Number(horaEgresoViernes[1]);
  let e = Number(horaIngresoSabado[0]);
  let f = Number(horaEgresoSabado[0]);
  let g = Number(horaIngresoSabado[1]);
  let h = Number(horaEgresoSabado[1]);
  let hoursFriday;
  let minutesFriday;
  let hoursSaturday;
  let minutesSaturday;
  if (a <= b) {
    hoursFriday = b - a;
  } else {
    hoursFriday = b + 24 - a;
  }
  if (e <= f) {
    hoursSaturday = f - e;
  } else {
    hoursSaturday = f + 24 - e;
  }
  if (c <= d) {
    minutesFriday = (d - c) / 60;
    this.fridayHoursWorked = hoursFriday + minutesFriday;
  } else {
    minutesFriday = (d + 60 - c) / 60;
    this.fridayHoursWorked = hoursFriday - 1 + minutesFriday;
  }
  if (g <= h) {
    minutesSaturday = (h - g) / 60;
    this.SaturdayHoursWorked = hoursSaturday + minutesSaturday;
  } else {
    minutesSaturday = (h + 60 - g) / 60;
    this.SaturdayHoursWorked = hoursSaturday - 1 + minutesSaturday;
  }
};

employeeSchema.methods.salaryCalc = function (concept, extras) {
  if (!this.fridayHoursWorked && !this.SaturdayHoursWorked) {
    switch (concept) {
      case "Mozo":
      case "Bartender":
      case "Jefe de barra":
      case "Cajero":
      case "Anfitriona":
      case "Recepcionista":
      case "Boletero":
      case "Runner":
      case "Guardarropa":
      case "Presencia":
      case "Jefe de cocina":
      case "Ayudante de cocina":
      case "Pizzero":
        this.salary = 0;
        break;
    }
  } else {
    let hoursWorked = this.fridayHoursWorked + this.SaturdayHoursWorked;
    switch (concept) {
      case "Mozo":
        if (extras) {
          return (this.salary = Math.round(
            hoursWorked * 538.47 + Number(extras)
          ));
        }
        this.salary = Math.round(hoursWorked * 538.47);
        break;
      case "Bartender":
        if (extras) {
          return (this.salary = hoursWorked * 550 + Number(extras));
        }
        this.salary = hoursWorked * 550;
        break;
      case "Jefe de barra":
      case "Cajero":
        if (extras) {
          return (this.salary = hoursWorked * 600 + Number(extras));
        }
        this.salary = hoursWorked * 600;
        break;
      case "Anfitriona":
      case "Recepcionista":
        if (extras) {
          return (this.salary = hoursWorked * 875 + Number(extras));
        }
        this.salary = hoursWorked * 875;
        break;
      case "Boletero":
        if (extras) {
          return (this.salary = hoursWorked * 650 + Number(extras));
        }
        this.salary = hoursWorked * 650;
        break;
      case "Runner":
      case "Guardarropa":
        if (extras) {
          return (this.salary = hoursWorked * 550 + Number(extras));
        }
        this.salary = hoursWorked * 550;
        break;
      case "Presencia":
        if (extras) {
          return (this.salary = 2250 + Number(extras));
        }
        this.salary = 2250;
        break;
      case "Jefe de cocina":
        if (extras) {
          return (this.salary = hoursWorked * 625 + Number(extras));
        }
        this.salary = hoursWorked * 625;
        break;
      case "Ayudante de cocina":
        if (extras) {
          return (this.salary = hoursWorked * 625 + Number(extras));
        }
        this.salary = hoursWorked * 625;
        break;
      case "Pizzero":
        if (extras) {
          return (this.salary = hoursWorked * 535 + Number(extras));
        }
        this.salary = hoursWorked * 535;
        break;
    }
  }
};

const Employee = model("empleado", employeeSchema);

module.exports = Employee;
