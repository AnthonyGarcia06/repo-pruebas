import React, { useEffect, useState } from 'react';
import './ShowProducts.css';
import { deleteProduct, getAllProducts } from './Logic/LogicProducts';
import { useNavigate } from 'react-router-dom';

function ShowProducts(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    props.setIsLogin(false);
    props.setIsSignup(false);
    props.setIsAdmin(true);

    getAllProducts()
      .then((productList) => {
        setProducts(productList);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  const handleDeleteProduct = (productCode) => {
    const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    
    if (shouldDelete) {
      const result = deleteProduct(productCode);
      if (result) {
        alert("El producto se ha eliminado con éxito");
        window.location.reload();
      } else {
        alert("No se pudo eliminar el producto");
      }
    }
  };

  const handleEditProduct = (productCode) => {
    navigate(`/EditProduct/${productCode}`);
  }

  const handleCreateProduct = () => {
    navigate("/registerProduct");
  }

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={handleCreateProduct}>Nuevo</button>
      <table className="product-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.codigo}>
              <td>{product.codigo}</td>
              <td>{product.marca}</td>
              <td>{product.modelo}</td>
              <td>{product.precio}</td>
              <td>{product.tipo}</td>
              <td>
                <button onClick={() => handleEditProduct(product.codigo)}>Modificar</button>
                <button onClick={() => handleDeleteProduct(product.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowProducts;
