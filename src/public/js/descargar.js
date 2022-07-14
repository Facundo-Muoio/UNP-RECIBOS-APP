window.addEventListener('DOMContentLoaded', (e) => {
    const divDownload  = document.querySelector("#divDownload")
    
    setTimeout(() => {
        divDownload.innerHTML = `
        <a href="../pdf/recibos.pdf" download="recibos.pdf"><button class="btn btn-outline-danger">DESCARGAR PDF</button></a>
        `
    },1500)    
});
