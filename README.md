# Registro de gastos do casal

Este projeto entrega uma solução completa para registrar despesas domésticas em uma planilha do Google Sheets sem precisar de backend próprio. Ele é composto por:

- `index.html`: formulário elegante para lançar os gastos.
- `script.js`: lógica em JavaScript que envia os dados ao Apps Script.
- `code.gs`: código do Google Apps Script responsável por receber as requisições e gravar na planilha.

## Guia rápido para quem não programa

1. Clique no botão verde **Code** no GitHub (ou baixe o ZIP desta pasta se estiver recebendo os arquivos diretamente).
2. Escolha **Download ZIP** e salve o arquivo no computador.
3. Extraia (descompacte) o conteúdo do ZIP para uma pasta — por exemplo, `Documentos/gastos-casal`.
4. Dentro dessa pasta você verá os três arquivos citados acima.
5. Em seguida, configure o Apps Script conforme o passo a passo da próxima seção.
6. Depois de configurar o Apps Script, volte à pasta e dê um duplo clique em `index.html` para abrir o formulário no navegador (Chrome, Edge, Firefox etc.).
7. Preencha os campos e clique em **Salvar gasto na planilha** sempre que registrar uma despesa. Uma mensagem verde confirmará o envio.

> **Dica:** mantenha essa pasta no computador e abra o mesmo `index.html` sempre que precisar registrar novos gastos.

## Como configurar o Google Apps Script

1. Abra a planilha do Google Sheets onde os lançamentos devem ser registrados.
2. Clique em **Extensões → Apps Script** para abrir o editor.
3. Apague qualquer código existente e cole o conteúdo de `code.gs` deste projeto.
4. No topo da janela, clique no ícone de disquete ou pressione `Ctrl+S` (Windows) ou `Cmd+S` (Mac) para salvar.
5. Clique em **Implantar → Nova implantação**.
6. Escolha o tipo **Aplicativo da web**.
7. Em **Descrição**, dê um nome (por exemplo, "Receber gastos").
8. Em **Executar como**, selecione **Você**.
9. Em **Quem tem acesso**, escolha **Qualquer pessoa** ou **Qualquer pessoa, mesmo anônima**.
10. Clique em **Implantar**. Na primeira vez, o Google pedirá autorizações:
    - Clique em **Revisar permissões**.
    - Escolha a sua conta Google.
    - Clique em **Avançado** → **Acessar {nome do projeto} (inseguro)** → **Permitir**.
11. Assim que a implantação terminar, copie a **URL do aplicativo da web** exibida. Ela termina com `/exec` — essa é a URL que o formulário usará para enviar dados.

## Como conectar o formulário ao Apps Script

1. Este pacote já está configurado para usar o endpoint `https://script.google.com/macros/s/AKfycbweWJRj2pOJRzl3x6J5SnzF77MgxN4pUi7hTQscu_6hvYRna8EQdq2rTbNHDZ6rdBPfKw/exec`.
2. Caso queira trocar para outra URL (por exemplo, se você publicar um novo Apps Script):
   - Clique com o botão direito em `script.js` e abra-o com um editor simples (Bloco de notas ou Visual Studio Code).
   - Localize a linha que começa com `const scriptURL` e substitua o endereço pelo da sua implantação.
   - Salve o arquivo.
3. Volte para a pasta e abra `index.html` no navegador (duplo clique).
4. Faça um teste preenchendo um gasto fictício. Após clicar em **Salvar gasto na planilha**, verifique se a planilha recebeu uma nova linha.

## Personalizações

- Para alterar a aba onde os registros são inseridos, atualize a constante `SHEET_NAME` em `code.gs`.
- Na primeira execução, se a aba ainda não existir, o script criará uma nova aba com cabeçalho padrão.
- Você pode adicionar ou remover campos no formulário, lembrando de ajustar tanto `script.js` quanto `code.gs` para refletir os novos dados.

## Publicar no GitHub (opcional)

Se quiser tornar o projeto disponível em um repositório remoto:

1. Crie um repositório vazio no GitHub.
2. Adicione-o como remoto com `git remote add origin <URL>`.
3. Envie o histórico atual com `git push -u origin work` (ou renomeie o branch para `main` antes do push, se preferir).
