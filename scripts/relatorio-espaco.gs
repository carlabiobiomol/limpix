/**
 * LIMPIX — Relatório de Diagnóstico
 * Autora: Liah | github.com/carlabiobiomol/limpix
 * Gera relatório do estado da conta Gmail.
 */
function relatorioDiagnostico() {
  const stats = {
    totalInbox:    GmailApp.search('in:inbox').length,
    naolidos:      GmailApp.search('in:inbox is:unread').length,
    promocoes:     GmailApp.search('category:promotions').length,
    spam:          GmailApp.search('in:spam').length,
    emailsGrandes: GmailApp.search('larger:5mb').length,
  };
  Logger.log(`
📊 LIMPIX — DIAGNÓSTICO
========================
📥 Caixa de entrada : ${stats.totalInbox}
📬 Não lidos        : ${stats.naolidos}
🏷️  Promoções        : ${stats.promocoes}
🚫 Spam             : ${stats.spam}
📦 E-mails >5MB     : ${stats.emailsGrandes}
========================
Gerado em: ${new Date().toLocaleString('pt-BR')}
  `);
  return stats;
}
