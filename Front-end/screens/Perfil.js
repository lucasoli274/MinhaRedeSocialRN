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

const Perfil = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);

  const btnMenu = () => {
    navigation.navigate('Menu');
  }

  const getPublicacoes = async () => {
    try {
      const response = await axios.get(`http://192.168.0.34:8080/post/${usuario.usuario}`);
      setPublicacoes(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  const toastErroGet = () => {
    Toast.show({
      type: "error",
      position: 'top',
      text1: "Erro ao carregar publicacoes",
      visibilityTime: 3000
    });
  }

  useEffect(() => {
    getPublicacoes();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <Pressable style={{position: 'absolute', top: 50, right: 20}} onPress={btnMenu} >
        <FontAwesome name="bars" color={corContraste} size={40} />
      </Pressable>
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Perfil;
