import axios from './Api';

export const getAllSectors = async () => {
  try {
    const { data } = await axios.get('/sectors');

    return data;
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};
