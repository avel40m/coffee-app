const ListProduct = ({product,loading}) => {
    if(loading) {
      return <h2>Loading...</h2>
    }
    return (
      <ol>
        {product && product.map((product,index) => (
          <li key={product.id} className="list-product" >
            <p>{index + 1}.</p>
            <p>{product.name}</p>
            <p>$ {product.price}</p>
          </li>
        ))
      }
      </ol>
    )
  }

export default ListProduct;