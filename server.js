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
      const bairros = data[uf][cidade];
      res.json({
        bairros: bairros,
        quantidade: bairros.length
      });
    } else {
      res
        .status(404)
        .json({ error: `Cidade '${cidade}' não encontrada em '${uf}'` });
    }
  } else {
    res.status(404).json({ error: `UF '${uf}' não encontrada` });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
