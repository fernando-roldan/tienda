import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'
import { Link } from 'react-router-dom'


function Categories() {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = () => {
    setLoading(true)
    axiosClient.get('/categories')
      .then(({ data }) => {
        setLoading(false)
        setCategories(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onDeleteClick = category => {
    if (!window.confirm("Esta seguro de eliminar la categoria?")) {
      return
    }
    axiosClient.delete(`/categories/${category.id}`)
      .then(() => {
        setNotification('La categoria se elimino correctamente')
        getCategories()
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Categorias</h1>
        <Link className="btn-add" to="/admin/categoria/new">Nuevo</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
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
            {categories.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/admin/categoria/' + u.id}>Editar</Link>
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

export default Categories