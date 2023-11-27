import React, { useState } from 'react';
import { registerProduct } from './Logic/LogicProducts';
import { useNavigate } from 'react-router-dom';
import "./Form.css"

function RegisterProduct() {

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    codigo: -1,
    marca: '',
    modelo: '',
    precio: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleRegisterProduct = () => {
    const shouldUpdate = window.confirm("¿Estás seguro de que quieres agregar este producto?");

    if (shouldUpdate) {
      if (productData.marca === "") {
        alert("El espacio marca está en blanco");
      } else if (productData.modelo === "") {
        alert("El espacio modelo está en blanco");
      } else if (productData.precio === "") {
        alert("El espacio precio está en blanco");
      } else if (productData.tipo === "") {
        alert("El espacio correo está en blanco");
      } else {


        const result = registerProduct(productData)
        if (result) {
          alert("El producto se ha registrado con exito")
          navigate("/showProducts")
        } else {
          alert("No se pudo registrar el producto")
        }

      }
    }
  }

  const handleShowProducts = () => {
    navigate("/ShowProducts")
  }

  return (
    <div className='login-form'>
      <h1>Ingresar Producto</h1>
      <input
        type="text"
        placeholder="Marca"
        value={productData.marca}
        name="marca"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Modelo"
        name="modelo"
        value={productData.modelo}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Precio"
        name="precio"
        value={productData.precio}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Tipo"
        name="tipo"
        value={productData.tipo}
        onChange={handleChange}
      />
      <button onClick={handleRegisterProduct}>Ingresar</button>
      <button onClick={handleShowProducts}>Regresar</button>
    </div>
  );
}

export default RegisterProduct;