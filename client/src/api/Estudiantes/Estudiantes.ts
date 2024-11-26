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

export const getEstudianteByName = async (name: string) => {
    const response = await axios.get(`/student-by-name/${name}`);
    return response.data;
}

export const getEstudianteByCurso = async (curso_id: number) => {
    const response = await axios.get(`/student-by-course/${curso_id}`);
    return response.data;
}

export const getEstudiantesWithInscripciones = async () => {
    const response = await axios.get('/students-with-inscriptions');
    return response.data;
}
