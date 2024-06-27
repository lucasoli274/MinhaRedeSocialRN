import React, { createContext, useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useColors } from "../Colors";

const FontsContext = createContext();

export const useFonts = () => {
  return useContext(FontsContext);
};

export const FontsProvider = ({ children }) => {
  const { corContraste } = useColors();

  const [fontePequenaFontSize, setFontePequenaFontSize] = useState(RFValue(12));
  const [fonteMediaFontSize, setFonteMediaFontSize] = useState(RFValue(18));
  const [fonteGrandeFontSize, setFonteGrandeFontSize] = useState(RFValue(24));


  const fontePequena = {
    fontSize: fontePequenaFontSize,
    color: corContraste,
  };

  const fonteMedia = {
    fontSize: fonteMediaFontSize,
    color: corContraste,
  };

  const fonteGrande = {
    fontSize: fonteGrandeFontSize,
    color: corContraste,
  };

  return (
    <FontsContext.Provider value={{ fontePequena, fonteMedia, fonteGrande, setFontePequenaFontSize, setFonteMediaFontSize, setFonteGrandeFontSize }}>
      {children}
    </FontsContext.Provider>
  );
};
