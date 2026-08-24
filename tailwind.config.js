/** Config do Tailwind usada para gerar o assets/tailwind.css.
 *  O 'content' aponta pro index.html porque e la que estao TODAS as classes,
 *  inclusive as que aparecem dentro dos templates JavaScript. */
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  // Estas duas o scanner nao consegue extrair sozinho: os caracteres ' ( ) ,
  // dentro do valor entre colchetes interrompem a leitura do class="...".
  safelist: [
    "after:content-['']",
    'shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
  ],
  theme: { extend: {} },
  plugins: [],
}
