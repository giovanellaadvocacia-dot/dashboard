/**
 * Configurações da planilha.
 * Atualize SHEET_NAME caso queira usar outra aba.
 */
const SHEET_NAME = 'Gastos';

/**
 * Manipula requisições POST provenientes do formulário HTML.
 * Espera receber um JSON com os campos definidos em script.js.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return buildResponse(400, 'Requisição inválida.');
    }

    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();

    const newRow = [
      new Date(payload.submittedAt || new Date()),
      payload.person || '',
      payload.date || '',
      payload.category || '',
      payload.description || '',
      Number(payload.amount || 0),
      payload.notes || ''
    ];

    sheet.appendRow(newRow);

    return buildResponse(200, 'Linha adicionada com sucesso.', {
      status: 'success',
      message: 'Despesa registrada.'
    });
  } catch (error) {
    console.error('Erro ao registrar gasto:', error);
    return buildResponse(500, 'Erro interno ao registrar gasto.');
  }
}

/**
 * Retorna a aba configurada, criando-a caso não exista.
 */
function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Registrado em', 'Pessoa', 'Data', 'Categoria', 'Descrição', 'Valor', 'Observações']);
  }

  return sheet;
}

/**
 * Monta uma resposta JSON padrão.
 */
function buildResponse(statusCode, message, data) {
  const response = ContentService.createTextOutput();
  const body = Object.assign({ status: 'error', message: message }, data);

  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(body));

  return response;
}
