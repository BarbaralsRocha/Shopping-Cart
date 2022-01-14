require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts',  () => {
  it('é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  })
  it('com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(1)
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1)
    const products = 'computador'
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Teste se o retorno da função com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1)
    const products = await fetchProducts('computador');
    expect(products).toEqual(computadorSearch);
  })
  it('Teste se, ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1)
    const emptyFunction = await fetchProducts();
    const error = new Error('You must provide an url')
    expect(emptyFunction).toEqual(error);
  })
});
