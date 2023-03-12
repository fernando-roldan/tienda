import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import axiosClient from '../axios-client'

function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if(!token) {
        return <Navigate to={'/tienda'} />
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                localStorage.clear()
            })
    }

  return (
    <div id='defaultLayout'>
        <aside>
            <Link to={'/admin'}>Dasboard</Link>
            <Link to={'/admin/users'}>Usuarios</Link>
            <Link to={'/admin/categorias'}>Categorias</Link>
            <Link to={'/admin/productos'}>Productos</Link>
        </aside>
        <div className='content'>
            <header>
                <div>
                    Dasboard
                </div>
                <div>
                    {user.name} &nbsp; &nbsp;
                    <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
        {notification &&
            <div className='notification'>
                {notification}
            </div>
        }
    </div>
  )
}

export default DefaultLayout