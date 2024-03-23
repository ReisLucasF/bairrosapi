const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/:estado/:cidade', async (req, res) => {
    const { estado, cidade } = req.params;

    try {
        const codigoMunicipio = await getCodigoMunicipio(estado, cidade);
        const nomesDasCidades = await extrairBairros(codigoMunicipio);

        res.json(nomesDasCidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getCodigoMunicipio(estado, cidade) {
    try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);

        const municipio = response.data.find(municipio => municipio.nome.toUpperCase() === cidade.toUpperCase());

        if (!municipio) {
            throw new Error(`Cidade "${cidade}" do estado "${estado}" não encontrada.`);
        }

        return municipio.id;
    } catch (error) {
        throw new Error('Erro ao obter código do município:', error.message);
    }
}

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
        throw new Error('Ocorreu um erro ao extrair os bairros:', error);
    } finally {
        await browser.close();
    }
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
