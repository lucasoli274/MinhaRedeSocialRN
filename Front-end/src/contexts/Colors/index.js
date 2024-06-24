import React, { createContext, useState, useContext } from 'react';

const ColorsContext = createContext();

export const useColors = () => {
  return useContext(ColorsContext);
};

export const ColorsProvider = ({ children }) => {
  const corPrincipal = '#42d1f5';
  const [modoEscuro, setModoEscuro] = useState(false);

  const corFundo = modoEscuro ? '#121f24' : '#f8f7f4';
  const corContraste = modoEscuro ? '#f8f7f4' : '#121f24';
  const corBotoes = modoEscuro ? '#f8f7f4' : 'gray';
  const corDestaque = modoEscuro ? "#28444f" : "#e3e2e1";

  const toggleModoEscuro = () => {
    setModoEscuro(prevModoEscuro => !prevModoEscuro);
  };

  return (
    <ColorsContext.Provider value={{ corPrincipal, corFundo, corContraste, corBotoes, corDestaque, toggleModoEscuro, modoEscuro }}>
      {children}
    </ColorsContext.Provider>
  );
};
