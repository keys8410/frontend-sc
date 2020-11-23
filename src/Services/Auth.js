import axios from './Api';

/**
 *
 * @param {{ login: string, pass: string }} body - dados de acesso do usuário
 * @return {{ sector: string, }} retorna o token e setor do usuário (necessário para navegar)
 */
export const postAuthUser = async (body) => {
  try {
    const { data } = await axios.post('/auth/sign-in', body);
    const { sector } = data.data;
    const { token } = data.metadata;

    return { sector, token };
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

/**
 *
 * @return  retorna os dados do usuário
 */
export const getAuthUser = async () => {
  try {
    const { data } = await axios.get('/auth/user');
    const user = data.data;

    return { user };
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

/**
 *
 * @param {{cpf: string, url: string}} body
 * @return envia um email contendo a URL para resetar a senha de acesso do usuário
 */
export const postForgotPassword = async (body) => {
  try {
    const { data } = await axios.post('/auth/forgot-password', body);

    return data;
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

/**
 *
 * @param {{cpf: string, resetToken: string}} body - CPF do usuário e token via URLSearchParams
 * @return envia um email contendo as novas credenciais de acesso (senha) do usuário
 */
export const postResetPassword = async (body) => {
  try {
    const { data } = await axios.post('/auth/reset-password', body);
    console.log(data);
    return data;
  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};
