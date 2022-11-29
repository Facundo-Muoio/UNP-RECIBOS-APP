const puppeteer = require("puppeteer");

async function createRecibos(html) {
  //abrimos el navegador
  let navegador = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let page = await navegador.newPage();

  await page.setContent(html);
  // await page.emulateMedia("screen");
  let pdf = await page.pdf({
    path: "src/public/pdf/recibos.pdf",
    format: "A4",
    margin: {
      top: "2px",
      left: "40px",
    },
    printBackground: true,
  });

  //cerramos el navegador
  await navegador.close();

  return pdf;
}

module.exports = { createRecibos };
