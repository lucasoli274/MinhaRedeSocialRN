import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

import BarraDeNavegacao from "../src/components/BarraDeNavegacao";

const MeuPerfil = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);

  const btnMenu = () => {
    navigation.navigate("Menu");
  };

  const getPublicacoes = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.34:8080/post/${usuario.id}`
      );
      setPublicacoes(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  const toastErroGet = () => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Erro ao carregar publicações",
      visibilityTime: 3000,
    });
  };

  useEffect(() => {
    getPublicacoes();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Pressable style={styles.btnMenu} onPress={btnMenu}>
          <FontAwesome name="bars" color={corContraste} size={RFValue(30)} />
        </Pressable>
        <View style={styles.viewSobreMim}>
          <FontAwesome
            name="user-circle"
            color={"gray"}
            size={RFValue(100)}
            style={{ alignSelf: "center" }}
          />
          <View style={styles.viewInformacoesTxt}>
            <Text
              style={{
                fontSize: fonteGrande.fontSize,
                color: fonteGrande.color,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {usuario.usuario}
            </Text>
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: fonteMedia.color,
                padding: 5,
              }}
            >
              {usuario.nome}
            </Text>
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fonteMedia.color,
                padding: 5,
              }}
            >
              mwu nome é lucas
            </Text>
            <Pressable
              style={{
                ...styles.btnEditarInformacoes,
                backgroundColor: corDestaque,
              }}
            >
              <Text style={{ padding: 5 }}>Editar informações</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnMenu: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  btnEditarInformacoes: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  viewSobreMim: {
    marginTop: 100,
    width: "100%",
    flexDirection: "row",
  },
  viewInformacoesTxt: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default MeuPerfil;
