import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

import BarraDeNavegacao from "../src/components/BarraDeNavegacao";

const Atividades = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      {usuario && <Text style={{ fontSize: 40 }}>{usuario.id}</Text>}
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Atividades;
