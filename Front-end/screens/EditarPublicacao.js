import React, { useState, useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";

const EditarPublicacao = ({ route, navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const { publicacao } = route.params;

  const [conteudoEdt, setConteudoEdt] = useState('');
  const [visibilidadeEdt, setVisibilidadeEdt] = useState('');

  useEffect(() => {
    setConteudoEdt(publicacao.conteudo);
    setVisibilidadeEdt(publicacao.visibilidade);
  }, [publicacao]);

  const toastSucesso = () => {
    Toast.show({
      type: 'info',
      text1: 'Publicação editada com sucesso',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const toastFracasso = () => {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const editar = async () => {
    if (!conteudoEdt) {
      window.alert("Preencha todos os campos.");
      return;
    }
    try {
      await axios.put(`http://192.168.0.34:8080/post/${publicacao.id}`, {
        conteudo: conteudoEdt,
        data: publicacao.data,
        visibilidade: visibilidadeEdt,
        usuario: publicacao.usuario
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
          <FontAwesome name="arrow-left" color={corContraste} size={RFValue(25)} />
        </Pressable>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: fonteGrande.fontSize,
            color: fonteGrande.color,
          }}
        >
          Editar publicação
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.perfil}>
          <FontAwesome name="user-circle" color={"gray"} size={RFValue(25)} />
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
            selectedValue={visibilidadeEdt}
            onValueChange={(itemValue) => setVisibilidadeEdt(itemValue)}
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
            value={conteudoEdt}
            onChangeText={(text) => setConteudoEdt(text)}
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
            {conteudoEdt.length}/400
          </Text>
        </View>
      </ScrollView>
      <View>
        <Pressable
          style={{ ...styles.btnEditar, backgroundColor: corPrincipal }}
          onPress={editar}
        >
          <Text
            style={{ ...styles.txtEditar, fontSize: fonteMedia.fontSize }}
          >
            Confirmar
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
  btnEditar: {
    width: "40%",
    alignSelf: "flex-end",
    margin: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  txtEditar: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
  },
});

export default EditarPublicacao;
