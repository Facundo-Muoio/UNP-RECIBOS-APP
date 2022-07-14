import { hoursWorkedCalc, salaryCalc } from "./functions.js"
let btnEdits = document.getElementsByClassName("btn-edit")

for (let btn of btnEdits){
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        const  parentTr = btn.parentElement.parentElement.parentElement
        const oldData = []
        for (let i = 0; i < parentTr.children.length - 1 ; i++) {
         oldData.push(parentTr.children[i].textContent)
       }
       //oldata array donde el textcontent de las filas que hacen la tabla. 
       //oldData[1] = i.viernes  oldData[2] = e.viernes  oldData[3] = i.sabado  oldData[4] = e.sabado 
       let workedHours = hoursWorkedCalc(oldData[1], oldData[2], oldData[3], oldData[4])
       // oldData[7] = concepto : oldData[6] = extras : workedHours = retorna horas trabajas
       let salary = salaryCalc(oldData[7], workedHours, oldData[6])
  

       parentTr.innerHTML = `  
        <td><input type="text" name="name" id="name" required value="${oldData[0]}" form="${oldData[9]}"></td>
        <td><input type="time" name="fridayCheckIn" id="fridayCheckIn${oldData[9]}" value=${oldData[1]} form="${oldData[9]}"></td>
        <td><input type="time" name="fridayCheckOut" id="fridayCheckOut${oldData[9]}" value=${oldData[2]} form="${oldData[9]}"></td>
        <td><input type="time" name="SaturdayCheckIn" id="SaturdayCheckIn${oldData[9]}" value=${oldData[3]} form="${oldData[9]}"></td>
        <td><input type="time" name="SaturdayCheckOut" id="SaturdayCheckOut${oldData[9]}" value=${oldData[4]} form="${oldData[9]}"></td>
        <td><input type="datetime" name="hoursWorked" id="hoursWorked${oldData[9]}" value=${workedHours} form="${oldData[9]}"></td>
        <td><input type="text" name="extras" id="extras${oldData[9]}" class="input-extras" value="${oldData[6]}" form="${oldData[9]}"></td>
        <td><select name="concept" id="concept" form="${oldData[9]}"><option value="${oldData[7]}" selected>${oldData[7]}</option></select></td>
        <td><input type="text" name="salary" id="salary${oldData[9]}" class="input-salary" value="${salary}" form="${oldData[9]}"></td>
        <td>
            <div class="d-flex flex-row">
                <button class="btn btn-sm btn-outline-info rounded-pill me-1" type="submit" id="btn-save${oldData[9]}" form="${oldData[9]}">GUARDAR</button>
                <a href="/${oldData[7] == "Jefe de barra" ? "Cajero" : oldData[7] == "Recepcionista" ? "Anfitriona" : oldData[7] == "Guardarropa" ? "Runner" : oldData[7] == "Jefe de cocina" || oldData[7]  == "Ayudante de cocina" || oldData[7] == "Pizzero" ? "Cocinero" : oldData[7] }s" class="text-decoration-none btn btn-sm btn-outline-danger rounded-pill">
                    CANCELAR
                </a>
            </div>
        </td> 
       `
    let checkInFridayInput = document.getElementById(`fridayCheckIn${oldData[9]}`)
    let checkOutFridayInput = document.getElementById(`fridayCheckOut${oldData[9]}`)
    let checkInSaturdayInput = document.getElementById(`SaturdayCheckIn${oldData[9]}`)
    let checkOutSaturdayInput = document.getElementById(`SaturdayCheckOut${oldData[9]}`)
    let extrasInput = document.getElementById(`extras${oldData[9]}`)  
    let btnSave = document.getElementById(`btn-save${oldData[9]}`)
    let workedHoursInput = document.getElementById(`hoursWorked${oldData[9]}`)
    let salaryInput = document.getElementById(`salary${oldData[9]}`)
    const inputs = [checkInFridayInput, checkOutFridayInput, checkInSaturdayInput, checkOutSaturdayInput, extrasInput]
    // inputs de formulario de editar, contiene el input de ingreso viernes y sabado, input de egreso viernes y sbado. Y también el extra
    inputs.forEach(input => input.addEventListener("change", (e) => {
       let parentTrSave = btnSave.parentElement.parentElement.parentElement
       for (let i = 0; i < parentTrSave.children.length - 1 ; i++) {
        let inputValue = parentTrSave.children[i].children[0].value
        oldData[i] = inputValue
      }
      workedHours = hoursWorkedCalc(oldData[1], oldData[2], oldData[3], oldData[4])
      salary = salaryCalc(oldData[7], workedHours, oldData[6])
      workedHoursInput.value = workedHours
      salaryInput.value = salary
    }))
   
    })
}

