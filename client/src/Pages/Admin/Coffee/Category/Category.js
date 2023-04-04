import { useState,useEffect } from "react";
import Navbar from '../../Navbar/Navbar'
import { getAllCategory } from '../../../../utils/Category.js';
import '../../Styles/index.styles.css';
import ProductCategory from "./ProductCategory";
import AddCategory from "./AddCategory";

const Category = () => {
    const [category,setCategory] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getAllCategory();
        setCategory(result);
      }
  
      fetchData();
    },[])

    return (
      <div className='contenedor-admin'>    
      <Navbar />
      <div className='contenedor-principal'>
        <h1>Categorias</h1>
        <div className="contenedor-principal-body">
          <ProductCategory category={category} />
          <AddCategory category={category} setCategory={setCategory} />
        </div>
      </div>
      </div>
    )
}

export default Category
