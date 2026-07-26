# Landing page do CT Ítalo Vieira

Site estático publicado diretamente no `public_html` da Hostinger. A proposta
comercial da NETMIT Campo Bom está em `propostanetmitt/` e funciona sem
compilação, frameworks ou dependências externas.

## Abrir localmente

Abra `propostanetmitt/index.html` no navegador ou inicie um servidor local na
raiz do repositório:

```bash
python -m http.server 8080
```

Depois, acesse `http://localhost:8080/propostanetmitt/`.

## Arquivos da proposta

- `propostanetmitt/index.html`: conteúdo e estrutura da página.
- `propostanetmitt/styles.css`: identidade visual, responsividade e impressão.
- `propostanetmitt/script.js`: configuração, cálculos e interações.
- `propostanetmitt/images/`: imagens utilizadas na página.

## Objeto CONFIG

Todas as informações editáveis ficam no início de
`propostanetmitt/script.js`, dentro do objeto `CONFIG`.

### Contatos e WhatsApp

Edite `CONFIG.contato` para alterar telefone, WhatsApp, e-mail e Instagram.
Edite `CONFIG.mensagens` para alterar o texto aberto por cada botão de WhatsApp.
O número do WhatsApp deve conter código do país e DDD, somente com números.

### Valores e meses mínimos

Edite `CONFIG.pacotes`. Cada pacote possui:

- `implementacao`;
- `mensalidade`;
- `mesesMinimos`.

O investimento total não é digitado no HTML. O JavaScript calcula
automaticamente:

`implementação + mensalidade × meses mínimos`.

### Quantidades do escopo

Edite as listas em `CONFIG.escopo` para alterar visitas, reuniões, entrevistas,
treinamentos, processos, documentos, suporte e prazos de resposta.

### Condições comerciais pendentes

Preencher em `CONFIG.comercial` antes de apresentar essas condições:

- validade da proposta;
- forma de pagamento;
- percentual de entrada;
- parcelas da implementação;
- início da mensalidade;
- vencimento.

Enquanto o valor estiver como `PREENCHER ANTES DA PUBLICAÇÃO`, o respectivo
card permanece oculto e a frase não aparece no site.

## Textos, fotos, logos e dashboards

- Textos dos pacotes e demais seções: edite `index.html`.
- Fotos: substitua os arquivos em `propostanetmitt/images/` mantendo o nome ou
  atualize o caminho no HTML.
- Logos: adicione o arquivo em `propostanetmitt/images/` e troque o selo
  tipográfico do cabeçalho pelo elemento `<img>`.
- Dashboards: os exemplos ficam na seção `#dashboards` do `index.html`.
  Mantenha sempre o aviso “DADOS ILUSTRATIVOS”.

## Testar no celular

Use o modo responsivo do navegador e valide, no mínimo, as larguras de 360,
390, 768, 1024, 1366 e 1920 pixels. Confira menu, tabela comparativa,
recomendador, botões de WhatsApp e rolagem.

## Salvar em PDF

Abra a página e use **Imprimir → Salvar como PDF**. O arquivo `styles.css`
contém regras de impressão que removem menu fixo, botões flutuantes e
animações.

## Publicar

A Hostinger está conectada à branch `main` deste repositório. Alterações
incorporadas nessa branch são implantadas automaticamente no `public_html`.
Depois da publicação, a proposta permanece em:

`https://ctitalovieira.com.br/propostanetmitt/`

## Proposta Rango Fit × Grão e Sabor

A proposta privada de parceria estratégica está em `propostarangofit/` e utiliza
a mesma arquitetura estática do projeto:

- `propostarangofit/index.html`: narrativa completa em 26 seções;
- `propostarangofit/styles.css`: identidade visual, responsividade e modo apresentação;
- `propostarangofit/script.js`: navegação, animações, modal e controles por teclado.

Para abrir localmente, inicie o servidor na raiz do repositório e acesse:

`http://localhost:8080/propostarangofit/`

Não existe etapa de compilação ou instalação de dependências. A publicação
ocorre automaticamente pela branch `main` em:

`https://ctitalovieira.com.br/propostarangofit/`
