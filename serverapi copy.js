const puppeteer = require('puppeteer');

async function extrairBairros(codigoMunicipio) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const url = `https://sidra.ibge.gov.br/territorio#/N102/IN%20N6%20${codigoMunicipio}`;
        await page.goto(url);

        await page.waitForSelector('.lv-data');

        const nomesDasCidades = await page.evaluate(() => {
            const nomes = [];
            document.querySelectorAll('.lv-data').forEach(element => {
                const texto = element.textContent.trim();
                if (texto && texto !== "Codigo" && texto !== "Nome") {
                    const splitIndex = texto.indexOf(" - ");
                    if (splitIndex !== -1) {
                        const nomeBairro = texto.substring(0, splitIndex);
                        nomes.push(nomeBairro);
                    }
                }
            });
            return nomes;
        });

        return nomesDasCidades;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return [];
    } finally {
        await browser.close();
    }
}

const codigoMunicipio = '3106200';//Belo Horizonte

extrairBairros(codigoMunicipio)
    .then(nomesDasCidades => {
        const cidadesJSON = JSON.stringify(nomesDasCidades);
        console.log(cidadesJSON);
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
