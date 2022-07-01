const btnExtras = document.getElementsByClassName("btn-edit-extras")


for (let btn of btnExtras){
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        const parentTr = btn.parentElement.parentElement.parentElement
        const oldData = []
        for (let i = 0; i < parentTr.children.length - 1 ; i++) {
         oldData.push(parentTr.children[i].textContent)
       }
       console.log(oldData)
       parentTr.innerHTML = `
       <td><input type="text" name="name" id="name" required value=${oldData[0]} form="${oldData[3]}"></td>
       <td><input type="text" name="concept" required value="${oldData[1]}" form="${oldData[3]}"></td>
       <td><input type="text" name="salary" id="salary${oldData[3]}" class="input-salary" value="${oldData[2]}" form="${oldData[3]}"></td>
       <td>
            <div class="d-flex flex-row">
                <button class="btn btn-sm btn-outline-info rounded-pill me-1" type="submit" id="btn-save${oldData[3]}" form="${oldData[3]}">GUARDAR</button>
                <a href="/extras" class="text-decoration-none btn btn-sm btn-outline-danger rounded-pill">
                    CANCELAR
                </a>
            </div>
        </td> 
       `
    })
}