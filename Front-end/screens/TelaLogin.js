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
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import { useAuth } from "../src/contexts/Auth";
import { useBarraDeNavegacao } from "../src/contexts/BarraDeNavegacao";

const TelaLogin = ({ navigation }) => {
  const [logarUsuario, setLogarUsuario] = useState("");
  const [logarSenha, setLogarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { corPrincipal } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();
  const { resetNavegacao } = useBarraDeNavegacao();
  const { usuario, setUsuario } = useAuth();

  const toastSucesso = () => {
    Toast.show({
      type: 'success',
      text1: 'Login bem sucedido.',
      position: 'top',
      visibilityTime: 3000,
    });
  }

  const toastCamposFaltando = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha no login',
      text2: 'Preencha todos os campos',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const toastCredenciaisInvalidas = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha no login',
      text2: 'Usuário ou senha inválidos (401)',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const toastErroGenerico = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha no login',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const getUsuario = async (logarUsuario) => {
    try {
      const response = await axios.get(`http://192.168.0.34:8080/usuario/${logarUsuario}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter.", error);
      return null;
    }
  };

  const realizarLogin = async () => {
    if (logarUsuario.trim() === "" || logarSenha.trim() === "") {
      toastCamposFaltando();
    } else {
      try {
        const response = await axios.post("http://192.168.0.34:8080/usuario/login", {
          usuario: logarUsuario,
          senha: logarSenha,
        });
        toastSucesso();
        const usuarioDados = await getUsuario(logarUsuario);
        setUsuario(usuarioDados);
        if (usuario) {
          setLogarUsuario('');
          setLogarSenha('');
          resetNavegacao();
          navigation.navigate("Home");
        } else {
          toastErroGenerico();
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toastCredenciaisInvalidas();
        } else {
          toastErroGenerico();
        }
      }
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: "#F8F7F4" }}>
      <Image
        source={require("./../assets/battle-net-logo.png")}
        style={styles.logo}
      />

      <Text
        style={{
          ...styles.boasVindas,
          fontSize: fonteGrande.fontSize,
        }}
      >
        Bem-vindo.
      </Text>
      <Text
        style={{
          ...styles.facaLogin,
          fontSize: fonteMedia.fontSize,
        }}
      >
        Faça log-in para continuar.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="gray"
        value={logarUsuario}
        onChangeText={(text) => setLogarUsuario(text)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="gray"
          secureTextEntry={!mostrarSenha}
          value={logarSenha}
          onChangeText={(text) => setLogarSenha(text)}
        />
        <Pressable
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={styles.eyeIcon}
        >
          <FontAwesome name="eye" color={"gray"} size={RFValue(15)} />
        </Pressable>
      </View>

      <Pressable
        style={{ ...styles.btnEntrar, backgroundColor: corPrincipal }}
        onPress={realizarLogin}
      >
        <Text style={{...styles.buttonText, fontSize: fonteMedia.fontSize}}>Entrar</Text>
        <FontAwesome name="arrow-right" color={"white"} size={RFValue(15)} />
      </Pressable>
      <View style={styles.loginExternoView}>
        <Pressable style={styles.btnLoginExterno}>
          <FontAwesome name="google" color={corPrincipal} size={RFValue(20)} />
        </Pressable>
        <Pressable style={styles.btnLoginExterno}>
          <FontAwesome name="facebook" color={corPrincipal} size={RFValue(20)} />
        </Pressable>
      </View>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: fontePequena.fontSize}}>Não tem uma conta? </Text>
        <Pressable onPress={() => navigation.navigate('TelaCadastro')} >
          <Text style={{color: corPrincipal, borderBottomWidth: 2, borderBottomColor: corPrincipal}}>Cadastre-se</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  btnEntrar: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: "center",
    width: "85%",
    height: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  boasVindas: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  facaLogin: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  loginExternoView: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
    width: "40%",
  },
  btnLoginExterno: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default TelaLogin;
