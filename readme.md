# API de Bairros

Uma API RESTful que retorna bairros de cidades brasileiras, desenvolvida em JavaScript com Node.js.

## Descrição

Esta API fornece acesso a dados atualizados sobre bairros de cidades brasileiras, facilitando o desenvolvimento de aplicações que necessitam dessas informações geográficas.

## Tecnologias Utilizadas

- Node.js
- Express.js
- JavaScript
- Vercel (para deploy)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bairrosapi.git

# Entre no diretório
cd bairrosapi

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

## Uso

```
GET /{UF}/{Cidade}
```

Exemplo:
```
https://bairrosapi-eight.vercel.app/MG/Belo%20Horizonte
```

## Resposta

Retorna um array JSON contendo todos os bairros da cidade especificada:

```json
[
    "Aarão Reis",
    "Acaiaca",
    "Ademar Maldonado",
    ...
]
```

## Fonte de Dados

Os dados são obtidos do IBGE (Instituto Brasileiro de Geografia e Estatística)
através de um processo separado de scraping em Python.

## Atualizações de Dados

Os dados dos bairros são atualizados anualmente via um processo automatizado
de scraping que extrai as informações mais recentes do site do IBGE.

## Limitações

- A API possui um limite de 100 requisições por minuto por IP
- Cidades com nomes compostos devem ter seus espaços codificados (%20)

## Licença

Este projeto está licenciado sob a Licença MIT - veja abaixo para mais detalhes:

```
MIT License

Copyright (c) 2023 Seu Nome

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.