import axios from './Api';

export const getAllGenders = async () => {
  try {
    const { data } = await axios.get('/genders');

    return data;
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};
