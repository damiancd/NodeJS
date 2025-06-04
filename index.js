// index.js
const BASE_URL = 'https://fakestoreapi.com';
const [, , metodo, recurso, ...args] = process.argv;

function main() {
  try {
    switch (metodo.toUpperCase()) {
      case 'GET':
        funcionGET(recurso, args);
        break;
      case 'POST':
        funcionPOST(args);
        break;
      case 'DELETE':
        funcionDELETE(recurso);
        break;
      default:
        console.log(`Método no soportado: ${metodo}`);
    }
  } catch (error) {
    console.error('Error en la ejecución:', error.message);
  }
}

async function funcionGET(recurso,args) {
  // Si es "products" o "products/<id>"
  let url = `${BASE_URL}/${recurso}`;
  if (args.length === 1 && recurso === 'products') {
    url = `${BASE_URL}/products/${args[0]}`;
  }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
}

function funcionPOST(args) {
  const [title, price, ...category] = args;
  console.log('Se ingresó el producto:');
  console.log(`Producto: ${title}`);
  console.log(`Precio: ${price}`);
  console.log(`Categoría: ${category}`);
}

function funcionDELETE(recurso) {
    const match = recurso.match(/^products\/(\d+)$/);
    const productId = match[1];
    console.log(`Se eliminó el producto con ID ${productId}`);
}

main();