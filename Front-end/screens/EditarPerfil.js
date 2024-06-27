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
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

const EditarPerfil = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [nomeEdt, setNomeEdt] = useState("");
  const [usuarioEdt, setUsuarioEdt] = useState("");
  const [biografiaEdt, setBiografiaEdt] = useState("");

  useEffect(() => {
    setNomeEdt(usuario.nome);
    setUsuarioEdt(usuario.usuario);
    setBiografiaEdt(usuario.biografia);
  }, [usuario]);

  const toastSucesso = () => {
    Toast.show({
      type: "info",
      text1: "Perfil editado com sucesso",
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const toastFracasso = () => {
    Toast.show({
      type: "error",
      text1: "Algo deu errado",
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const editar = async () => {
    try {
      await axios.put(`http://192.168.0.34:8080/usuario/${usuario.id}`, {
        nome: nomeEdt,
        usuario: usuarioEdt,
        biografia: biografiaEdt,
        email: usuario.email,
        senha: usuario.senha
      });
      toastSucesso();
      navigation.goBack();
    } catch (error) {
      toastFracasso();
      console.error("Erro:", error);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <View style={styles.cabecalho}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome
            name="arrow-left"
            color={corContraste}
            size={RFValue(25)}
          />
        </Pressable>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: fonteGrande.fontSize,
            color: fonteGrande.color,
          }}
        >
          Editar perfil
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          flexShrink: 1,
          padding: 10,
        }}
      >
        <FontAwesome name="user-circle" color={"gray"} size={RFValue(100)} />
        <Text
          style={{
            ...styles.indicadorInput,
            fontSize: fontePequena.fontSize,
            color: fontePequena.color,
            marginTop: 20,
          }}
        >
          Nome:
        </Text>
        <TextInput
          placeholder="Nome"
          placeholderTextColor={"gray"}
          value={nomeEdt}
          onChangeText={(text) => setNomeEdt(text)}
          style={{
            ...styles.input,
            fontSize: fonteMedia.fontSize,
            color: fonteMedia.color,
            backgroundColor: corDestaque,
          }}
        />
        <Text
          style={{
            ...styles.indicadorInput,
            fontSize: fontePequena.fontSize,
            color: fontePequena.color,
          }}
        >
          Usuário:
        </Text>
        <TextInput
          placeholder="Usuário"
          placeholderTextColor={"gray"}
          value={usuarioEdt}
          onChangeText={(text) => setUsuarioEdt(text)}
          style={{
            ...styles.input,
            fontSize: fonteMedia.fontSize,
            color: fonteMedia.color,
            backgroundColor: corDestaque,
          }}
        />
        <Text
          style={{
            ...styles.indicadorInput,
            fontSize: fontePequena.fontSize,
            color: fontePequena.color,
          }}
        >
          Biografia:
        </Text>
        <TextInput
          placeholder="Escreva algo legal sobre você aqui ✨ Ex: Gosto de..."
          placeholderTextColor={"gray"}
          value={biografiaEdt}
          onChangeText={(text) => setBiografiaEdt(text)}
          multiline
          numberOfLines={5}
          maxLength={200}
          style={{
            ...styles.input,
            fontSize: fonteMedia.fontSize,
            color: fonteMedia.color,
            backgroundColor: corDestaque,
          }}
        />
        <Pressable
          style={{
            backgroundColor: corPrincipal,
            borderRadius: 10,
            alignSelf: "flex-end",
            marginTop: 20,
          }}
          onPress={editar}
        >
          <Text style={{ ...styles.txtSalvar, fontSize: fonteMedia.fontSize }}>
            Salvar alterações
          </Text>
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
  input: {
    width: "100%",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  indicadorInput: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },
  txtSalvar: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
  },
});

export default EditarPerfil;
