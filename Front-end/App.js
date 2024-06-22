import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaLogin from "./screens/TelaLogin";
import TelaCadastro from "./screens/TelaCadastro";
import Home from "./screens/Home";
import Pesquisar from "./screens/Pesquisar";
import Atividades from "./screens/Atividades";
import Perfil from "./screens/Perfil";
import Menu from "./screens/Menu";
import CriarPublicacao from "./screens/CriarPublicacao";
import { ContextoPai } from "./src/contexts/ContextoPai";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

const App = () => {
  const [telaInicial, setTelaInicial] = useState("TelaLogin");

  return (
    <ContextoPai>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"TelaLogin"}>
          <Stack.Screen
            name="TelaLogin"
            component={TelaLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaCadastro"
            component={TelaCadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pesquisar"
            component={Pesquisar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Atividades"
            component={Atividades}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CriarPublicacao"
            component={CriarPublicacao}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </ContextoPai>
  );
};

export default App;
