import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import BarraDeNavegacao from "../src/components/BarraDeNavegacao";
import { useAuth } from "../src/contexts/Auth";

const Home = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <Text style={{ fontSize: 40 }}>Teste</Text>
      {usuario && <Text style={{ fontSize: 40 }}>{usuario.email}</Text>}
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
