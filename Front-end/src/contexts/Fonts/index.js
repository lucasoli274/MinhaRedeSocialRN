import React, { createContext, useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useColors } from "../Colors";

const FontsContext = createContext();

export const useFonts = () => {
  return useContext(FontsContext);
};

export const FontsProvider = ({ children }) => {
  const { corContraste } = useColors();

  const fontePequena = {
    fontSize: RFValue(12),
    color: corContraste,
  };

  const fonteMedia = {
    fontSize: RFValue(18),
    color: corContraste,
  };

  const fonteGrande = {
    fontSize: RFValue(24),
    color: corContraste,
  };

  return (
    <FontsContext.Provider value={{ fontePequena, fonteMedia, fonteGrande }}>
      {children}
    </FontsContext.Provider>
  );
};
