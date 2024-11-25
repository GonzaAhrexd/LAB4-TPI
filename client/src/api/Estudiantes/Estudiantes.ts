import axios from '../axios';

export const getEstudiantes = async () => {
    const response = await axios.get('/student');
    return response.data;
    }

export const createEstudiante = async (data: any) => {
    const response = await axios.post('/create-student', data);
    return response.data;
}

export const updateEstudiante = async (data: any) => {
    const response = await axios.put(`/update-student/${data.id}`, data);
    return response.data;
}

export const deleteEstudiante = async (id: number) => {
    const response = await axios.delete(`/delete-student/${id}`);
    return response.data;
}