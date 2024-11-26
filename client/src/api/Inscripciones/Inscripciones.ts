import axios from '../axios';

export const createInscripcion = async (data: any) => {
    const response = await axios.post('/create-course-student', data);
    return response.data;
}

