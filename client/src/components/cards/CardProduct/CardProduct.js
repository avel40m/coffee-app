import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CartContext, UserPermissions } from "../../../App";
import { getAllProduct } from "../../../utils/Product";
import "./cardproduct.css";

const CardProduct = () => {
    const {users} = useContext(UserPermissions);
    const [product,setProduct] = useState([]);
    const {cartItems,setCartItems} = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllProduct();
            setProduct(result.producto);
        }
        fetchData()
    },[])

    const handleAddCart = (e,id) => {
      e.preventDefault();
      let addProduct = product.filter(product => product._id === id)[0];
      setCartItems([...cartItems,addProduct]);
      Swal.fire({
        icon:"success",
        text:"Producto agregado a la cesta",
        timer: 1000
      })
    }

    return (
    <div className="card-product">
      <h1 className="card-title">Listados de Productos</h1>
        <div className="contenedor">
            {
                product && product.map((product,index) =>(
                    <div className="card-product-details" key={index}>
                        <img
                            className="card-product-image"
                            src={`http://localhost:4000/product/images/${product._id}`}
                            alt="CAfe"
                        />
                        <h3 className="card-product-title">{product.name}</h3>
                        <p className="card-product-price">Precio: ${product.price}</p>
                        {
                        users ?
                        users.permission === 'client' ?
                          <button onClick={e => handleAddCart(e,product._id)} className="card-product-buttom">Solicitar compras</button>
                          :
                          <p>Categoria: {product.category.name}</p>
                        :
                        <br />
                        }
                    </div>
                ))
            }
      </div>
    </div>
  );
};

export default CardProduct;
