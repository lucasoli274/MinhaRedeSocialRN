import React from "react";
import { ColorsProvider } from "../Colors";
import { FontsProvider } from "../Fonts";
import { AuthProvider } from "../Auth";
import { BarraDeNavegacaoProvider } from "../BarraDeNavegacao";

export const ContextoPai = ({ children }) => {
  return (
    <AuthProvider>
      <ColorsProvider>
        <FontsProvider>
          <BarraDeNavegacaoProvider>
            {children}
            </BarraDeNavegacaoProvider>
        </FontsProvider>
      </ColorsProvider>
    </AuthProvider>
  );
};
