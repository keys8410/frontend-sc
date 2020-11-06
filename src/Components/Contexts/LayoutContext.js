import React from 'react';
import usePersistentState from '../../Hooks/usePersistentState';

export const LayoutContext = React.createContext();

export const LayoutStorage = ({ children }) => {
  const [collapsed, setCollapsed] = usePersistentState('collpseMenu', true);

  const handleCollapse = () => setCollapsed(!collapsed);

  return (
    <LayoutContext.Provider value={{ collapsed, handleCollapse }}>
      {children}
    </LayoutContext.Provider>
  );
};
