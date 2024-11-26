import axios from '../axios';

export const getComisiones = async () => {
  const response = await axios.get('/commission');
  return response.data;
};

export const createComision = async (comision: any) => {
  const response = await axios.post('/create-commission', comision);
  return response.data;
};

export const deleteComision = async (id: number) => {
  const response = await axios.delete(`/delete-commission/${id}`);
  return response.data;
};

export const updateComision = async (comision: any) => {
  const response = await axios.put(`/update-commission/${comision.id}`, comision);
  return response.data;
};

