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
import Toast from "react-native-toast-message";
import { useColors } from "../src/contexts/Colors";
import { useFonts } from "../src/contexts/Fonts";

const CriarPublicacao = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();  

  return (
  <View style={styles.container}>

  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CriarPublicacao;
