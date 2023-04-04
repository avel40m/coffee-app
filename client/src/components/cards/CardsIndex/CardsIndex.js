import React from 'react'
import './cardsindex.css';

const CardsIndex = () => {
  return (
    <section className='cards-principal'>
        <div className='overlay'></div>
        <div className="card-principal-index">
        <div className="title-principal">
            <div className='title-principal-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cup" width="100" height="100" viewBox="0 0 24 24" stroke="white" fill="none">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 11h14v-3h-14z" />
                <path d="M17.5 11l-1.5 10h-8l-1.5 -10" />
                <path d="M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
                <path d="M15 5v-2" />
            </svg>
            </div>
            <div className='title-principal-text'>Coffee APP</div>
        </div>
        <div className='parrafo-principal'>
            El mejor Cafe de la ciudad
        </div>
        <div className='form-principal'>
        <form className='formulario-principal'>
            <input type="search" className='formulario-principal-search' placeholder='Buscar Productos' />
            <input type="submit" value='Busqueda' className='formulario-principal-submit' />
        </form>
        </div>
        </div>
    </section>
  )
}

export default CardsIndex
