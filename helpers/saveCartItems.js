const saveCartItems = (itens) => localStorage.setItem('cartItens', itens);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
