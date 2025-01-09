import axios from 'axios'
import {createContext,useEffect, useState } from 'react'

// Creacion del grupo de whatsapp (AuthContext)
const AuthContext = createContext()



// Crear mensaje  // Integrantes()
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    const perfil = async (token) =>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`

            const options = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token){
            perfil(token)
        }
    }, [])

  return <AuthContext.Provider value={
    {
        //Contenido del mensaje
        auth,
        setAuth
    }
  }> 
    {children}
  /</AuthContext.Provider>
}


export{
    AuthProvider
}

export default AuthContext