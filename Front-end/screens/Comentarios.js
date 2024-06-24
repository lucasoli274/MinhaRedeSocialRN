import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

const Comentarios = ({ route, navigation }) => {
  const { corPrincipal, corFundo, corContraste, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const { publicacao } = route.params;

  const [comentarios, setComentarios] = useState([]);

  const corComentarios = modoEscuro ? "#28444f" : "#e3e2e1";

  const [textoComentario, setTextoComentario] = useState("");

  dayjs.locale("pt-br");

  const dataAgora = dayjs().format("HH:mm, D [de] MMMM [de] YYYY");

  const getComentarios = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.34:8080/comentario/${publicacao.id}`
      );
      setComentarios(response.data);
    } catch {
      // aqui fiao
      return null;
    }
  };

  useEffect(() => {
    const getNovamente = navigation.addListener("focus", () => {
      getComentarios();
    });

    return getNovamente;
  }, [navigation]);

  const toastSucesso = () => {
    Toast.show({
      type: "info",
      text1: "Comentário adicionado",
      position: "bottom",
      visibilityTime: 3000,
    });
  };
  const toastFracasso = () => {
    Toast.show({
      type: "error",
      text1: "Algo deu errado",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const toastCamposFaltando = () => {
    Toast.show({
      type: "error",
      text1: "Preencha todos os campos",
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const publicarComentario = async () => {
    if (!textoComentario) {
      toastCamposFaltando();
      return;
    }
    try {
      const response = await axios.post("http://192.168.0.34:8080/comentario", {
        texto: textoComentario,
        data: dataAgora,
        publicacao: publicacao,
        usuario: usuario,
      });
      toastSucesso();
      getComentarios();
      setTextoComentario('');
    } catch {
      toastFracasso();
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <View style={styles.cabecalho}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" color={corContraste} size={RFValue(25)} />
        </Pressable>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: fonteGrande.fontSize,
            color: fonteGrande.color,
          }}
        >
          Comentários
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {comentarios.map((comentario, index) => (
          <View style={styles.comentario} key={comentario.id}>
            <View style={styles.cabecalhoComentario}>
              <FontAwesome name="user-circle" color={"gray"} size={RFValue(20)} />
              <Text
                style={{
                    ...styles.nomeUsuario,
                    fontSize: fonteMedia.fontSize,
                    color: fonteMedia.color,
                  }}
              >
                {comentario.usuario.usuario}
              </Text>
            </View>
            <Text style={{fontSize: fontePequena.fontSize, color: 'gray'}}>{comentario.data}</Text>
            <Text style={{fontSize: fontePequena.fontSize, color: fontePequena.color}}>{comentario.texto}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.viewAddComentario}>
        <TextInput
          style={{
            ...styles.inputComentar,
            fontSize: fonteMedia.fontSize,
            color: fonteMedia.color,
            backgroundColor: corComentarios,
          }}
          placeholder="Escreva um comentário..."
          placeholderTextColor={corContraste}
          value={textoComentario}
          onChangeText={(text) => setTextoComentario(text)}
          maxLength={200}
        />
        <Pressable style={styles.btnEnviar} onPress={publicarComentario}>
          <FontAwesome name="send" color={corContraste} size={RFValue(20)} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cabecalho: {
    height: "12%",
    width: "95%",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewAddComentario: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: 'gray',
    alignItems: "center",
    justifyContent: "center",
  },
  btnEnviar: {
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputComentar: {
    borderRadius: 10,
    padding: 10,
    width: "85%",
  },
  comentario: {
    width: "100%",
    padding: 10,
  },
  cabecalhoComentario: {
    flexDirection: "row",
    alignItems: "center",
  },
  nomeUsuario: {
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default Comentarios;
