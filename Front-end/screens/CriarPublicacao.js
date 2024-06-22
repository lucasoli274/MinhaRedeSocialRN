import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

const CriarPublicacao = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const corDestaque = modoEscuro ? "#28444f" : "#e3e2e1";

  const { usuario } = useAuth();

  const [visibilidade, setVisibilidade] = useState("Público");
  const [conteudo, setConteudo] = useState("");

  dayjs.locale('pt-br');

  const dataAgora = dayjs().format('HH:mm, D [de] MMMM [de] YYYY');

  const toastSucesso = () => {
    Toast.show({
      type: 'success',
      text1: 'Seu texto foi publicado',
      position: 'top',
      visibilityTime: 3000,
    });
  }
  const toastFracasso = () => {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado',
      position: 'top',
      visibilityTime: 3000,
    });
  }

  const publicar = async () => {
    if (!conteudo) {
      window.alert("Preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.post("http://192.168.0.34:8080/post", {
        conteudo: conteudo,
        data: dataAgora,
        visibilidade: visibilidade,
        usuario: usuario
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
          <FontAwesome name="arrow-left" color={corContraste} size={30} />
        </Pressable>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: fonteGrande.fontSize,
            color: fonteGrande.color,
          }}
        >
          Nova atualização
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.perfil}>
          <FontAwesome name="user-circle" color={"gray"} size={30} />
          {usuario && (
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: fonteMedia.color,
                marginHorizontal: 10,
              }}
            >
              {usuario.nome}
            </Text>
          )}
          <Picker
            selectedValue={visibilidade}
            onValueChange={(itemValue, itemIndex) => setVisibilidade(itemValue)}
            style={{
              ...styles.pickerVisibilidade,
              fontSize: fontePequena.fontSize,
              color: fontePequena.color,
              backgroundColor: corDestaque,
            }}
          >
            <Picker.Item label="Público" value="Público" />
            <Picker.Item label="Privado" value="Privado" />
          </Picker>
        </View>
        <View style={{ ...styles.viewInput, backgroundColor: corDestaque }}>
          <TextInput
            placeholder="O que você está pensando?"
            placeholderTextColor={corContraste}
            value={conteudo}
            onChangeText={(text) => setConteudo(text)}
            multiline
            numberOfLines={15}
            maxLength={400}
            style={{
              padding: 20,
              fontSize: fonteMedia.fontSize,
              color: fonteMedia.color,
            }}
          />
          <Text style={{ alignSelf: "flex-end", fontSize: fontePequena.fontSize, color: fontePequena.color }}>
            {conteudo.length}/400
          </Text>
        </View>
      </ScrollView>
      <View>
        <Pressable
          style={{ ...styles.btnPublicar, backgroundColor: corPrincipal }}
          onPress={publicar}
        >
          <Text
            style={{ ...styles.txtPublicar, fontSize: fonteMedia.fontSize }}
          >
            Publicar
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
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  perfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  pickerVisibilidade: {
    width: "40%",
    position: "absolute",
    right: 10,
  },
  viewInput: {
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: "gray",
    width: "90%",
  },
  btnPublicar: {
    width: "40%",
    alignSelf: "flex-end",
    margin: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  txtPublicar: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
  },
});

export default CriarPublicacao;
