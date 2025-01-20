import { createContext, useState } from 'react'
import axios from 'axios'

const tratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {

    const [modal, setModal] = useState(false)

    const [tratamientos, setTratamientos] = useState([])

    const handleModal = () => {
        setModal(!modal)
    }

    const registrarTratamientos = async (data) => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, data, options)
            console.log(respuesta)
            setTratamientos([respuesta.data.tratamiento, ...tratamientos])
        } catch (error) {
            console.log(error)
        }

    }

    const eliminarTratamientos = async (id) => {
        const token = localStorage.getItem('token')

        try {
            const confirmar = confirm("Estas seguro de ¿eliminar?")
            if (confirmar) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                await axios.delete(url, options)

                const tratamientosActualizados = tratamientos.filter(rt => rt._id !== id)
                setTratamientos(tratamientosActualizados)
            }



        } catch (error) {
            console.log(error)
        }

    }

    const cambiarTratamientos = async (id) => {
        const token = localStorage.getItem('token')
        
        try {
            const confirmar = confirm("Estas seguro de ¿cambiar el estado?")
            if (confirmar) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                await axios.post(url, {},options)

                const tratamientosActualizados = tratamientos.filter(rt => rt._id !== id)
                setTratamientos(tratamientosActualizados)
            }



        } catch (error) {
            console.log(error)
        }

    }


    return (
        <tratamientosContext.Provider value={
            {
                //Contenido del mensaje
                modal,
                setModal,
                handleModal,
                registrarTratamientos,
                tratamientos,
                setTratamientos,
                eliminarTratamientos,
                cambiarTratamientos
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )

}
export { TratamientosProvider }
export default tratamientosContext