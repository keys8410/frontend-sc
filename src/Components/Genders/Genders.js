import React from 'react';
import { getAllGenders } from '../../Services/Genders';
import useFetch from '../../Hooks/useFetch';

const Genders = () => {
  const [genders, setGenders] = React.useState(null);

  const { request, loading } = useFetch();

  React.useEffect(() => {
    const getGenders = async () => {
      const { res } = await request(getAllGenders());

      setGenders(res.data.genders);
    };

    getGenders();
  }, [request]);

  if (loading) return <option>Carregando...</option>;
  else
    return (
      <>
        {genders &&
          genders.map(({ key, gender }, index) => (
            <option key={key} value={index}>
              {gender}
            </option>
          ))}
      </>
    );
};

export default Genders;
