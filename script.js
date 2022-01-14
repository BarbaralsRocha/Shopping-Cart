const items = document.querySelector('.items');
const cartItens = document.querySelector('.cart__items');
const adicionaCarrinho = document.querySelector('.item__add');
const productID = document.querySelector('.item__sku');
const cart = document.querySelector('.cart__items');
const esvaziaCarrinho = document.querySelector('.empty-cart')

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionaId = async (ids) => {
  const promiseItens = await fetchItem(ids);
  const { id, title, price } = promiseItens;
  const sku = id;
  const name = title;
  const salePrice = price;
  const itemSelected = createCartItemElement({ sku, name, salePrice });
  cart.appendChild(itemSelected);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => adicionaId(sku));
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

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

window.onload = () => { };
