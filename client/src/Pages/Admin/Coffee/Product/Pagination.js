import React from 'react'
import '../../Styles/pagination.style.css';

const Pagination = ({postPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ) {
        pageNumbers.push(i);
    }
  return (
    <nav className='pagination-nav'>
        <ul className='pagination'>
            {
                pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={(e) => paginate(e,number)} href="!#" className='page-link'>
                            {number}
                        </a>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Pagination
