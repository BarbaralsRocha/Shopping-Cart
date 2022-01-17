const items = document.querySelector('.items');
const cartItens = document.querySelectorAll('.cart__item');
const adicionaCarrinho = document.querySelector('.item__add');
const productID = document.querySelector('.item__sku');
const cart = document.querySelector('.cart__items');
const esvaziaCarrinho = document.querySelector('.empty-cart');
const priceCar = document.querySelector('.total-price');
const emptyCar = 0;
let preco = 0;
// cria a imagem do produto vindo da api
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// cria o elemento customizado, com o elemento html, className e variavel
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function precoCarrinho() {
  const arrayProducts = Array.from(document.querySelectorAll('.cart__item'));
  arrayProducts.forEach((produto) => {
    const product = produto.innerText; // transforma o li em texto
    const sub = product.indexOf('$'); // pega o index do $
    const produtos = product.substring(sub + 1); // retira tudo a partir do indice da substring. O +1 é para retirar o $ tambem 
    preco += emptyCar + Number(produtos);
    priceCar.innerHTML = `<p>$${preco}</p>`;
  });
}

// quando clina em algum elemento da lista, ele exclui
function cartItemClickListener(event) {
  event.target.remove(); // foi utilizado o remove porque as '' deixaria um lugar vazio e poderia gerar alguma quebra. Imaginando como se fosse um array, com o remove, um array de length 5 passaria para 4. Com as '', permaneceria 5, mas com um lugar vazio no meio.
}
// cart que é criado no espaco do carrinho, quando o elemento for adicionado ele passará por aqui para ser criado cada item
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// é acionado quando o elemento o botao 'adicionar ao carrinho' é clicado. Essa função pegara os dados do item através do ID do produto selecionado 
const adicionaId = async (ids) => {
  const promiseItens = await fetchItem(ids);
  const { id, title, price } = promiseItens;
  const sku = id;
  const name = title;
  const salePrice = price;
  const itemSelected = createCartItemElement({ sku, name, salePrice }); // cria o elemento li na função acima 
  cart.appendChild(itemSelected); // insere o elemento no carrinho
  precoCarrinho();
  saveCartItems(cart.innerText);
};

// cria cada produto vindo da api 
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => adicionaId(sku)); // adiciona cada elemento quando for clicado no botão 'adicionar ao cacrrinho'
  section.appendChild(button);
  return section;
}
// esvazia o carrinho
esvaziaCarrinho.addEventListener('click', () => {
  cart.innerText = '';
  const esvazia = '';
  priceCar.innerText = 0;
  saveCartItems(esvazia);
});

function getSkuFromProductItem(item) {
  saveCartItems(cart.innerText);
  return item.querySelector('span.item__sku').innerText;
}
// passa os dados da api para serem criados no createProductItemElement
const promiseProduct = fetchProducts('computador');
const getProducts = () => {
  promiseProduct.then((response) => response.results.map((product) => {
    const sku = product.id;
    const name = product.title;
    const image = product.thumbnail;
    items.appendChild(createProductItemElement({ sku, name, image }));
  }));
};
getProducts();

window.onload = () => {};
