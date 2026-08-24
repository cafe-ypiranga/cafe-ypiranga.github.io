# QR code do cardápio

Aponta para **https://cafe-ypiranga.github.io/** — a URL está codificada
dentro do próprio QR, sem intermediário. Nenhum serviço de terceiro no meio,
nada que possa expirar, cobrar ou ser desativado.

| Arquivo | Para quê |
|---|---|
| `qrcode-cardapio.svg` | **Mande este para a gráfica.** Vetorial: mesma nitidez em qualquer tamanho. |
| `qrcode-cardapio.png` | 1640×1640px, para onde não aceitam SVG. |
| `cartaz-qrcode-10x14cm.pdf` | Peça pronta para imprimir, 10×14 cm a 300 dpi. |
| `cartaz-qrcode-10x14cm.png` | A mesma peça em imagem. |

## Antes de mandar imprimir

1. Escaneie com o celular e confirme que abre o cardápio.
2. Peça uma prova impressa e escaneie de novo — papel fosco, brilho e
   plastificação mudam a leitura.

## Regras de impressão

- **Nunca imprima com menos de 2 cm de lado.** Abaixo disso muitos celulares
  não leem. Para mesa, 3 a 4 cm; para vitrine, quanto maior melhor.
- **Deixe a margem branca em volta** (já incluída nos arquivos). Sem ela o
  leitor não acha o código.
- **Escuro sobre claro.** Nunca inverta as cores nem imprima sobre foto.
- O código tem correção de erro alta: funciona mesmo com até ~30% da área
  suja ou riscada.

## Se um dia mudar de endereço

O QR não precisa ser refeito. Como o site é o próprio repositório, basta
trocar o `index.html` por um redirecionamento para o novo endereço, e tudo
que já foi impresso continua funcionando.

## Como gerar de novo

```bash
qrencode -t SVG -o qrcode-cardapio.svg -l H -m 4 -s 10 "https://cafe-ypiranga.github.io/"
```
