interface Productos {
  nombre: string;
  costo: number;
  id: string;
}
interface Respuesta {
  nombre: string;
  cambio: number[];
}

const productos: Productos[] = [
  {
    nombre: "Producto A",
    costo: 270,
    id: "A",
  },
  {
    nombre: "Producto B",
    costo: 340,
    id: "B",
  },
  {
    nombre: "Producto C",
    costo: 390,
    id: "C",
  },
];
const monedasAceptables: number[] = [50, 100, 10];
const ERRORES = {
  MONEDA_NO_VALIDA: "Ese valor de moneda no es aceptada.",
  DINERO_NO_SUFICIENTE: "El dinero ingresado no es suficiente.",
  PRODUCTO_NO_ENCONTRADO:
    "El producto ingresado no existe. Prueba con 'A', 'B' o 'C'",
};

const revisarSiMontoEsCeroSiNoMeteDinero = (
  dineroObj: object,
  moneda: number,
  monto: number,
  respuesta: any,
  cambio: number
) => {
  dineroObj = { moneda: moneda, monto: monto };
  if (monto !== 0) {
    respuesta.cambio.push(dineroObj);
    cambio = cambio - monto * moneda;
  }
  return { dineroObj, cambio };
};

const maquinaAlimentos = (dinero: number[], id: string) => {
  let respuesta: Respuesta = {
    nombre: "",
    cambio: [],
  };

  const validacionDinero = dinero.map((moneda) =>
    monedasAceptables.includes(moneda)
  );

  if (validacionDinero.every((validacion) => validacion)) {
    const sumaDineroIntroducido = dinero.reduce(
      (valorPrevio, valorActual) => valorPrevio + valorActual,
      0
    );

    const productoDeseado = productos.find((producto) => producto.id === id);

    if (typeof productoDeseado === "undefined") {
      respuesta = {
        nombre: ERRORES.PRODUCTO_NO_ENCONTRADO,
        cambio: dinero,
      };
    } else if (sumaDineroIntroducido < productoDeseado.costo) {
      respuesta = {
        nombre: ERRORES.DINERO_NO_SUFICIENTE,
        cambio: dinero,
      };
    } else {
      respuesta.nombre = productoDeseado.nombre;

      const cambioDeDineroTotal = sumaDineroIntroducido - productoDeseado.costo;
      let cambio = parseFloat((cambioDeDineroTotal / 1).toFixed(2));
      const monedasAceptablesOrdenadas = monedasAceptables.sort(
        (a, b) => b - a
      );

      const monedasADevolver = monedasAceptablesOrdenadas.filter((moneda) => {
        const mod = cambio % moneda;

        if (mod === Math.trunc(cambio)) return false;
        else return true;
      });

      monedasADevolver.map((moneda) => {
        if (moneda !== null) {
          let monto = cambio / moneda;

          const montoEsDecimal = monto % 1 !== 0;

          let dineroObj: object = {};

          if (montoEsDecimal) {
            const division = cambio / moneda;
            monto = Math.trunc(division);
          }

          ({ dineroObj, cambio } = revisarSiMontoEsCeroSiNoMeteDinero(
            dineroObj,
            moneda,
            monto,
            respuesta,
            cambio
          ));
        }
      });
    }
  } else {
    respuesta = {
      nombre: ERRORES.MONEDA_NO_VALIDA,
      cambio: dinero,
    };
  }

  return respuesta;
};

const retornoCambio = (
  usuario: string,
  pago: number[],
  productoCodigo: string
) => {
  const cambioMonedas = maquinaAlimentos(pago, productoCodigo);
  let { nombre, cambio } = cambioMonedas;

  if (cambio.length === 0)
    console.log(`${usuario}, pagaste lo justo por el ${nombre}.`);

  cambioMonedas.cambio.forEach((monedaCambio: any) => {
    console.log(
      `${usuario}, tu cambio por el ${nombre} es ${monedaCambio.monto} monedas de $${monedaCambio.moneda}.`
    );
  });
};

retornoCambio("Carlos", [100, 10, 50, 100, 100], "A");
/**
 * Respuesta esperada:
 * Carlos, tu cambio por el Producto A es 1 monedas de $50.
 * Carlos, tu cambio por el Producto A es 4 monedas de $10.
 */

retornoCambio("Jose", [100, 100, 100, 100], "B");
/**
 * Respuesta esperada:
 * Jose, tu cambio por el Producto A es 1 monedas de $50.
 * Jose, tu cambio por el Producto A es 1 monedas de $10.
 */

retornoCambio("Sarah", [100, 100, 50, 10, 100, 10, 10, 10], "C");
/**
 * Respuesta esperada:
 * Sarah, pagaste lo justo por el Producto C.
 */