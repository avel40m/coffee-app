import React, { useState } from 'react'
import { addCategory } from '../../../../utils/Category';
import Swal from 'sweetalert2';

const AddCategory = ({category,setCategory}) => {
    const [name,setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = await addCategory(name);
        if (newCategory === null) {
          Swal.fire({
            icon:'error',
            text:'Ocurrio un error al guardar',
            timer:2000
          })
        } else {
          setCategory([...category,newCategory])
          Swal.fire({
            icon:'success',
            text:'La categoria fue agregada',
            timer:2000
          })
          setName('');
        }
    }

    return (
          <section className="add-category">
          <h4>Agregar Categoria</h4>
          <form onSubmit={handleSubmit} className="add-category-form" >
            <label htmlFor="nombre" className="add-category-label">Nombre</label>
            <input 
                type="text" 
                placeholder="Ingresar Nombre" 
                className="add-category-input"
                value={name}
                onChange={e => setName(e.target.value)}
                 />
            <input type="submit" value='Guardar' className="add-category-buttom" />
          </form>
          </section>
        )
    }

export default AddCategory
