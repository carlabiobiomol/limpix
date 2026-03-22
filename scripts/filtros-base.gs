/**
 * LIMPIX — Limpeza Completa
 * Autora: Liah | github.com/carlabiobiomol/limpix
 * Executa limpeza completa — use como gatilho semanal.
 */
function executarLimpezaCompleta() {
  Logger.log('🟢 LIMPIX — Iniciando limpeza automática...');
  limparPromocoes();
  limparSpam();
  Logger.log('✅ LIMPIX — Limpeza concluída!');
}

function limparEmailsGrandes() {
  const query = 'larger:5mb before:2024/01/01 -in:starred';
  const threads = GmailApp.search(query, 0, 100);
  Logger.log(`📦 Limpix: ${threads.length} e-mails grandes encontrados.`);
  threads.forEach(t => {
    Logger.log(` - "${t.getFirstMessageSubject()}"`);
  });
  return threads.length;
}
