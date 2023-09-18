import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users?page=2`);
  return response.data.data; 
};

export const createUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response.data;
};

export const updateUser = async (userId, user) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${BASE_URL}/users/${userId}`);
};
