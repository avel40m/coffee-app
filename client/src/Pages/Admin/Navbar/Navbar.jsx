import { Link } from "react-router-dom"

const Navbar = () => {
  return (
   <nav className="navbar-admin">
    <li>
        <Link to={'/admin'} className="navbar-admin-link">Inicio</Link>
    </li>
    <li>
        <Link to={'/admin/categoria'} className="navbar-admin-link" >Categoria</Link>
    </li>
    <li>
        <Link to={'/admin/product'} className="navbar-admin-link" >Productos</Link>
    </li>
   </nav>
  )
}

export default Navbar
