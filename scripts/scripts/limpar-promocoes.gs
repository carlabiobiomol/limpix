/**
 * LIMPIX — Limpador de Promoções
 * Autora: Liah | github.com/carlabiobiomol/limpix
 * Remove e-mails de promoções com mais de 30 dias.
 */
function limparPromocoes() {
  const DIAS = 30;
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - DIAS);
  const query = `category:promotions before:${formatarData(dataLimite)}`;
  let threads = GmailApp.search(query, 0, 500);
  GmailApp.moveThreadsToTrash(threads);
  Logger.log(`Limpix: ${threads.length} promoções removidas.`);
}

function formatarData(data) {
  return `${data.getFullYear()}/${String(data.getMonth()+1).padStart(2,'0')}/${String(data.getDate()).padStart(2,'0')}`;
}
