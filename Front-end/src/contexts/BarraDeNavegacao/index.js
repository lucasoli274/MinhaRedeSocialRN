import React, { createContext, useState, useContext } from "react";
import { useColors } from "../Colors";

const BarraDeNavegacaoContext = createContext();

export const useBarraDeNavegacao = () => {
  return useContext(BarraDeNavegacaoContext);
};

export const BarraDeNavegacaoProvider = ({ children }) => {
  const { corPrincipal, corFundo, corBotoes } = useColors();

  const [fundoHome, setFundoHome] = useState(corFundo);
  const [fundoSearch, setFundoSearch] = useState(corFundo);
  const [fundoMeuPerfil, setFundoMeuPerfil] = useState(corFundo);
  const [fundoAtividades, setFundoAtividades] = useState(corFundo);

  const [corBtnHome, setCorBtnHome] = useState(corBotoes);
  const [corBtnSearch, setCorBtnSearch] = useState(corBotoes);
  const [corBtnMeuPerfil, setCorBtnMeuPerfil] = useState(corBotoes);
  const [corBtnAtividades, setCorBtnAtividades] = useState(corBotoes);

  const resetNavegacao = () => {
    setFundoHome(corPrincipal);
    setFundoSearch(corFundo);
    setFundoMeuPerfil(corFundo);
    setFundoAtividades(corFundo);
    setCorBtnHome("white");
    setCorBtnSearch(corBotoes);
    setCorBtnMeuPerfil(corBotoes);
    setCorBtnAtividades(corBotoes);
  };

  return (
    <BarraDeNavegacaoContext.Provider
      value={{
        fundoHome,
        setFundoHome,
        fundoSearch,
        setFundoSearch,
        fundoMeuPerfil,
        setFundoMeuPerfil,
        fundoAtividades,
        setFundoAtividades,
        corBtnHome,
        setCorBtnHome,
        corBtnSearch,
        setCorBtnSearch,
        corBtnMeuPerfil,
        setCorBtnMeuPerfil,
        corBtnAtividades,
        setCorBtnAtividades,
        resetNavegacao,
      }}
    >
      {children}
    </BarraDeNavegacaoContext.Provider>
  );
};
