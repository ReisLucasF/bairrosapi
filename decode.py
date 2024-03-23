import json

# Ler o conteúdo do arquivo bairros.json
with open('bairros.json', 'r', encoding='utf-8') as arquivo:
    dados_json = arquivo.read()

# Decodificar o JSON
dados_decodificados = json.loads(dados_json)

# Corrigir caracteres escapados
for chave, valor in dados_decodificados.items():
    if isinstance(valor, str):
        dados_decodificados[chave] = valor.encode('utf-8').decode('unicode-escape')

# Escrever de volta no arquivo
with open('bairros.json', 'w', encoding='utf-8') as arquivo:
    json.dump(dados_decodificados, arquivo, ensure_ascii=False, indent=4)
