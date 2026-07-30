// ─────────────────────────────────────────────────────────────
// Sereen — Formulário de Contacto (Google Apps Script)
// ─────────────────────────────────────────────────────────────
// INSTRUÇÕES DE CONFIGURAÇÃO:
//  1. Acede a script.google.com → "Novo projeto"
//  2. Apaga o código existente e cola este ficheiro
//  3. Substitui SHEET_ID pelo ID da tua Google Sheet (ver abaixo)
//  4. Substitui NOTIFY_EMAIL pelo email onde queres receber notificações
//  5. Clica em "Implementar" → "Nova implementação"
//     → Tipo: "App da Web"
//     → Executar como: "Eu (teu email)"
//     → Quem tem acesso: "Qualquer pessoa"
//  6. Copia o URL gerado e substitui APPS_SCRIPT_URL em contacto/index.html
// ─────────────────────────────────────────────────────────────

const SHEET_ID    = 'SUBSTITUI_PELO_ID_DA_TUA_SHEET'; // ex: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'
const SHEET_NAME  = 'Contactos';                        // nome do separador na Sheet
const NOTIFY_EMAIL = 'geral@sereen.pt';                 // email para notificações

// ─────────────────────────────────────────────────────────────
// Ponto de entrada — recebe o POST do formulário
// ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = e.parameter;

    const name    = sanitize(data.name    || '');
    const email   = sanitize(data.email   || '');
    const phone   = sanitize(data.phone   || '');
    const subject = sanitize(data.subject || '');
    const message = sanitize(data.message || '');
    const ts      = new Date();

    // Valida campos obrigatórios
    if (!name || !email || !subject || !message) {
      return jsonResponse({ ok: false, error: 'Campos obrigatórios em falta.' });
    }

    // Valida formato de email básico
    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'Email inválido.' });
    }

    // Grava na Google Sheet
    saveToSheet(ts, name, email, phone, subject, message);

    // Envia notificação por email
    sendNotification(ts, name, email, phone, subject, message);

    return jsonResponse({ ok: true });

  } catch (err) {
    console.error('Erro no doPost:', err);
    return jsonResponse({ ok: false, error: 'Erro interno. Tenta novamente.' });
  }
}

// ─────────────────────────────────────────────────────────────
// Gravar na Sheet
// ─────────────────────────────────────────────────────────────
function saveToSheet(ts, name, email, phone, subject, message) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_NAME);

  // Cria o separador se não existir e adiciona cabeçalhos
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Data', 'Nome', 'Email', 'Telefone', 'Assunto', 'Mensagem', 'Estado']);
    sheet.setFrozenRows(1);
    sheet.getRange('1:1').setFontWeight('bold');
  }

  sheet.appendRow([
    ts,
    name,
    email,
    phone,
    subject,
    message,
    'Novo'   // coluna Estado — podes mudar para "Respondido" manualmente
  ]);
}

// ─────────────────────────────────────────────────────────────
// Enviar notificação por email
// ─────────────────────────────────────────────────────────────
function sendNotification(ts, name, email, phone, subject, message) {
  const assuntoLabels = {
    'lista-espera' : 'Lista de espera — programa piloto',
    'informacao'   : 'Informação sobre tDCS',
    'clinico'      : 'Questão clínica',
    'imprensa'     : 'Imprensa / parcerias',
    'outro'        : 'Outro'
  };

  const assunto = assuntoLabels[subject] || subject;

  const emailSubject = `[Sereen Contacto] ${assunto} — ${name}`;

  const emailBody = `
Nova mensagem recebida em sereen.pt/contacto

──────────────────────────────
Data:      ${ts.toLocaleString('pt-PT')}
Nome:      ${name}
Email:     ${email}
Telefone:  ${phone || '—'}
Assunto:   ${assunto}
──────────────────────────────

${message}

──────────────────────────────
Responder a: ${email}
  `.trim();

  GmailApp.sendEmail(NOTIFY_EMAIL, emailSubject, emailBody, {
    replyTo: email,
    name: 'Sereen Website'
  });
}

// ─────────────────────────────────────────────────────────────
// Utilitários
// ─────────────────────────────────────────────────────────────
function sanitize(str) {
  return String(str).trim().substring(0, 2000); // limita tamanho
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────────────────────
// GET — responde 200 para verificação de saúde
// ─────────────────────────────────────────────────────────────
function doGet() {
  return ContentService
    .createTextOutput('Sereen contact form endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
