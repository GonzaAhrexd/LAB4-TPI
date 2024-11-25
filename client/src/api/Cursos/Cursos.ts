import axios from '../axios';

export const getCursos = async () => {
  const response = await axios.get('/course');
  return response.data;
};

export const createCursos = async (data: any) => {
    console.log(data)
  const response = await axios.post('/create-course', data);
  return response.data;
};

export const updateCursos = async (data: any) => {
  const response = await axios.put(`/update-course/${data.id}`, data);
  return response.data;
};

export const deleteCursos = async (id: number) => {
  const response = await axios.delete(`/delete-course/${id}`);
  return response.data;
};
