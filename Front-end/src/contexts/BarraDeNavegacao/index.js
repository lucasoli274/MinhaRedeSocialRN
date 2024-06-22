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
  const [fundoPerfil, setFundoPerfil] = useState(corFundo);
  const [fundoAtividades, setFundoAtividades] = useState(corFundo);

  const [corBtnHome, setCorBtnHome] = useState(corBotoes);
  const [corBtnSearch, setCorBtnSearch] = useState(corBotoes);
  const [corBtnPerfil, setCorBtnPerfil] = useState(corBotoes);
  const [corBtnAtividades, setCorBtnAtividades] = useState(corBotoes);

  const resetNavegacao = () => {
    setFundoHome(corPrincipal);
    setFundoSearch(corFundo);
    setFundoPerfil(corFundo);
    setFundoAtividades(corFundo);
    setCorBtnHome("white");
    setCorBtnSearch(corBotoes);
    setCorBtnPerfil(corBotoes);
    setCorBtnAtividades(corBotoes);
  };

  return (
    <BarraDeNavegacaoContext.Provider
      value={{
        fundoHome,
        setFundoHome,
        fundoSearch,
        setFundoSearch,
        fundoPerfil,
        setFundoPerfil,
        fundoAtividades,
        setFundoAtividades,
        corBtnHome,
        setCorBtnHome,
        corBtnSearch,
        setCorBtnSearch,
        corBtnPerfil,
        setCorBtnPerfil,
        corBtnAtividades,
        setCorBtnAtividades,
        resetNavegacao,
      }}
    >
      {children}
    </BarraDeNavegacaoContext.Provider>
  );
};
