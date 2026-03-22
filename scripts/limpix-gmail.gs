/**
 * LIMPIX — Script: Limpador de Promoções
 * Autora: Liah | github.com/limpix
 * Versão: 1.0.0
 *
 * Remove automaticamente e-mails da aba Promoções
 * com mais de 30 dias. Roda semanalmente via gatilho.
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Cole este código
 * 3. Clique em Executar > limparPromocoes
 * 4. Authorize as permissões
 * 5. Configure gatilho: Gatilhos > Semanal
 */

function limparPromocoes() {
  const DIAS = 30;
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - DIAS);

  const query = `category:promotions before:${formatarData(dataLimite)}`;
  let pagina = GmailApp.search(query, 0, 500);
  let total = 0;

  while (pagina.length > 0) {
    GmailApp.moveThreadsToTrash(pagina);
    total += pagina.length;
    pagina = GmailApp.search(query, 0, 500);
  }

  Logger.log(`✅ Limpix: ${total} threads de promoções movidas para lixeira.`);
  return total;
}

function limparSpam() {
  const DIAS = 7;
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - DIAS);

  const query = `in:spam before:${formatarData(dataLimite)}`;
  let pagina = GmailApp.search(query, 0, 500);
  let total = 0;

  while (pagina.length > 0) {
    GmailApp.moveThreadsToTrash(pagina);
    total += pagina.length;
    pagina = GmailApp.search(query, 0, 500);
  }

  Logger.log(`✅ Limpix: ${total} threads de spam removidas.`);
  return total;
}

function limparEmailsGrandes() {
  const TAMANHO_MB = 5;
  const DIAS = 180;
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - DIAS);

  const query = `larger:${TAMANHO_MB}mb before:${formatarData(dataLimite)} -in:starred`;
  const threads = GmailApp.search(query, 0, 100);

  Logger.log(`📦 Limpix: ${threads.length} e-mails grandes encontrados para revisão.`);
  // Não apaga automaticamente — lista para revisão manual
  threads.forEach(t => {
    Logger.log(`  - "${t.getFirstMessageSubject()}" (${t.getLastMessageDate()})`);
  });

  return threads.length;
}

function relatorioDiagnostico() {
  const stats = {
    totalInbox:    GmailApp.search('in:inbox').length,
    naolidos:      GmailApp.search('in:inbox is:unread').length,
    promocoes:     GmailApp.search('category:promotions').length,
    spam:          GmailApp.search('in:spam').length,
    emailsGrandes: GmailApp.search('larger:5mb').length,
  };

  const relatorio = `
📊 LIMPIX — DIAGNÓSTICO DA CONTA
================================
📥 Total na caixa de entrada : ${stats.totalInbox}
📬 Não lidos                 : ${stats.naolidos}
🏷️  Promoções                 : ${stats.promocoes}
🚫 Spam                      : ${stats.spam}
📦 E-mails >5MB              : ${stats.emailsGrandes}
================================
Gerado em: ${new Date().toLocaleString('pt-BR')}
  `;

  Logger.log(relatorio);
  return stats;
}

// Utilitário: formata data para query do Gmail
function formatarData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}/${mes}/${dia}`;
}

// Execução completa (use como gatilho semanal)
function executarLimpezaCompleta() {
  Logger.log('🟢 LIMPIX — Iniciando limpeza automática...');
  const promo = limparPromocoes();
  const spam  = limparSpam();
  Logger.log(`✅ LIMPIX — Concluído. ${promo + spam} threads removidas no total.`);
}
