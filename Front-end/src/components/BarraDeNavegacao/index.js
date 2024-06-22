import React, { useState, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useColors } from "../../contexts/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useBarraDeNavegacao } from "../../contexts/BarraDeNavegacao";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const BarraDeNavegacao = () => {
  const {
    corPrincipal,
    corFundo,
    corContraste,
    corBotoes,
  } = useColors();
  
  const navigation = useNavigation();

  const {
    fundoHome,
    setFundoHome,
    fundoSearch,
    setFundoSearch,
    fundoPerfil,
    setFundoPerfil,
    fundoAtividades,
    setFundoAtividades,
    corBtnHome,
    setCorBtnHome,
    corBtnSearch,
    setCorBtnSearch,
    corBtnPerfil,
    setCorBtnPerfil,
    corBtnAtividades,
    setCorBtnAtividades,
  } = useBarraDeNavegacao();

  const homeRef = useRef(null);
  const searchRef = useRef(null);
  const perfilRef = useRef(null);
  const atividadesRef = useRef(null);

  const btnHome = () => {
    homeRef.current?.pulse(500);
    setFundoHome(corPrincipal);
    setFundoSearch(corFundo);
    setFundoPerfil(corFundo);
    setFundoAtividades(corFundo);
    setCorBtnHome("white");
    setCorBtnSearch(corBotoes);
    setCorBtnPerfil(corBotoes);
    setCorBtnAtividades(corBotoes);
    navigation.navigate("Home");
  };

  const btnSearch = () => {
    searchRef.current?.pulse(500);
    setFundoHome(corFundo);
    setFundoSearch(corPrincipal);
    setFundoPerfil(corFundo);
    setFundoAtividades(corFundo);
    setCorBtnHome(corBotoes);
    setCorBtnSearch("white");
    setCorBtnPerfil(corBotoes);
    setCorBtnAtividades(corBotoes);
    navigation.navigate("Pesquisar");
  };

  const btnPerfil = () => {
    perfilRef.current?.pulse(500);
    setFundoHome(corFundo);
    setFundoSearch(corFundo);
    setFundoPerfil(corPrincipal);
    setFundoAtividades(corFundo);
    setCorBtnHome(corBotoes);
    setCorBtnSearch(corBotoes);
    setCorBtnPerfil("white");
    setCorBtnAtividades(corBotoes);
    navigation.navigate("Perfil");
  };

  const btnAtividades = () => {
    atividadesRef.current?.pulse(500);
    setFundoHome(corFundo);
    setFundoSearch(corFundo);
    setFundoPerfil(corFundo);
    setFundoAtividades(corPrincipal);
    setCorBtnHome(corBotoes);
    setCorBtnSearch(corBotoes);
    setCorBtnPerfil(corBotoes);
    setCorBtnAtividades("white");
    navigation.navigate("Atividades");
  };

  const btnPublicar = () => {
    atividadesRef.current?.pulse(500);
    navigation.navigate("CriarPublicacao");
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: corFundo,
        borderColor: corContraste,
      }}
    >
      <Animatable.View
        ref={homeRef}
        style={{ ...styles.btn, backgroundColor: fundoHome }}
      >
        <Pressable onPress={btnHome}>
          <FontAwesome name="home" color={corBtnHome} size={30} />
        </Pressable>
      </Animatable.View>
      <Animatable.View
        ref={searchRef}
        style={{ ...styles.btn, backgroundColor: fundoSearch }}
      >
        <Pressable onPress={btnSearch}>
          <FontAwesome name="search" color={corBtnSearch} size={30} />
        </Pressable>
      </Animatable.View>
      <Animatable.View style={{ ...styles.btnPublicar, borderWidth: 0 }}>
        <Pressable onPress={btnPublicar}>
          <FontAwesome name="plus-circle" color={corPrincipal} size={50} />
        </Pressable>
      </Animatable.View>
      <Animatable.View
        ref={atividadesRef}
        style={{ ...styles.btn, backgroundColor: fundoAtividades }}
      >
        <Pressable onPress={btnAtividades}>
          <FontAwesome name="bell" color={corBtnAtividades} size={30} />
        </Pressable>
      </Animatable.View>
      <Animatable.View
        ref={perfilRef}
        style={{ ...styles.btn, backgroundColor: fundoPerfil }}
      >
        <Pressable onPress={btnPerfil}>
          <FontAwesome name="user-circle" color={corBtnPerfil} size={30} />
        </Pressable>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    borderRadius: 10,
    position: "absolute",
    bottom: 7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btn: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 7,
  },
  btnPublicar: {
    borderWidth: 1,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    margin: 7,
  },
});

export default BarraDeNavegacao;
