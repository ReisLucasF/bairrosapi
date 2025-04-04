const express = require("express");
const fs = require("fs");
const app = express();
const puppeteer = require("puppeteer");
const axios = require("axios");

const data = JSON.parse(fs.readFileSync("bairros.json", "utf-8"));

app.get("/:uf/:cidade", (req, res) => {
  const { uf, cidade } = req.params;

  if (data[uf]) {
    if (data[uf][cidade]) {
      res.json(data[uf][cidade]);
    } else {
      res
        .status(404)
        .json({ error: `Cidade '${cidade}' não encontrada em '${uf}'` });
    }
  } else {
    res.status(404).json({ error: `UF '${uf}' não encontrada` });
  }
});

app.get("/att/:estado/:cidade", async (req, res) => {
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
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/3106200/municipios`
    );

    const municipio = response.data.find(
      (municipio) => municipio.nome.toUpperCase() === cidade.toUpperCase()
    );

    if (!municipio) {
      throw new Error(
        `Cidade "${cidade}" do estado "${estado}" não encontrada.`
      );
    }

    return municipio.id;
  } catch (error) {
    throw new Error("Erro ao obter código do município:", error.message);
  }
}

async function extrairBairros(codigoMunicipio) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const url = `https://sidra.ibge.gov.br/territorio#/N102/IN%20N6%20${codigoMunicipio}`;
    await page.goto(url);

    await page.waitForSelector(".lv-data");

    const nomesDasCidades = await page.evaluate(() => {
      const nomes = [];
      document.querySelectorAll(".lv-data").forEach((element) => {
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
    throw new Error("Ocorreu um erro ao extrair os bairros:", error);
  } finally {
    await browser.close();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
