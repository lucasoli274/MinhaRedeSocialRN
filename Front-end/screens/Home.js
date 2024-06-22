import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import BarraDeNavegacao from "../src/components/BarraDeNavegacao";
import { useAuth } from "../src/contexts/Auth";

const Home = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);

  const getPublicacoes = async () => {
    try {
      const response = await axios.get("http://192.168.0.34:8080/post");
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
      text1: "Erro ao carregar a timeline",
      visibilityTime: 3000,
    });
  };

  useEffect(() => {
    const getNovamente = navigation.addListener("focus", () => {
      getPublicacoes();
    });

    return getNovamente;
  }, [navigation]);

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cabecalho}>
          <Image
            source={require("../assets/battle-net-logo.png")}
            style={{ height: 60, width: 60 }}
          />
        </View>
        {publicacoes.map((publicacao) => (
          <View style={styles.post}>
            <Text>{publicacao.data}</Text>
            <Text>{publicacao.usuario.usuario}</Text>
            <Text>{publicacao.conteudo}</Text>
          </View>
        ))}
        <View style={{height: 100}}/>
      </ScrollView>
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cabecalho: {
    height: 120,
    width: "100%",
    padding: 10,
    justifyContent: "flex-end",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  post: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});

export default Home;
