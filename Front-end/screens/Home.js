import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";
import BarraDeNavegacao from "../src/components/BarraDeNavegacao";
import { useAuth } from "../src/contexts/Auth";

const Home = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);
  const [mostrarOpcoesPost, setMostrarOpcoesPost] = useState({});

  const likeRefs = useRef([]);
  const comentarRefs = useRef([]);

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

  const btnLike = (index) => {
    if (likeRefs.current[index]) {
      likeRefs.current[index].pulse(500);
    }
  };

  const btnComentar = (index, publicacao) => {
    if (comentarRefs.current[index]) {
      comentarRefs.current[index].pulse(500);
    }
    navigation.navigate("Comentarios", {publicacao: publicacao});
  };

  const btnExcluirPost = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.0.34:8080/post/${id}`);
      getPublicacoes();
      toastSucessoExclusao();
    } catch {
      toastErroExclusao();
      return null;
    }
  }

  const toastSucessoExclusao = () => {
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "A publicação foi excluída.",
      visibilityTime: 3000,
    });
  };

  const toastErroExclusao = () => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Erro ao excluir publicação",
      visibilityTime: 3000,
    });
  };

  const btnEditarPost = (publicacao) => {
    navigation.navigate("EditarPublicacao", { publicacao: publicacao });
  }

  const toggleMostrarOpcoesPost = (id) => {
    setMostrarOpcoesPost((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOutsidePress = () => {
    setMostrarOpcoesPost({});
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: modoEscuro ? "#121f24" : "#f8f7f4",
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.cabecalho}>
            <Image
              source={require("../assets/battle-net-logo.png")}
              style={{ height: 60, width: 60 }}
            />
          </View>
          {publicacoes.map((publicacao, index) => (
            <View
              key={publicacao.id}
              style={{ ...styles.post, backgroundColor: corDestaque }}
            >
              <View style={styles.cabecalhoPost}>
                <FontAwesome name="user-circle" color={"gray"} size={RFValue(25)} />
                <Text
                  style={{
                    ...styles.nomeUsuario,
                    fontSize: fonteMedia.fontSize,
                    color: fonteMedia.color,
                  }}
                >
                  {publicacao.usuario.usuario}
                </Text>
                <Pressable
                  style={styles.abrirOpcoesPost}
                  onPress={() => toggleMostrarOpcoesPost(publicacao.id)}
                >
                  <FontAwesome
                    name="ellipsis-v"
                    color={corContraste}
                    size={RFValue(20)}
                  />
                </Pressable>
                {mostrarOpcoesPost[publicacao.id] && (
                  <View
                    style={{
                      ...styles.opcoesPost,
                      backgroundColor: corFundo,
                      borderColor: corContraste,
                    }}
                  >
                    {usuario.usuario == publicacao.usuario.usuario && (
                      <View>
                        <Pressable style={styles.btnOpcoesPost} onPress={() => btnEditarPost(publicacao)}>
                          <Text
                            style={{
                              ...styles.opcoesPostTxt,
                              fontSize: fontePequena.fontSize,
                              color: fontePequena.color,
                            }}
                          >
                            Editar
                          </Text>
                          <FontAwesome
                            name="pencil"
                            color={corContraste}
                            size={RFValue(15)}
                          />
                        </Pressable>
                        <Pressable style={styles.btnOpcoesPost} onPress={() => btnExcluirPost(publicacao.id)}>
                          <Text
                            style={{
                              ...styles.opcoesPostTxt,
                              fontSize: fontePequena.fontSize,
                              color: fontePequena.color,
                            }}
                          >
                            Excluir
                          </Text>
                          <FontAwesome
                            name="trash"
                            color={corContraste}
                            size={RFValue(15)}
                          />
                        </Pressable>
                      </View>
                    )}
                    <Pressable style={styles.btnOpcoesPost}>
                      <Text
                        style={{
                          ...styles.opcoesPostTxt,
                          fontSize: fontePequena.fontSize,
                          color: fontePequena.color,
                        }}
                      >
                        Salvar
                      </Text>
                      <FontAwesome
                        name="bookmark"
                        color={corContraste}
                        size={RFValue(15)}
                      />
                    </Pressable>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: fontePequena.fontSize, color: "gray" }}>
                {publicacao.data}
              </Text>
              <Text
                style={{
                  fontSize: fontePequena.fontSize,
                  color: fontePequena.color,
                  marginTop: 5,
                }}
              >
                {publicacao.conteudo}
              </Text>
              <View
                style={{
                  ...styles.interacoesPostView,
                  borderTopColor: corContraste,
                }}
              >
                <Animatable.View ref={(el) => (likeRefs.current[index] = el)}>
                  <Pressable
                    style={styles.interacoesPost}
                    onPress={() => btnLike(index)}
                  >
                    <FontAwesome name="bolt" color={"gray"} size={RFValue(15)} />
                    <Text
                      style={{
                        fontSize: fontePequena.fontSize,
                        color: fontePequena.color,
                        margin: 5,
                      }}
                    >
                      Curtir
                    </Text>
                  </Pressable>
                </Animatable.View>
                <Animatable.View
                  ref={(el) => (comentarRefs.current[index] = el)}
                >
                  <Pressable
                    style={styles.interacoesPost}
                    onPress={() => btnComentar(index, publicacao)}
                  >
                    <FontAwesome name="comment-o" color={"gray"} size={RFValue(15)} />
                    <Text
                      style={{
                        fontSize: fontePequena.fontSize,
                        color: fontePequena.color,
                        margin: 5,
                      }}
                    >
                      Comentários
                    </Text>
                  </Pressable>
                </Animatable.View>
              </View>
            </View>
          ))}
          <View style={{ alignItems: "center", height: 180 }}>
            <FontAwesome name="minus" color={"gray"} size={RFValue(30)} />
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fontePequena.color,
              }}
            >
              Íh, parece que não há nada por aqui!
            </Text>
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fontePequena.color,
              }}
            >
              Que tal fazer uma atualização legal agora? ✨
            </Text>
          </View>
        </ScrollView>
        <BarraDeNavegacao />
      </View>
    </TouchableWithoutFeedback>
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
    padding: 10,
    marginVertical: 10,
    width: "100%",
    borderRadius: 10,
  },
  cabecalhoPost: {
    flexDirection: "row",
    alignItems: "center",
  },
  interacoesPostView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    borderTopWidth: 1,
    width: "100%",
  },
  interacoesPost: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  nomeUsuario: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  abrirOpcoesPost: {
    position: "absolute",
    right: 0,
    borderRadius: 100,
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  opcoesPost: {
    position: "absolute",
    right: 5,
    top: 0,
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
    width: "37%",
  },
  opcoesPostTxt: {
    paddingVertical: 7,
  },
  btnOpcoesPost: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
});

export default Home;
