import React, { useEffect, useState } from 'react';
import { getProductByCode, registerProduct, updateProduct } from './Logic/LogicProducts';
import { useNavigate, useParams } from 'react-router-dom';
import "./Form.css"

function EditProduct() {

  const { code } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    codigo: code,
    marca: '',
    modelo: '',
    precio: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdate = () => {
    const shouldUpdate = window.confirm("¿Estás seguro de que quieres modificar este producto?");

    if (shouldUpdate) {

      if (productData.marca === "") {
        alert("El espacio marca está en blanco");
      } else if (productData.modelo === "") {
        alert("El espacio modelo está en blanco");
      } else if (productData.precio === "") {
        alert("El espacio precio está en blanco");
      } else if (productData.tipo === "") {
        alert("El espacio tipo está en blanco");
      } else {

        const result = updateProduct(productData);
        if (result) {
          alert("El producto se ha actualizado con éxito");
          navigate("/ShowProducts");
        } else {
          alert("No se pudo actualizar el producto");
        }
      }
    }
  }

  const handleShowUser = () => {
    navigate("/ShowProducts")
  }

  useEffect(() => {


    const fetchdata = async () => {
      try {
        const result = await getProductByCode(code);
        console.log(result)
        setProductData(result)

      } catch (error) {
        console.log(error)
      }
    };

    fetchdata();

  }, [code])

  return (
    <div className='login-form'>
  <h1>Modificar producto</h1>
  <label>
    Marca:
    <input
      type="text"
      placeholder="Marca"
      value={productData.marca}
      name="marca"
      onChange={handleChange}
    />
  </label>
  <label>
    Modelo:
    <input
      type="text"
      placeholder="Modelo"
      name="modelo"
      value={productData.modelo}
      onChange={handleChange}
    />
  </label>
  <label>
    Precio:
    <input
      type="number"
      placeholder="Precio"
      name="precio"
      value={productData.precio}
      onChange={handleChange}
    />
  </label>
  <label>
    Tipo:
    <input
      type="text"
      placeholder="Tipo"
      name="tipo"
      value={productData.tipo}
      onChange={handleChange}
    />
  </label>

  <button onClick={handleUpdate}>Actualizar</button>
  <button onClick={handleShowUser}>Regresar</button>
</div>

  );
}

export default EditProduct;