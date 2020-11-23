import React from 'react';
import useFetch from '../../Hooks/useFetch';

import { getAllSectors } from '../../Services/Sectors';

const Sectors = () => {
  const [sectors, setSectors] = React.useState(null);

  const { request, loading } = useFetch();

  React.useEffect(() => {
    const getSectors = async () => {
      const { res } = await request(getAllSectors());

      setSectors(res.data.sectors);
    };

    getSectors();
  }, [request]);

  if (loading) return <option>Carregando...</option>;
  else
    return (
      <>
        {sectors &&
          sectors.map(({ key, sector }, index) => (
            <option key={key} value={index}>
              {sector}
            </option>
          ))}
      </>
    );
};

export default Sectors;
