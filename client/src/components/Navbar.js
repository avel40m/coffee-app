import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext, UserPermissions } from "../App";
import CoffeeIcon from '../assets/coffee.png';
import { recoverToken, removeToken } from "../utils/Data";
import './styles/navbar.styles.css';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => { 
  const {authenticated, setAuthenticated} = useContext(UserContext)
  const {users,setUsers} = useContext(UserPermissions);
  const {cartItems,setCartItems} = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(recoverToken());
  },[]);

  const handleRemove = () => {
    removeToken();
    navigate('/login');
    setAuthenticated(null);
    setUsers(null);
    setCartItems([]);
    Swal.fire({
      icon:'info',
      text:'Has cerrado session',
      timer: 2000
    })
  }

  return (
    <nav className="navbar">
      <ul className="navbar-icon">
        <li className="navbar-img">
          <Link to={"/"}>
            <img src={CoffeeIcon} alt="icon-coffee" />
            <p className="navbar-text">DeliveryCofee</p> 
          </Link>
        </li>
      </ul>
      <ul className="navbar-menu">
        {authenticated === null && (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )}
        {authenticated !== null && (
          <>
            <li className="nav-authentication">
              <Link onClick={handleRemove}>Cerrar sesion</Link>
             {
              users && users.permission === 'admin' && <Link to={"/admin"}>Admin</Link>
             }              
             {
              users && users.permission === 'client' && <Link to={"/cart"} className="nav-cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="25" height="25" viewBox="0 0 24 24" stroke="#fff" fill="none">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="6" cy="19" r="2" />
                  <circle cx="17" cy="19" r="2" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
                <p className="nav-cart-parrafo">{cartItems?.length}</p>                
              </Link>
             }              
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
