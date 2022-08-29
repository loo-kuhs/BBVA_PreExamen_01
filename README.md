# Solución

Hola, esta es mi solución al problema propuesto en el documento **BBVA_PreExamen01.pdf**. Use el lenguaje de programación TypeScript.

A continuación comento aquí que hacen las funciones que implemente en el problema:

## Función revisarSiMontoEsCeroSiNoMeteDinero()

Toma un objeto, un número, un número, un objeto y un número, y devuelve un objeto y un número

* @param {object}  dineroObj - objeto,

* @param {number}  moneda - número,

* @param {number}  monto - número

* @param {any}  respuesta - any = { cambio: [] };

* @param {number}  cambio - número = 0;

* @returns Un objeto con dos propiedades: dineroObj y cambio.

## Función maquinaAlimentos()

Toma una matriz de números y una cadena, y devuelve un objeto con una cadena y una matriz de números

* @param {number[]}  dinero - número[]

* @param {string}  id - cadena de texto

* @returns Un objeto con dos propiedades: nombre y cambio.

## Función retornoCambio()

Toma un nombre de usuario, una matriz de montos de pago y un código de producto, y devuelve un mensaje al usuario con el cambio que debe recibir.

* @param {string}  usuario - cade de texto,

* @param {number[]}  pago - []

* @param {string}  productoCodigo - cadena de texto

## Salidas esperadas

Producto A:

    retornoCambio("Carlos", [100,  10,  50,  100,  100],  "A");
* Carlos, tu cambio por el Producto A es 1 monedas de $50.

* Carlos, tu cambio por el Producto A es 4 monedas de $10.

Producto B:

    retornoCambio("Jose", [100,  100,  100,  100],  "B");
* Jose, tu cambio por el Producto A es 1 monedas de $50.

* Jose, tu cambio por el Producto A es 1 monedas de $10.

Producto C:

    retornoCambio("Sarah", [100,  100,  50,  10,  100,  10,  10,  10],  "C");
* Sarah, pagaste lo justo por el Producto C.


   



