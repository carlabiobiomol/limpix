/**
 * LIMPIX — Limpador de Spam
 * Autora: Liah | github.com/carlabiobiomol/limpix
 * Remove spam com mais de 7 dias.
 */
function limparSpam() {
  const DIAS = 7;
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - DIAS);
  const query = `in:spam before:${formatarData(dataLimite)}`;
  let threads = GmailApp.search(query, 0, 500);
  GmailApp.moveThreadsToTrash(threads);
  Logger.log(`Limpix: ${threads.length} spams removidos.`);
}

function formatarData(data) {
  return `${data.getFullYear()}/${String(data.getMonth()+1).padStart(2,'0')}/${String(data.getDate()).padStart(2,'0')}`;
}
