let products = [];
let idCounter = 0;

function resetProducts() {
  products = [];
  idCounter = 0;
}

function addProduct(name, price) {
  if (!name || price === undefined) {
    throw new Error('El nombre y el precio del producto son obligatorios.');
  }

  if (products.some(product => product.name === name)) {
    throw new Error(`El producto "${name}" ya existe.`);
  }

  idCounter++;
  const newProduct = { id: idCounter, name, price };
  products.push(newProduct);
  return newProduct;
}

function removeProduct(id) {
  const initialLength = products.length;
  products = products.filter(product => product.id !== id);
  if (products.length === initialLength) {
    throw new Error(`No se encontró ningún producto con el ID ${id}.`);
  }
}

function getProducts() {
  return [...products]; // Devolvemos una copia para evitar modificaciones externas
}

function getProduct(id) {
  const product = products.find(product => product.id === id);
  if (!product) {
    throw new Error(`No se encontró ningún producto con el ID ${id}.`);
  }
  return { ...product }; // Devolvemos una copia para evitar modificaciones externas
}

function updateProduct(id, name, price) {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) {
    throw new Error(`No se encontró ningún producto con el ID ${id}.`);
  }

  if (name !== undefined) {
    products[productIndex].name = name;
  }
  if (price !== undefined) {
    products[productIndex].price = price;
  }
}

module.exports = {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct
};