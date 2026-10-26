const offer = window.OFERTA || {};
const validUrl = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
if (offer.preco) {
  const price = document.querySelector('[data-price]');
  price.textContent = '';
  if (offer.precoAnterior) {
    const previous = document.createElement('div');
    previous.className = 'previous-price';
    previous.append('De ');
    const oldPrice = document.createElement('s');
    oldPrice.textContent = offer.precoAnterior;
    previous.append(oldPrice);
    price.append(previous);
  }
  const current = document.createElement('div');
  current.className = 'current-price';
  const label = document.createElement('span');
  label.textContent = 'por apenas ';
  const amount = document.createElement('strong');
  amount.textContent = offer.preco;
  current.append(label, amount);
  price.append(current);
}
if (offer.condicoes) document.querySelector('[data-conditions]').textContent = offer.condicoes;
if (validUrl(offer.checkoutUrl)) {
  document.querySelectorAll('[data-checkout]').forEach(link => { link.href = offer.checkoutUrl; link.rel = 'noopener'; });
  document.querySelector('#checkout-note').textContent = 'Confira valores e condições no checkout antes de concluir a compra.';
} else {
  document.querySelector('[data-checkout]').addEventListener('click', e => { e.preventDefault(); document.querySelector('#checkout-note').textContent = 'As compras ainda não estão disponíveis nesta página. O responsável precisa inserir o link do checkout Kirvano.'; });
}
document.querySelectorAll('[data-commercial]').forEach(link => {
  const key = link.dataset.commercial;
  if (key === 'suporteEmail' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(offer[key])) { link.href = 'mailto:' + offer[key]; link.hidden = false; }
  else if (validUrl(offer[key])) { link.href = offer[key]; link.hidden = false; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
