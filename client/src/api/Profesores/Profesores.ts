import axios from '../axios'

// Crear un profesor
export const createProfesor = async (data: any) => {
    try {
        const response = await axios.post('/create-professor', data)
        return response
    } catch (error) {
        return error
    }
}

// Obtener todos los profesores
export const getProfesores = async () => {
    try {
        const response = await axios.get('/professors')
        return response.data
    } catch (error) {
        return error
    }
}

export const updateProfessor = async (data: any) => {
    try {
        const response = await axios.put(`/update-professor/${data.id}`, data)
        return response
    } catch (error) {
        return error
    }
}

export const deleteProfessor = async (id: number) => {
    try {
        const response = await axios.delete(`/delete-professor/${id}`)
        return response
    } catch (error) {
        return error
    }
}
