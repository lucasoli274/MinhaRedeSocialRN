import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
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

const Pesquisar = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, corDestaque, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const { usuario } = useAuth();

  const [valorPesquisa, setValorPesquisa] = useState("");

  const [publicacoes, setPublicacoes] = useState([]);
  const [mostrarOpcoesPost, setMostrarOpcoesPost] = useState({});
  const likeRefs = useRef([]);
  const comentarRefs = useRef([]);

  const [usuarios, setUsuarios] = useState([]);

  const [corBtnPesquisandoPosts, setCorBtnPesquisandoPosts] = useState(corDestaque);
  const [corBtnPesquisandoUsuarios, setCorBtnPesquisandoUsuarios] = useState(corFundo);

  const toastErroGet = () => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Erro ao carregar informações",
      visibilityTime: 3000,
    });
  };

  const getPublicacoes = async () => {
    try {
      const response = await axios.get("http://192.168.0.34:8080/post");
      setPublicacoes(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  useEffect(() => {
    const getPublicacoesNovamente = navigation.addListener("focus", () => {
      getPublicacoes();
    });

    return getPublicacoesNovamente;
  }, [navigation]);

  const publicacoesFiltradas = publicacoes.filter((publicacao) =>
    publicacao.conteudo.toLocaleLowerCase().includes(valorPesquisa.toLocaleLowerCase())
  );

  const getUsuarios = async () => {
    try {
      const response = await axios.get("http://192.168.0.34:8080/usuario");
      setUsuarios(response.data);
    } catch {
      toastErroGet();
      return null;
    }
  };

  useEffect(() => {
    const getUsuariosNovamente = navigation.addListener("focus", () => {
      getUsuarios();
    });

    return getUsuariosNovamente;
  }, [navigation]);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.usuario.toLowerCase().includes(valorPesquisa.toLowerCase()) ||
    usuario.nome.toLowerCase().includes(valorPesquisa.toLowerCase())
  );

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

  const [pesquisandoPosts, setPesquisandoPosts] = useState(true);
  const [pesquisandoUsuarios, setPesquisandoUsuarios] = useState(false);

  const atualizaCoresBotoesFiltro = () => {
    setCorBtnPesquisandoPosts(pesquisandoPosts ? corDestaque : corFundo);
    setCorBtnPesquisandoUsuarios(pesquisandoUsuarios ? corDestaque : corFundo);
  };

  useEffect(() => {
    atualizaCoresBotoesFiltro();
  }, [modoEscuro, pesquisandoPosts, pesquisandoUsuarios]);

  const btnPublicacoes = () => {
    setPesquisandoPosts(true);
    setPesquisandoUsuarios(false);
  };
  
  const btnUsuarios = () => {
    setPesquisandoPosts(false);
    setPesquisandoUsuarios(true);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ ...styles.container, backgroundColor: corFundo }}>
        <View style={styles.barraPesquisaView}>
          <View
            style={{
              ...styles.barraDePesquisa,
              backgroundColor: corDestaque,
            }}
          >
            <TextInput
              placeholder="Pesquisar..."
              placeholderTextColor={corContraste}
              value={valorPesquisa}
              onChangeText={(text) => setValorPesquisa(text)}
              style={{
                ...styles.inputPesquisa,
                fontSize: fontePequena.fontSize,
                color: fontePequena.color
              }}
            />
            <FontAwesome
              name="search"
              color={corContraste}
              size={RFValue(15)}
              style={styles.iconSearch}
            />
          </View>
        </View>
        <View style={styles.viewOpcoesPesquisa}>
          <Pressable
            style={{
              ...styles.btnOpcoesPesquisa,
              backgroundColor: corBtnPesquisandoPosts
            }}
            onPress={btnPublicacoes}
          >
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fontePequena.color,
                padding: 5,
              }}
            >
              Publicações
            </Text>
          </Pressable>
          <View
            style={{ backgroundColor: corContraste, height: 10, width: 1 }}
          />
          <Pressable
            style={{
              ...styles.btnOpcoesPesquisa,
              backgroundColor: corBtnPesquisandoUsuarios
            }}
            onPress={btnUsuarios}
          >
            <Text
              style={{
                fontSize: fontePequena.fontSize,
                color: fontePequena.color,
                padding: 5,
              }}
            >
              Usuários
            </Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {valorPesquisa < 3 && (
            <View
              style={{ height: "90%", width: "100%", justifyContent: "center" }}
            >
              <View style={{ alignItems: "center", padding: 20 }}>
                <FontAwesome name="search" color={"gray"} size={RFValue(40)} />
                <Text
                  style={{
                    fontSize: fonteGrande.fontSize,
                    color: "gray",
                    textAlign: "center",
                    padding: 5,
                  }}
                >
                  Comece a pesquisar agora mesmo
                </Text>
                <Text
                  style={{
                    fontSize: fonteMedia.fontSize,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  {"("}*Mín. 3 caracteres{")"}
                </Text>
              </View>
            </View>
          )}
          {valorPesquisa.length >= 3 &&
            pesquisandoPosts &&
            publicacoesFiltradas.map((publicacao, index) => (
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
                      size={RFValue(15)}
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
                              size={RFValue(10)}
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
                              size={RFValue(10)}
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
                          size={RFValue(10)}
                        />
                      </Pressable>
                    </View>
                  )}
                </View>
                <Text
                  style={{ fontSize: fontePequena.fontSize, color: "gray" }}
                >
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
          {valorPesquisa.length >= 3 &&
            pesquisandoUsuarios &&
            usuariosFiltrados.map((usuario, index) => (
              <View style={{ width: "100%" }} key={usuario.id}>
                <Pressable
                  style={{ ...styles.usuario, backgroundColor: corDestaque }}
                  onPress={() => navigation.navigate("Perfil", { perfilVisitado: usuario })}
                >
                  <FontAwesome name="user-circle" color={"gray"} size={RFValue(20)} />
                  <Text
                    style={{
                      fontSize: fonteMedia.fontSize,
                      color: fonteMedia.color,
                      padding: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {usuario.usuario}
                  </Text>
                </Pressable>
              </View>
            ))}
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
  barraPesquisaView: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  barraDePesquisa: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    width: "90%",
  },
  inputPesquisa: {
    width: "100%",
  },
  iconSearch: {
    position: "absolute",
    alignSelf: "center",
    right: 10,
  },
  viewOpcoesPesquisa: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    padding: 10,
    marginTop: 10,
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
  btnOpcoesPesquisa: {
    width: "40%",
    alignItems: "center",
    borderRadius: 5,
  },
  usuario: {
    flexDirection: "row",
    padding: 5,
    margin: 10,
    width: "100%",
    alignItems: "center",
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default Pesquisar;
