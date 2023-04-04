import { createContext, useState,  } from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './Pages/Admin/Admin';
import Category from './Pages/Admin/Coffee/Category/Category';
import Product from './Pages/Admin/Coffee/Product/Product';
import Cart from './Pages/Cart/Cart';
import Error404 from './Pages/Error/Error404';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

export const UserContext = createContext({}); 
export const UserPermissions = createContext({});
export const CartContext = createContext({});

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [users,setUsers] = useState(null);
  const [cartItems,setCartItems] = useState([]);
  return (
    <UserContext.Provider value={{authenticated,setAuthenticated}}>
      <UserPermissions.Provider value={{users,setUsers}}>
        <CartContext.Provider value={{cartItems,setCartItems}} >
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            {
              users && users.permission === 'admin' ? 
              <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/categoria' element={<Category />} />
              <Route path='/admin/product' element={<Product />} />
              </>
              :
              <></>
            }
            <Route path='*' element={<Error404 code={404} texto={'URL no encontrada'} />} />
          </Routes>
        </CartContext.Provider>
      </UserPermissions.Provider>
    </UserContext.Provider>
  );
}

export default App;
