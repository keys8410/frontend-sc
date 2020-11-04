import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Services/Api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [user, setUser] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setUser(false);

    window.localStorage.removeItem('tkn');
    window.localStorage.removeItem('sct');

    navigate('/');
  }, [navigate]);

  const switchSector = React.useCallback(
    (sector) => {
      console.log(sector);
      switch (Number(sector)) {
        case 1:
          navigate('/master');
          break;

        case 2:
          navigate('/coord');
          break;

        case 3:
          navigate('/tech');
          break;

        default:
          userLogout();

          navigate('/');
          break;
      }
    },
    [navigate, userLogout],
  );

  const getUser = React.useCallback(async () => {
    const sector = window.localStorage.getItem('sct');
    const token = window.localStorage.getItem('tkn');

    const options = {
      headers: { authorization: `Bearer ${token}` },
    };

    if (sector && token) {
      try {
        const { data } = await api.get('auth/user', options);

        setData(data.data);
        setUser(true);

        switchSector(sector);
      } catch (e) {
        console.log(e.response);
        setError(e.response.data.message);
      }
    } else switchSector(sector);
  }, [switchSector]);

  const userLogin = async (body) => {
    try {
      setError(null);
      setLoading(true);

      const { data } = await api.post('auth/sign-in', body);
      const { sector } = data.data;
      const { token } = data.metadata;

      if (token) window.localStorage.setItem('tkn', token);
      if (sector) window.localStorage.setItem('sct', sector);

      await getUser();
    } catch (e) {
      setError(e.response.data.message);

      console.log(e.response.data);
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('tkn');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          await getUser();
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, [getUser, userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
