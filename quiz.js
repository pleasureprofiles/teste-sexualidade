// COLE AQUI APENAS O ID DA PLANILHA (sem URL)
const SHEET_ID = "1wyBWZ7jZzR67hLcRiVW8GMFke4HWH2wmIsGJ-D-AKDI";

function doPost(e) {
  try {
    // Abre SEMPRE a planilha certa pelo ID
    var ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log("Planilha aberta: " + ss.getName());

    var sheets = ss.getSheets();
    Logger.log("Quantidade de abas: " + sheets.length);

    var sheet = sheets[0]; // primeira aba
    Logger.log("Usando aba: " + sheet.getName());

    var respostas = [];

    // Se veio via FormData (jeito atual do quiz.js)
    if (e && e.parameter && e.parameter.respostas) {
      Logger.log("Recebi respostas via e.parameter.respostas");
      try {
        respostas = JSON.parse(e.parameter.respostas);
      } catch (erroJson) {
        Logger.log("ERRO JSON parameter: " + erroJson);
        respostas = ["ERRO_JSON_PARAMETER", String(e.parameter.respostas)];
      }
    } else if (e && e.postData && e.postData.contents) {
      Logger.log("Recebi respostas via e.postData.contents");
      try {
        var data = JSON.parse(e.postData.contents);
        respostas = data.respostas || [];
      } catch (erroBody) {
        Logger.log("ERRO JSON BODY: " + erroBody);
        respostas = ["ERRO_JSON_BODY", String(e.postData.contents)];
      }
    } else {
      Logger.log("Nenhuma resposta encontrada em e");
      respostas = ["SEM_RESPOSTAS", JSON.stringify(e)];
    }

    var linha = [new Date()];

    if (Array.isArray(respostas)) {
      respostas.forEach(function (r) {
        if (Array.isArray(r)) {
          linha.push(r.join(", "));
        } else {
          linha.push(r);
        }
      });
    } else {
      linha.push(String(respostas));
    }

    sheet.appendRow(linha);
    Logger.log("Linha adicionada com sucesso");

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("ERRO GERAL: " + err);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
