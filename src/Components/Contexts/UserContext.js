import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthUser, postAuthUser } from '../../Services/Auth';
import coordItens from '../Coord/coordItens.json';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [menuItens, setMenuItens] = React.useState(null);
  const [user, setUser] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setData(null);
    setMenuItens(null);
    setError(null);
    setLoading(false);
    setUser(false);

    window.localStorage.removeItem('tkn');
    window.localStorage.removeItem('sct');

    navigate('/');
  }, [navigate]);

  const switchSector = React.useCallback(
    (sector) => {
      switch (Number(sector)) {
        case 1:
          navigate('/master');
          setMenuItens();
          break;

        case 2:
          navigate('/coord');
          setMenuItens(coordItens);

          break;

        case 3:
          navigate('/tech');
          setMenuItens();

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

    if (sector && token) {
      try {
        const { user } = await getAuthUser();

        setData(user);
        setUser(true);

        switchSector(sector);
      } catch ({ message }) {
        setError(message);
      }
    } else switchSector(sector);
  }, [switchSector]);

  const userLogin = async (body) => {
    try {
      setError(null);
      setLoading(true);

      const { sector, token } = await postAuthUser(body);

      if (token) window.localStorage.setItem('tkn', token);
      if (sector) window.localStorage.setItem('sct', sector);

      await getUser();
    } catch ({ message }) {
      setError(message);

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
        } catch ({ response }) {
          setError(response.data.message);

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
      value={{ userLogin, userLogout, data, error, loading, user, menuItens }}
    >
      {children}
    </UserContext.Provider>
  );
};
