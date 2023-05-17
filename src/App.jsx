import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct} from "./redux/productSlice";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "./Modal";
import "/src/css/productos.css";

export let carrito = [];
let carritoAbierto = false;

function App() {
  const dispatch = useDispatch();
  const [products, setProducto] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const product = await data.json();
        dispatch(addProduct(product));
        setProducto(product);
        setFilteredProducts(product);
        handleAddProduct(product);
        carrito.splice(0, carrito.length);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const [productos, setProductos] = useState(carrito);
  const actualizarCarrito = (nuevoCarrito) => {
    carrito = nuevoCarrito;
    setProductos(carrito);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredProducts(filteredProducts);
  };

  function handleAddProduct(product) {
    const productWithId = { ...product, id: uuidv4() };
    carrito.push(productWithId);
  }

  function handleClick() {
    setShowModal(true);
    carritoAbierto = true;
  }
  function handleClose() {
    setShowModal(false);
    carritoAbierto = false;
  }
  return (
    <div className="App">
      <div className="text-center">
        {/* buscador */}
        <div className="bg-emerald-600 mb-4">
          <div className="items-center inline-flex">
            <input
              type="text"
              placeholder="Busca tu producto..."
              value={searchTerm}
              onChange={handleSearch}
              className=" text-black italic w-50 md:w-80 xl:w-96 mx-auto h-10 rounded-md p-4 m-4"
            />
            <div>
              <button
                onClick={carritoAbierto ? handleClose : handleClick}
                className="bg-emerald-800 hover:bg-emerald-700 p-2 mx-4 text-white rounded-md"
              >
                {carritoAbierto ? "❌" : "🛒"}
              </button>
              {showModal && (
                <Modal
                  productos={productos}
                  actualizarCarrito={actualizarCarrito}
                />
              )}
            </div>
          </div>
        </div>
        {/* productos */}
        <div onClick={handleClose} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-x-0 gap-y-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="mx-auto pt-2 items-center w-60 h-fit rounded-md text-black drop-shadow-2xl bg-white"
                key={product.id}
              >
                <img
                  className="rounded-md w-40 h-40 mx-auto"
                  src={product.image}
                />
                <div className="mx-auto items-center m-4 text-center">
                  <hr />
                  <p className="text-xl font-bold">$ {product.price}</p>
                  <p
                    style={{
                      margin: "10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </p>
                  <button
                    onClick={() => handleAddProduct(product)}
                    className="drop-shadow-2xl text-white bg-emerald-500 w-20 p-1 mt-2 rounded-md inset-x-0 bottom-0 hover:bg-emerald-400"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="resultados z-0">
              No se encontraron productos que coincidan con la búsqueda. 👻
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
