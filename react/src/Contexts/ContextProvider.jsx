import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setCart: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [cart, _setCart] = useState(localStorage.getItem('carrito'))

    const setNotification = (message) => {
        _setNotification(message)
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)

        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCES_TOKEN')
        }
    }

    const setCart = (cart) => {
        _setCart(cart)

        if(cart) {
            localStorage.setItem('carrito', [cart])
        } else {
            localStorage.removeItem('carrito')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            setCart
        }}>

            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)