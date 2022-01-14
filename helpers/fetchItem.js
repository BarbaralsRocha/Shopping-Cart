const fetchItem = (itens) => {
  const url = `https://api.mercadolibre.com/items/${itens}`;
  const item = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
