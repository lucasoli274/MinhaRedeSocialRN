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
import { useAuth } from "../src/contexts/Auth";

import BarraDeNavegacao from "../src/components/BarraDeNavegacao";

const MeuPerfil = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [publicacoes, setPublicacoes] = useState([]);

  const [mostrarOpcoesPost, setMostrarOpcoesPost] = useState({});

  const likeRefs = useRef([]);
  const comentarRefs = useRef([]);

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
    navigation.navigate("Comentarios", { publicacao: publicacao });
  };

  const btnExcluirPost = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.34:8080/post/${id}`
      );
      getPublicacoes();
      toastSucessoExclusao();
    } catch {
      toastErroExclusao();
      return null;
    }
  };

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
  };

  const toggleMostrarOpcoesPost = (id) => {
    setMostrarOpcoesPost((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOutsidePress = () => {
    setMostrarOpcoesPost({});
  };

  const [quantosSigo, setQuantosSigo] = useState(0);

  const getQuantosSigo = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.34:8080/seguir/quantosSigo/${usuario.id}`
      );
      setQuantosSigo(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  useEffect(() => {
    const getQuantosSigoNovamente = navigation.addListener("focus", () => {
      getQuantosSigo();
    });

    return getQuantosSigoNovamente;
  }, [navigation]);

  const [quantosMeSeguem, setQuantosMeSeguem] = useState(0);

  const getQuantosMeSeguem = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.34:8080/seguir/quantosMeSeguem/${usuario.id}`
      );
      setQuantosMeSeguem(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  useEffect(() => {
    const getQuantosMeSeguemNovamente = navigation.addListener("focus", () => {
      getQuantosMeSeguem();
    });

    return getQuantosMeSeguemNovamente;
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
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
                Meu nome é Lucas, eu programo às vezes, mas só quando dá, queria
                era jogar futebol.
              </Text>
              <Text
                style={{
                  fontSize: fontePequena.fontSize,
                  color: fonteMedia.color,
                  padding: 5,
                }}
              >
                Seguindo: {quantosSigo}
              </Text>
              <Text
                style={{
                  fontSize: fontePequena.fontSize,
                  color: fonteMedia.color,
                  padding: 5,
                }}
              >
                Seguidores: {quantosMeSeguem}
              </Text>
              <Pressable
                style={{
                  ...styles.btnEditarInformacoes,
                  backgroundColor: corDestaque,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    fontSize: fontePequena.fontSize,
                    color: fontePequena.color,
                  }}
                >
                  Editar informações
                </Text>
              </Pressable>
            </View>
          </View>
          {publicacoes.map((publicacao, index) => (
            <View
              key={publicacao.id}
              style={{ ...styles.post, backgroundColor: corDestaque }}
            >
              <View style={styles.cabecalhoPost}>
                <Pressable
                  style={{ flexDirection: "row", padding: 5 }}
                  onPress={() =>
                    navigation.navigate("Perfil", {
                      perfilVisitado: publicacao.usuario,
                    })
                  }
                >
                  <FontAwesome
                    name="user-circle"
                    color={"gray"}
                    size={RFValue(25)}
                  />
                  <Text
                    style={{
                      ...styles.nomeUsuario,
                      fontSize: fonteMedia.fontSize,
                      color: fonteMedia.color,
                    }}
                  >
                    {publicacao.usuario.usuario}
                  </Text>
                </Pressable>
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
                    <View>
                      <Pressable
                        style={styles.btnOpcoesPost}
                        onPress={() => btnEditarPost(publicacao)}
                      >
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
                      <Pressable
                        style={styles.btnOpcoesPost}
                        onPress={() => btnExcluirPost(publicacao.id)}
                      >
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
                    <FontAwesome
                      name="bolt"
                      color={"gray"}
                      size={RFValue(15)}
                    />
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
                    <FontAwesome
                      name="comment-o"
                      color={"gray"}
                      size={RFValue(15)}
                    />
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
          <View style={{ height: 100 }} />
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
    margin: 5,
  },
  viewSobreMim: {
    marginTop: 100,
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  viewInformacoesTxt: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
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

export default MeuPerfil;
