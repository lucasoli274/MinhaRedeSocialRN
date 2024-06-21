import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SwitchToggle from "react-native-switch-toggle";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import BarraDeNavegacao from "../src/components/BarraDeNavegacao";
import { useAuth } from "../src/contexts/Auth";

const Menu = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, toggleModoEscuro, modoEscuro } =
    useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario, logout } = useAuth();

  const [modalInserirSenha, setModalInserirSenha] = useState(false);
  const [modalSenhaErrada, setModalSenhaErrada] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);

  const [senha, setSenha] = useState("");
  const [senhaVazia, setSenhaVazia] = useState(false);

  const toggleModalSenha = () => {
    setModalInserirSenha(!modalInserirSenha);
    setSenha("");
  };

  const toggleModalSenhaErrada = () => {
    setModalSenhaErrada(!modalSenhaErrada);
  };

  const toggleModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const avancarParaConfirmacao = () => {
    if (senha == usuario.senha) {
      toggleModalSenha();
      toggleModalConfirmar();
      setSenhaVazia(false);
      setSenha("");
    } else if (senha == "") {
      setSenhaVazia(true);
    } else {
      toggleModalSenha();
      toggleModalSenhaErrada();
      setSenhaVazia(false);
      setSenha("");
    }
  };

  const continuarSenhaErrada = () => {
    toggleModalSenhaErrada();
    logout();
    navigation.navigate("TelaLogin");
    toastLogout();
  };

  const deletaConta = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.0.34:8080/usuario/${usuario.id}`
      );
      logout();
      toggleModalConfirmar();
      navigation.navigate("TelaLogin");
      toastContaDeletada();
    } catch (error) {
      console.error("Erro ao obter.", error);
      return null;
    }
  };

  const toastContaDeletada = () => {
    Toast.show({
      type: "info",
      text1: "Sua conta foi deletada.",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const toastLogout = () => {
    Toast.show({
      type: "info",
      text1: "Sessão encerrada.",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const encerrarSessao = () => {
    logout();
    toastLogout();
    navigation.navigate("TelaLogin");
  };

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <Text
        style={{
          ...styles.tituloTxt,
          fontSize: fonteGrande.fontSize,
          color: fonteGrande.color,
        }}
      >
        Configurações
      </Text>
      <View style={styles.modoEscuro}>
        <Text
          style={{ fontSize: fonteMedia.fontSize, color: fonteMedia.color }}
        >
          Modo escuro
        </Text>
        <SwitchToggle
          backgroundColorOff="black"
          backgroundColorOn={corPrincipal}
          circleStyle={styles.circleStyle}
          switchOn={modoEscuro}
          onPress={toggleModoEscuro}
        />
      </View>
      <Pressable style={styles.btnOpcoes}>
        <Text
          style={{
            fontSize: fonteMedia.fontSize,
            color: fonteMedia.color,
            fontWeight: "bold",
          }}
          onPress={encerrarSessao}
        >
          Encerrar sessão
        </Text>
      </Pressable>
      <Pressable style={styles.btnOpcoes} onPress={toggleModalSenha}>
        <Text
          style={{
            fontSize: fonteMedia.fontSize,
            color: "red",
            fontWeight: "bold",
          }}
        >
          Deletar conta
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInserirSenha}
        onRequestClose={() => setModalInserirSenha(!modalInserirSenha)}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: corFundo,
              borderColor: corContraste,
            }}
          >
            <Pressable
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
              onPress={toggleModalSenha}
            >
              <FontAwesome name="times" color={"gray"} size={30} />
            </Pressable>
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: fonteMedia.color,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Insira sua senha para prosseguir com essa ação.
            </Text>

            {senhaVazia && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                Preencha o campo com sua senha
              </Text>
            )}

            <TextInput
              style={{ ...styles.inputSenha, fontSize: fonteMedia.fontSize }}
              secureTextEntry={true}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
            <Pressable
              style={{
                backgroundColor: corPrincipal,
                borderRadius: 5,
                marginVertical: 10,
              }}
              onPress={avancarParaConfirmacao}
            >
              <Text
                style={{
                  ...styles.prosseguirBtnTxt,
                  fontSize: fonteMedia.fontSize,
                }}
              >
                Prosseguir com a exclusão
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSenhaErrada}
        onRequestClose={() => setModalSenhaErrada(!modalSenhaErrada)}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: corFundo,
              borderColor: corContraste,
            }}
          >
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: fonteMedia.color,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              A senha que você informou está incorreta.
            </Text>
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fonteMedia.color,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Por motivos de segurança, sua sessão será encerrada e você será
              redirecionado para a tela de login.
            </Text>
            <Pressable
              style={{
                backgroundColor: corPrincipal,
                borderRadius: 5,
                marginVertical: 10,
              }}
              onPress={continuarSenhaErrada}
            >
              <Text
                style={{
                  ...styles.prosseguirBtnTxt,
                  fontSize: fonteMedia.fontSize,
                }}
              >
                Continuar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalConfirmar}
        onRequestClose={() => setModalConfirmar(!modalConfirmar)}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: corFundo,
              borderColor: corContraste,
            }}
          >
            <Pressable
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
              onPress={toggleModalConfirmar}
            >
              <FontAwesome name="times" color={"gray"} size={30} />
            </Pressable>
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: fonteMedia.color,
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              Tem certeza que deseja excluir sua conta?
            </Text>
            <Text
              style={{
                fontSize: fonteMedia.fontSize,
                color: "red",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Essa ação é irreversível
            </Text>

            <Pressable
              style={{
                backgroundColor: corPrincipal,
                borderRadius: 5,
                marginVertical: 10,
                width: "80%",
              }}
              onPress={toggleModalConfirmar}
            >
              <Text
                style={{
                  ...styles.prosseguirBtnTxt,
                  fontSize: fonteMedia.fontSize,
                }}
              >
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "red",
                borderRadius: 5,
                marginVertical: 10,
                width: "80%",
              }}
              onPress={deletaConta}
            >
              <Text
                style={{
                  ...styles.prosseguirBtnTxt,
                  fontSize: fonteMedia.fontSize,
                }}
              >
                Confirmar exclusão
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tituloTxt: {
    marginTop: 40,
    alignSelf: "center",
    width: "95%",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    padding: 10,
    fontWeight: "bold",
  },
  modoEscuro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  btnOpcoes: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  prosseguirBtnTxt: {
    padding: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  inputSenha: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
});

export default Menu;
