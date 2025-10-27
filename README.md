# Registro de gastos do casal

Este projeto entrega uma solução completa para registrar despesas domésticas em uma planilha do Google Sheets sem precisar de backend próprio. Ele é composto por:

- `index.html`: formulário elegante para lançar os gastos.
- `script.js`: lógica em JavaScript que envia os dados ao Apps Script.
- `code.gs`: código do Google Apps Script responsável por receber as requisições e gravar na planilha.

## Como configurar o Google Apps Script

1. Abra a planilha do Google Sheets onde os lançamentos devem ser registrados.
2. Clique em **Extensões → Apps Script** para abrir o editor.
3. Apague qualquer código existente e cole o conteúdo de `code.gs` neste repositório.
4. Salve o projeto (`Ctrl+S` ou `Cmd+S`).
5. Clique em **Implantar → Nova implantação**.
6. Escolha o tipo **Aplicativo da web**.
7. Em **Executar como**, selecione *Você*.
8. Em **Quem tem acesso**, escolha *Qualquer pessoa* ou *Qualquer pessoa, mesmo anônima* para permitir o envio direto do formulário.
9. Clique em **Implantar**, autorize a execução e copie a **URL do aplicativo da web** gerada. Guarde essa URL para o próximo passo.

## Como conectar o formulário ao Apps Script

1. Este pacote já está configurado para usar o endpoint `https://script.google.com/macros/s/AKfycbweWJRj2pOJRzl3x6J5SnzF77MgxN4pUi7hTQscu_6hvYRna8EQdq2rTbNHDZ6rdBPfKw/exec`. Caso publique um Apps Script diferente, abra `script.js` e atualize a constante `scriptURL` com a nova URL.
2. Opcional: personalize a lista de nomes exibidos no seletor "Quem pagou?" editando o atributo `data-people` dentro de `index.html` ou alterando diretamente em `script.js`.
3. Abra `index.html` (e `script.js`, se estiver em arquivo separado) no navegador — pode ser diretamente do computador ou hospedado em algum serviço estático.
4. Preencha o formulário e clique em **Salvar gasto na planilha**. Cada envio adicionará uma nova linha na aba configurada do Google Sheets (`Gastos` por padrão).

## Personalizações

- Para alterar a aba onde os registros são inseridos, atualize a constante `SHEET_NAME` em `code.gs`.
- Na primeira execução, se a aba ainda não existir, o script criará uma nova aba com cabeçalho padrão.
- Você pode adicionar ou remover campos no formulário, lembrando de ajustar tanto `script.js` quanto `code.gs` para refletir os novos dados.

## Publicar no GitHub (opcional)

Se quiser tornar o projeto disponível em um repositório remoto:

1. Crie um repositório vazio no GitHub.
2. Adicione-o como remoto com `git remote add origin <URL>`.
3. Envie o histórico atual com `git push -u origin work` (ou renomeie o branch para `main` antes do push, se preferir).
