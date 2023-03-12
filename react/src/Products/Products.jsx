import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'
import { Link } from 'react-router-dom'

function Products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getProducts()
  }, [])


  const getProducts = () => {
    setLoading(true)
    axiosClient.get('/products')
      .then(({ data }) => {
        setLoading(false)
        setProducts(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onDeleteClick = product => {
    if (!window.confirm("Esta seguro de eliminar el producto?")) {
      return
    }
    axiosClient.delete(`/categories/${category.id}`)
      .then(() => {
        setNotification('El producto se elimino correctamente')
        getProducts()
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Productos</h1>
        <Link className="btn-add" to="/admin/producto/new">Nuevo</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Accion</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {products.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.image}</td>
                <td>{u.name}</td>
                <td>{u.category.name}</td>
                <td>${u.price}</td>
                <td>{u.stock}</td>
                <td>
                  <Link className="btn-edit" to={'/admin/producto/' + u.id}>Editar</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Eliminar</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Products