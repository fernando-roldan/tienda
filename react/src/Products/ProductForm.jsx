import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'

function ProductForm() {

  const navigate = useNavigate()
  let {id} = useParams()
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const [product, setProduct] = useState({
    id: null,
    category_id: '',
    name: '',
    description: '',
    image: '',
    price: '',
    stock: '',
  })

  if(id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setProduct(data)
        }).catch((err) => {
          setLoading(false)
        });
    }, [])
  }

  const getCategories = () => {
    axiosClient.get('/categories')
      .then(({ data }) => {
        setCategories(data.data)
      }).catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      {product.id && <h1>Editar producto</h1>}
      {!product.id && <h1>Nuevo producto</h1>}
      <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>
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
          <form className='row' onSubmit={onsubmit}>
            <div className='col-6'>
              <input value={product.name} onChange={ev => setProduct({...product, name: ev.target.value})} placeholder='Nombre' />
            </div>
            <div className='col-6'>
              <select className='form-controler' value={product.category_id} onChange={ev => setProduct({...product, category_id: ev.target.value})} placeholder='Categorias'>
                <option value="">Categorias</option>
                {
                  categories.map((categori) => (
                    <option key={categori.id} value={categori.id}>{categori.name}</option>
                  ))
                }
              </select>
            </div>
          </form>
        )}
      </div>
     
    </>
   
  )
}

export default ProductForm