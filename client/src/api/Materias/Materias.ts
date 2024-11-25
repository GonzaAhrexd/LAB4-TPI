import axios from '../axios';

export const getMaterias = async () => {
  const response = await axios.get('/subject');
  return response.data;
};

export const createMateria = async (data: any) => {
    const response = await axios.post('/create-subject', data);
    return response.data;
}

export const updateMateria = async (data: any) => {
    const response = await axios.put(`/update-subject/${data.id}`, data);
    return response.data;
}

export const deleteMateria = async (id: number) => {
    const response = await axios.delete(`/delete-subject/${id}`);
    return response.data;
}
