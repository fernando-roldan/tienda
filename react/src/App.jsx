import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useStateContext } from './Contexts/ContextProvider'
import axiosClient from './axios-client'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const  {setCart} = useStateContext()


  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setLoading(true)
    axiosClient.get('/tienda')
      .then(({ data }) => {
        setLoading(false)
        setProducts(data.data)
      }).catch((err) => {
        setLoading(false)
      });
  }

  const addToCart = (id) => {
    const item = products
    const items = item.find((item) => item.id === id)

    let addTo = {
      id: items.id,
      category: items.category.name,
      description: items.description,
      name: items.name,
      price: items.price,
      ammount: 1
    }
    
    setCart(addTo)

    setNotification('Se agrego al carrito')
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {
            products.map(u => (
              <div key={u.id} className='col-12 col-md-4'>
                <div>
                  <Card style={{ width: '18rem'}}>
                    <Card.Img variant='top' src='../public/default.png' />
                    <Card.Body>
                      <Card.Title>{u.name} - {u.category.name}</Card.Title>
                      <Card.Text>
                        {u.description}
                      </Card.Text>
                      <Card.Text>
                        ${u.price}
                      </Card.Text>
                      <Button  onClick={addToCart.bind(this, u.id)} variant="primary">Agregar</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
