import React from "react";

export function Modal({ productos, actualizarCarrito }) {
  const eliminarProducto = (id) => {
    const nuevoCarrito = productos.filter((producto) => producto.id !== id);
    actualizarCarrito(nuevoCarrito);
  };
  const total = productos
    .reduce((acumulador, producto) => acumulador + producto.price, 0)
    .toFixed(2);

  const handleFinalizarCompra = () => {
    const carritoFinalizado = productos.filter(
      (producto) => producto.id > producto.length
    );
    actualizarCarrito(carritoFinalizado);
  };

  return (
    <div className="bg-white drop-shadow-2xl mx-auto w-80 sm:w-96 right-0 sm:right-20 md:right-48 xl:right-80 2xl:right-96 h-auto absolute rounded-xl z-40">
      <h2 className="text-emerald-950 text-2xl">Productos en el carrito</h2>
      {productos.length > 0 ? (
        productos.map((producto) => {
          return (
            <div
              key={producto.id}
              className="p-4 w-80 sm:w-96 inline-flex items-center relative"
            >
              <img className="rounded-md w-10 h-10 mr-4" src={producto.image} />
              <p
                style={{
                  marginRight: "auto",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "5px",
                }}
                className="text-black"
              >
                {producto.title}
              </p>
              <p className="text-black text-lg font-bold p-2 pr-6">
                ${producto.price}
              </p>
              <button
                style={{
                  width: "30px",
                  height: "20px",
                  padding: "0",
                  paddingRight: "10px",
                  paddingLeft: "0px",
                  backgroundColor: "transparent",
                  border: "none",
                  position: "absolute",
                  bottom: "10",
                  right: "0",
                }}
                className="grid justify-items-end"
                onClick={() => eliminarProducto(producto.id)}
              >
                <img
                  src="src/eliminar.png"
                  className="w-full h-full"
                />
              </button>
            </div>
          );
        })
      ) : (
        <p className="italic">No hay productos en el carrito.</p>
      )}
      <div>
        <p className="italic font-bold">TOTAL: ${total}</p>
        <button
          className="w-40 h-10 m-2 rounded-xl bg-emerald-700 hover:bg-emerald-500 text-white"
          onClick={handleFinalizarCompra}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}