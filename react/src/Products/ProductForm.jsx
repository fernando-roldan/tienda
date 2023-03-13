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

  const onSubmit = event => {
    event.preventDefault()
    if(product.id) {
      axiosClient.put(`/products/${product.id}`, product)
        .then((result) => {
          setNotification('Producto editado correctamente')
          navigate('/admin/productos')
        }).catch((err) => {
          const response = err.response
          if(response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    } else {
      
      console.log(product)
      axiosClient.post('/products', product)
        .then((result) => {
          setNotification('Producto creado correctamente')
          //navigate('/admin/productos')
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
          <form className='row' onSubmit={onSubmit}>
            <div className='col-6 my-2'>
              <input value={product.name} onChange={ev => setProduct({...product, name: ev.target.value})} placeholder='Nombre' />
            </div>
            <div className='col-6 my-2'>
              <select className='form-controler' value={categories.id} onChange={ev => setProduct({...product, category_id: ev.target.value})} placeholder='Categorias'>
                <option value="">Categorias</option>
                {
                  categories.map((categori) => (
                    <option key={categori.id} value={categori.id}>{categori.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-6 my-2">
              <input value={product.description} onChange={ev => setProduct({...product, description: ev.target.value})} placeholder='descripcion' />
            </div>
            <div className="col-6 my-2">
              <input type='number' value={product.price} onChange={ev => setProduct({...product, price: ev.target.value})} placeholder='$0.00' />
            </div>
            <div className="col-6 my-2">
              <input type='number' value={product.stock} onChange={ev => setProduct({...product, stock: ev.target.value})} placeholder='stock' />
            </div>
            <div className='col-12'>
              <button className='btns'>Guardar</button>
            </div>
            
          </form>
        )}
      </div>
     
    </>
   
  )
}

export default ProductForm