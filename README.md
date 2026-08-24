# Cardápio Digital — Café Ypiranga

Cardápio que os clientes acessam pelo QR code. É um site estático publicado no
GitHub Pages, sem servidor e sem custo de hospedagem.

**No ar em:** https://cafe-ypiranga.github.io/

## Como funciona

```
ola.click  ──(API)──>  robô (GitHub Actions)  ──>  menu.json  ──>  GitHub Pages
```

1. O dono cadastra e edita os produtos no painel do **ola.click**.
2. Um robô roda de tempos em tempos, busca o cardápio na API pública do
   ola.click e grava o resultado em `menu.json`.
3. Se algo mudou, o robô commita o `menu.json` e o GitHub Pages republica o
   site sozinho.

Ninguém precisa mexer em código para mudar preço, foto, descrição ou produto:
**tudo isso se altera no painel do ola.click.**

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O cardápio em si. Página única, sem build. |
| `menu.json` | Os produtos. **Gerado automaticamente — não edite à mão.** |
| `atualizar_cardapio.py` | O robô que busca da API e gera o `menu.json`. |
| `.github/workflows/atualizar_cardapio.yml` | Agenda de execução do robô. |

## Atualizar o cardápio

**Normalmente não precisa fazer nada** — o robô roda sozinho de hora em hora.

Para forçar agora: aba **Actions** → *Atualizar Cardápio Diário* → **Run workflow**.

## Rodar na sua máquina

```bash
pip install -r requirements.txt
python atualizar_cardapio.py     # regenera o menu.json
python -m http.server 8000       # abre em http://localhost:8000
```

## Sobre os adicionais

Os grupos de adicionais ("Turbine seu lanche", "Escolha a Borda", "Personalize
seu café"...) **não vêm do ola.click**. São regras da casa, definidas por
palavra-chave na função `obter_adicionais()` do `atualizar_cardapio.py`. Para
mudar um adicional ou um preço de adicional, é ali.

## Travas de segurança

O robô **aborta sem gravar** se a API responder com menos de 80% dos itens que
o cardápio atual tem, ou com nenhum item. Isso existe porque a versão antiga
deste projeto publicava cardápios pela metade quando a leitura falhava — em 24
de 165 execuções o cardápio no ar ficou vazio ou truncado.

Se o Action falhar, **o cardápio que está no ar continua intacto**. É o
comportamento desejado: melhor um cardápio desatualizado que um cardápio vazio.

## Manutenção

O agendamento do GitHub Actions é desativado automaticamente após ~60 dias sem
atividade no repositório. Se o cardápio ficar muito tempo sem mudar, isso pode
acontecer — o GitHub avisa por e-mail antes, e reativar é um clique na aba
Actions.

Se o robô parar de funcionar, o suspeito número um é a API do ola.click ter
mudado. O endpoint usado está no topo do `atualizar_cardapio.py`.
