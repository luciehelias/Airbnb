import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import logo from "../../assets/logo.png";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const styles = useStyle();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email, password }
      );
      alert("Vous êtes connectés");
    } catch (error) {
      if (email === "" || password === "") {
        setErrorMessage("Merci de remplir tous les champs !");
      } else {
        setErrorMessage(
          "L'utilisateur ou le mot de passe n'existe pas, merci de vérifier vos champs !"
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title1}>Sign In</Text>
        <View style={styles.containerInput}>
          <View style={styles.infoInput}>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          <View style={styles.infoInput}>
            <TextInput
              placeholder="password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btnSign}
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
        <Link href={"/SignUp"}>No account ? Register</Link>
      </View>
    </KeyboardAwareScrollView>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    title1: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#777777",
      marginBottom: 60,
    },
    logo: {
      marginTop: 40,
      height: 100,
      width: 160,
      marginBottom: 20,
    },
    infoInput: {
      borderBottomWidth: 1,
      borderBottomColor: "#EB5A62",
      paddingBottom: 10,
      marginBottom: 10,
      padding: 10,
    },
    containerInput: {
      width: width,
      paddingHorizontal: 20,
      marginBottom: 160,
    },

    btnSign: {
      borderWidth: 2,
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 60,
      borderRadius: 20,
      borderColor: "#EB5A62",
      marginBottom: 20,
    },
    errorMessage: {
      color: "#EB5A62",
      marginBottom: 10,
    },
  });
  return styles;
};
