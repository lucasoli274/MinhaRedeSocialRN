import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";

import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";

const TelaCadastro = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  const [mostrarSenha1, setMostrarSenha1] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);

  const { corPrincipal } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const toastSucesso = () => {
    Toast.show({
      type: 'success',
      text1: 'Cadastro bem sucedido.',
      text2: 'Continue para a tela de login',
      position: 'top',
      visibilityTime: 3000,
    });
  }

  const toastSenhasDiferentes = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao cadastrar',
      text2: 'As senhas não coincidem',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const toastCamposFaltando = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao cadastrar',
      text2: 'Preencha todos os campos',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const toastDadosExistentes = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao cadastrar',
      text2: 'Email e/ou usuário já existe no sistema',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const toastTenteMaisTarde = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao cadastrar',
      text2: 'Tente novamente mais tarde.',
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  const cadastraUsuario = () => {
    if (usuario.trim() === "" || email.trim() === "" || nome.trim() === "" || senha1.trim() === "" || senha2.trim() === "") {
      toastCamposFaltando();
    } else if (senha1 === senha2) {
      const novoUsuario = {
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha1,
      };
  
      axios.post("http://192.168.0.34:8080/usuario/cadastrar", novoUsuario, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          toastSucesso();
          setNome('');
          setEmail('');
          setUsuario('');
          setSenha1('');
          setSenha2('');
          navigation.navigate("TelaLogin");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 409) {
              toastDadosExistentes();
            } else {
              console.error("Erro ao efetuar cadastro:", error);
              toastTenteMaisTarde();
            }
          } else {
            console.error("Erro ao efetuar cadastro:", error);
            toastTenteMaisTarde();
          }
        });
    } else {
      toastSenhasDiferentes();
    }
  };
  
  
  return (
    <View style={{ ...styles.container, backgroundColor: "#F8F7F4" }}>
      <Pressable style={{position: 'absolute', top: 50, left: 15}} onPress={() => navigation.goBack()} >
        <FontAwesome name="arrow-left" color={'gray'} size={30} />
      </Pressable>

      <Image
        source={require("./../assets/battle-net-logo.png")}
        style={styles.logo}
      />

      <Text
        style={{
          ...styles.titulo,
          fontSize: fonteGrande.fontSize,
        }}
      >
        Crie já sua conta
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="gray"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="gray"
        maxLength={30}
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="gray"
        maxLength={50}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <View style={styles.inputSenha}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="gray"
          secureTextEntry={!mostrarSenha1}
          value={senha1}
          onChangeText={(text) => setSenha1(text)}
        />
        <Pressable
          onPress={() => setMostrarSenha1(!mostrarSenha1)}
          style={styles.eyeIcon}
        >
          <FontAwesome name="eye" color={"gray"} size={20} />
        </Pressable>
      </View>
      <View style={styles.inputSenha}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="gray"
          secureTextEntry={!mostrarSenha2}
          value={senha2}
          onChangeText={(text) => setSenha2(text)}
        />
        <Pressable
          onPress={() => setMostrarSenha2(!mostrarSenha2)}
          style={styles.eyeIcon}
        >
          <FontAwesome name="eye" color={"gray"} size={20} />
        </Pressable>
      </View>

      <Pressable
        style={{ ...styles.btnCadastrar, backgroundColor: corPrincipal }} onPress={cadastraUsuario}
      >
        <Text style={{ ...styles.btnCadastrarTxt, fontSize: fonteMedia.fontSize }}>
          Confirmar cadastro
        </Text>
      </Pressable>
      <Text style={{marginTop: 20, fontSize: fontePequena.fontSize}}>--- OU ENTÃO ---</Text>
      <View style={styles.loginExternoView}>
        <Pressable style={styles.btnLoginExterno}>
          <FontAwesome
            name="google"
            color={corPrincipal}
            size={25}
            style={styles.iconLoginExterno}
          />
          <Text style={{ fontSize: fontePequena.fontSize, padding: 10 }}>
            Entre com Google
          </Text>
        </Pressable>
        <Pressable style={styles.btnLoginExterno}>
          <FontAwesome
            name="facebook"
            color={corPrincipal}
            size={25}
            style={styles.iconLoginExterno}
          />
          <Text style={{ fontSize: fontePequena.fontSize, padding: 10 }}>
            Entre com Facebook
          </Text>
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
    width: 100,
    height: 100,
  },
  btnCadastrar: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 10,
    alignItems: "center",
    width: "85%",
  },
  btnCadastrarTxt: {
    color: "white",
    fontWeight: "bold",
    padding: 10
  },
  titulo: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  facaLogin: {
    color: "white",
    marginBottom: 20,
  },
  inputSenha: {
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
    height: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  loginExternoView: {
    margin: 20,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "15%",
  },
  btnLoginExterno: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
  },
  iconLoginExterno: {
    position: "absolute",
    left: 5,
    margin: 10,
  },
});

export default TelaCadastro;
