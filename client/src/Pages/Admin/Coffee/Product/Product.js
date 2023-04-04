import { useEffect, useState } from "react"
import { getAllProduct } from "../../../../utils/Product"
import Navbar from "../../Navbar/Navbar"
import AddProduct from "./AddProduct"
import ListProduct from "./ListProduct"
import Pagination from "./Pagination"

const Product = () => {
  const [product,setProduct] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAllProduct();
      setProduct(result.producto);
      setLoading(false);
    }
    fetchData();
  },[])

  const indexOfLastProduct = currentPage * postPerPage;
  const indexOfFirstProduct =indexOfLastProduct - postPerPage;
  const currentPost = product.slice(indexOfFirstProduct,indexOfLastProduct)
 
  const paginate = (e,pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber)
  }

  return (
    <div className='contenedor-admin'>
      <Navbar />
      <div className='contenedor-principal'>
        <h1>Productos</h1>
        <div className="contenedor-principal-body">
          <div className="contenedor-principal-body-list">
          <ListProduct product={currentPost} loading={loading} />
          <Pagination postPerPage={postPerPage} totalPosts={product.length} paginate={paginate} />
          </div>
          <AddProduct product={product} setProduct={setProduct} />
        </div>
      </div>
    </div>
  )
}

export default Product
