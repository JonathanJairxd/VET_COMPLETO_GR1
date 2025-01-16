import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../componets/Formulario'
import axios from 'axios'

const Actualizar = () => {

    const [paciente, setPaciente] = useState({})

    const { id } = useParams()


    useEffect(() => {
        // Opcion 1
        //consultarPaciente()
        // Opcion 2
        const consultarPaciente = async () => {
            try {
                // Token
                const token = localStorage.getItem('token')
                // Endpoint
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`
                // Headers
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                // Respuesta del backend
                const respuesta = await axios.get(url, options)

                setPaciente(respuesta.data.paciente)

            } catch (error) {
                console.log(error);
            }
        }
        consultarPaciente()
    }, [])


    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Paciente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar un paciente</p>

            {
                Object.keys(paciente).length != 0 &&
                <Formulario paciente={paciente} />
            }


        </div>
    )
}

export default Actualizar