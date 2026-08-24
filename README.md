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
| `index.html` | A página. Contém um bloco `dados-cardapio` **preenchido pelo robô** — não edite esse bloco. |
| `atualizar_cardapio.py` | O robô que busca da API e gera o `menu.json`. |
| `.github/workflows/atualizar_cardapio.yml` | Agenda de execução do robô. |
| `assets/tailwind.css` | Estilos. **Gerado automaticamente — não edite à mão.** |
| `src.css` / `tailwind.config.js` | Fonte dos estilos. É aqui que se mexe no visual. |
| `assets/` | Logo, favicon, imagem de compartilhamento e a fonte. |
| `assets/fotos/` | As fotos dos produtos. **Baixadas pelo robô — não mexa.** |

## Atualizar o cardápio

**Normalmente não precisa fazer nada** — o robô roda sozinho de hora em hora.

Para forçar agora: aba **Actions** → *Atualizar Cardápio Diário* → **Run workflow**.

## Mexer no visual

O CSS em `assets/tailwind.css` é **gerado**. Para alterar o visual, edite o
`index.html` ou o `src.css` e faça o push: o workflow *Compilar CSS* recompila
e commita o resultado sozinho. Não é preciso instalar nada.

Para ver o resultado antes de subir:

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i src.css -o assets/tailwind.css --minify
```

Duas coisas que o Tailwind não consegue detectar sozinho e por isso estão no
`safelist` do `tailwind.config.js`: classes cujo valor entre colchetes contém
aspas, parênteses ou vírgulas (o leitor de classes para no caractere especial).
Se uma classe assim sumir do site, é aí que se adiciona.

## Rodar na sua máquina

```bash
pip install -r requirements.txt
python atualizar_cardapio.py     # regenera o menu.json
python -m http.server 8000       # abre em http://localhost:8000
```

## Por que o cardápio está dentro do index.html

O robô grava os produtos em dois lugares: no `menu.json` (fonte da verdade,
fácil de abrir e conferir) e embutido no `index.html`, num bloco
`<script type="application/json" id="dados-cardapio">`.

A duplicação é proposital. Buscar o `menu.json` à parte custava uma viagem de
rede inteira, e o cardápio só aparecia depois dela — sob 4G isso atrasava a
maior pintura da página em mais de 2 segundos:

| | busca o arquivo | embutido |
|---|---|---|
| LCP | 5,5 s | **3,2 s** |
| Performance | 72 | **93** |

Se o bloco embutido faltar ou vier vazio, a página busca o `menu.json` como
antes — nada quebra.

## Sobre as fotos

O robô baixa cada foto do ola.click e guarda no repositório, em dois tamanhos:
`assets/fotos/400/` (usado nos cards) e `assets/fotos/800/` (quando o cliente
abre o item). O ola.click só oferece 150px e 800px — o 400px é gerado aqui,
porque 150 fica borrado no card e 800 desperdiça banda de celular.

Isso existe para o cardápio continuar funcionando mesmo que o ola.click saia do
ar: as fotos são do café e ficam com o café. O robô só baixa o que ainda não
tem, e apaga sozinho as fotos que nenhum produto usa mais.

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
