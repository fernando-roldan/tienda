import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axiosClient from "../axios-client.js"
import { useStateContext } from '../Contexts/ContextProvider.jsx';

function UserForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [user, setUser] = useState({
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if (id) {
      useEffect(() => {
        setLoading(true)
        axiosClient.get(`/users/${id}`)
          .then(({data}) => {
            setLoading(false)
            setUser(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
    }

    const onSubmit = ev => {
      ev.preventDefault()
      if (user.id) {
        axiosClient.put(`/users/${user.id}`, user)
          .then(() => {
            setNotification('Usuario editado correctamente')
            navigate('/admin/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      } else {
        axiosClient.post('/users', user)
          .then(() => {
            setNotification('Usuario creado correctamente')
            navigate('/admin/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    }
  return (
    <>
      {user.id && <h1>Editar usuario</h1>}
      {!user.id && <h1>Nuevo usuario</h1>}
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
            <input className='mb-2' value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="nombre"/>
            <input className='mb-2' value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input className='mb-2' type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input className='mb-2' type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confrimar Password"/>
            <button className="btns">Guardar</button>
          </form>
        )}
      </div>
    </>
  )
}

export default UserForm