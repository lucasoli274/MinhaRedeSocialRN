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
import { useAuth } from "../src/contexts/Auth";
import BarraDeNavegacao from "../src/components/BarraDeNavegacao";

const Pesquisar = ({ navigation }) => {
  const { corPrincipal, corFundo, corContraste, modoEscuro } = useColors();
  const { fontePequena, fonteMedia, fonteGrande } = useFonts();

  const corBarraDePesquisa = modoEscuro ? '#28444f' : '#e3e2e1';

  const { usuario } = useAuth();

  const [valorPesquisa, setValorPesquisa] = useState("");

  return (
    <View style={{ ...styles.container, backgroundColor: corFundo }}>
      <View style={styles.barraPesquisaView}>
        <View style={{...styles.barraDePesquisa, backgroundColor: corBarraDePesquisa}}>
          <TextInput
            placeholder="Pesquisar usuários..."
            placeholderTextColor={corContraste}
            value={valorPesquisa}
            onChangeText={(text) => setValorPesquisa(text)}
            style={{...styles.inputPesquisa, fontSize: fontePequena.fontSize}}
          />
          <FontAwesome name="search" color={corContraste} size={20} style={styles.iconSearch} />
        </View>
      </View>
      <BarraDeNavegacao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barraPesquisaView: {
    marginTop: 50,
    width: "100%",
    alignItems: 'center',
  },
  barraDePesquisa: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  inputPesquisa: {
    width: '100%',
  },
  iconSearch: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
});

export default Pesquisar;
