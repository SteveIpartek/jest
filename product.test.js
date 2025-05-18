const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
  resetProducts();
});


describe('addProduct', () => {
  it('debería agregar un producto', () => {
    addProduct('Laptop', 1200);
    expect(getProducts().length).toBe(1);
    expect(getProducts()[0]).toEqual({ id: 1, name: 'Laptop', price: 1200 });
  });

  it('debería incrementar el id en 1 cada vez que se añada un producto', () => {
    addProduct('Laptop', 1200);
    addProduct('Mouse', 25);
    expect(getProducts()[1].id).toBe(2);
  });

  it('debería lanzar un error si el nombre o el precio no están definidos', () => {
    expect(() => addProduct(undefined, 100)).toThrow('El nombre y el precio del producto son obligatorios.');
    expect(() => addProduct('Keyboard', undefined)).toThrow('El nombre y el precio del producto son obligatorios.');
    expect(() => addProduct(undefined, undefined)).toThrow('El nombre y el precio del producto son obligatorios.');
  });

  it('debería lanzar un error si el producto ya existe', () => {
    addProduct('Laptop', 1200);
    expect(() => addProduct('Laptop', 1200)).toThrow('El producto "Laptop" ya existe.');
  });
});

describe('removeProduct', () => {
  it('debería eliminar un producto', () => {
    addProduct('Laptop', 1200);
    addProduct('Mouse', 25);
    removeProduct(1);
    expect(getProducts().length).toBe(1);
    expect(getProducts()[0].name).toBe('Mouse');
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => removeProduct(1)).toThrow('No se encontró ningún producto con el ID 1.');
  });
});

describe('getProduct', () => {
  it('debería devolver un producto por su id', () => {
    addProduct('Laptop', 1200);
    const product = getProduct(1);
    expect(product).toEqual({ id: 1, name: 'Laptop', price: 1200 });
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => getProduct(1)).toThrow('No se encontró ningún producto con el ID 1.');
  });
});

describe('updateProduct', () => {
  it('debería actualizar un producto por su id', () => {
    addProduct('Laptop', 1200);
    updateProduct(1, 'Laptop Pro', 1500);
    const updatedProduct = getProduct(1);
    expect(updatedProduct).toEqual({ id: 1, name: 'Laptop Pro', price: 1500 });
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => updateProduct(1, 'Laptop Pro', 1500)).toThrow('No se encontró ningún producto con el ID 1.');
  });

  it('debería solo actualizar el precio', () => {
    addProduct('Laptop', 1200);
    updateProduct(1, undefined, 1300);
    const updatedProduct = getProduct(1);
    expect(updatedProduct).toEqual({ id: 1, name: 'Laptop', price: 1300 });
  });

  it('debería solo actualizar el nombre', () => {
    addProduct('Laptop', 1200);
    updateProduct(1, 'Ultrabook', undefined);
    const updatedProduct = getProduct(1);
    expect(updatedProduct).toEqual({ id: 1, name: 'Ultrabook', price: 1200 });
  });
});