import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';
const AVATAR_URL = 'https://reqres.in/img/faces';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=2`);
    const users = response.data.data.map((user) => ({
      ...user,
      avatar: `${AVATAR_URL}/${user.id}-image.jpg`, // Append avatar URL to each user
    }));
    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, user) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`);
  } catch (error) {
    throw error;
  }
};
