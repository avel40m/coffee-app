import { useEffect, useState } from "react";
import { getAllCategory } from "../../../../utils/Category";
import { addProduct } from "../../../../utils/Product";
import Swal from 'sweetalert2';

const AddProduct = ({product,setProduct}) => {

    const [dataCategory,setDataCategory] = useState(null);
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState(null);
    const [category,setCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCategory();
            setDataCategory(result)
        }
        fetchData()
    },[])

    const handleImagen = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(image);
        const newProduct = await addProduct(name,price,image,category);
        if (newProduct !== null) {
            console.log(newProduct);
            setProduct([...product,newProduct.newProduct])
            Swal.fire({
                icon:'success',
                text:'El producto fue creado correctamente',
                timer: 2000
            });
            setName('')
            setPrice('')
            setImage('')
            setImage('')
        }else{
            Swal.fire({
            icon:'success',
                text:'El producto fue creado correctamente',
                timer: 2000
            });
        }
    }

    return (
        <section className="add-category">
        <h4>Agregar Producto</h4>
        <form className="add-category-form" onSubmit={handleSubmit} >
          <label htmlFor="nombre" className="add-category-label">Nombre</label>
          <input 
              type="text" 
              placeholder="Ingresar Nombre" 
              className="add-category-input"
              value={name}
              onChange={e => setName(e.target.value)}
          />
          <label htmlFor="precio" className="add-category-label">Precio</label>
          <input 
              type="text" 
              placeholder="Ingresar Precio" 
              className="add-category-input"
              value={price}
              onChange={e => setPrice(e.target.value)}
          />
          <label htmlFor="imagen" className="add-category-label">Imagen</label>
          <input 
              type="file" 
              placeholder="Seleciciobar imagen" 
              className="add-category-input"
              onChange={handleImagen}
          />
          <label htmlFor="categoria" className="add-category-label">Seleccionare Categoria</label>
          <select 
          className="add-category-input"
          value={category}
          onChange={e => setCategory(e.target.value)}
          >
            {
                dataCategory && dataCategory.map(categoria => (
                    <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                ))
            }
          </select>
          <input type="submit" value='Guardar' className="add-category-buttom" />
        </form>
        </section>
    )
  }

export default AddProduct;