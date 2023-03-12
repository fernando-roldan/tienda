import {Navigate, createBrowserRouter} from 'react-router-dom'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Users from './Auth/Users'
import NotFound from './NotFound'
import DefaultLayout from './Components/DefaultLayout'
import { Children } from 'react'
import GuestLayout from './Components/GuestLayout'
import Dasboard from './views/Dasboard'
import UserForm from './Auth/UserForm'
import App from './App'
import Cart from './views/Cart'
import Confirmation from './views/Confirmation'
import Categories from './Categories/Categories'
import CategoryForm from './Categories/CategoryForm'
import Products from './Products/Products'
import ProductForm from './Products/ProductForm'

const router = createBrowserRouter( [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/admin'} />
            },
            {
                path: '/admin',
                element: <Dasboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            },
            {
                path: '/admin/users/new',
                element: <UserForm key="userCreate" />
            },
            {
              path: '/admin/users/:id',
              element: <UserForm key="userUpdate" />
            },
            {
                path: '/admin/categorias',
                element: <Categories />
            },
            {
                path: '/admin/categoria/new',
                element: <CategoryForm />
            },
            {
                path: '/admin/categoria/:id',
                element: <CategoryForm />
            },
            {
                path: '/admin/productos',
                element: <Products />
            },
            {
                path: '/admin/producto/new',
                element: <ProductForm />
            },
            {
                path: '/admin/producto/:id',
                element: <ProductForm />
            }
        ]
        
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/tienda',
                element: <App />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/carrito',
                element: <Cart />
            },
            {
                path: '/confirmacion',
                element: <Confirmation />
            }
        ]
    },
    
    {
        path: '*',
        element: <NotFound />
    }
])

export default router