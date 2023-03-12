import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import axiosClient from '../axios-client'

function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const sessionStar = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    
    setErrors(null)

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors)
          }else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <div className='login-signup-form animated fadeInDown bg-secondary'>
      <div className='form'>
        <form onSubmit={sessionStar}>
          <h1 className='title'>Iniciar sesión</h1>
          {
            errors && <div className='alert'>
              {Object.keys(errors).map(keys => (
                <p key={keys}>{errors[keys][0]}</p>
              ))}
            </div>
          }
          <input className='mb-2' ref={emailRef} type="email" placeholder='Email' />
          <input className='mb-2' ref={passwordRef} type="password" placeholder='Password' />
          <button className='btns btn-block'>Login</button>
          <p className='message'>
            {/* Registrate <Link to={'/signup'}>Crea una cuenta</Link> */} 
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login