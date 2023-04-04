import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../App';
import './cart.style.css';

const Cart = () => {

    const {cartItems,setCartItems} = useContext(CartContext);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        const unique = cartItems.filter((obj,index,self) => {
            return index === self.findIndex((o) => {
                return o.name === obj.name;
            })
        })
        setCartItems(unique)
    },[]);

    useEffect(() => {
        const price = cartItems.map(cart => {
                     return cart.price
                     });
        let sum = price.reduce((x,y) => {
            return x + y
        },0)
        setTotal(sum);
    },[]);

    if (cartItems.length === 0) {
        return <h1>No tiene productos.</h1>
    }

   return (
    <div className='contenedor-cart'>
        
        {
          cartItems && cartItems.map((cart,index) => (
            <div key={index} className='card-cart'>
                <div className='card-cart-contenedor'>
                <h1>{cart.name}</h1>
                <p>Precio: $ {cart.price}</p>
                </div>
                <div className='card-cart-imagen'>
                    <img src={`http://localhost:4000/product/images/${cart._id}`} alt={cart.name} />
                </div>
            </div>
          ))
        }
        {
            total === 0 ? <br /> : <h1 className='total'>$ {total}</h1> 
        }
    </div>
  )
}

export default Cart
