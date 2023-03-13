import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axios-client';

function CategoryForm() {

  const navigate = useNavigate()
  let {id} = useParams();
  const [category, setCategory] = useState({
    id: null,
    name: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/categories/${id}`)
        .then(({data}) => {
          setLoading(false)
          setCategory(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = event => {
    event.preventDefault()
    if (category.id) {
      axiosClient.put(`/categories/${category.id}`, category)
        .then((result) => {
          setNotification('Categoria editada correctamente')
          navigate('/admin/categorias')
        }).catch((err) => {
          const response = err.response
          if(response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    } else {
      axiosClient.post('/categories', category)
        .then((result) => {
          setNotification('Categoria creada correctamente')
          navigate('/admin/categorias')
        }).catch((err) => {
          const response = err.response
          if(response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    }
  }
  return (
    <>
      {category.id && <h1>Editar categoria</h1>}
      {!category.id && <h1>Nueva categoria</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input className='mb-2' value={category.name} onChange={ev => setCategory({...category, name: ev.target.value})} placeholder="Name"/>
            <button className="btns">Guardar</button>
          </form>
        )}
      </div>
    </>
  )
}

export default CategoryForm