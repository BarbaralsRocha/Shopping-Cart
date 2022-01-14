const fetchProducts = (products) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  const produtos = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
    return produtos;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
