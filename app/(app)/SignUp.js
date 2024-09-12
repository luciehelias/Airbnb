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

import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = useStyle();

  console.log("object");
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Vos mots de passe ne sont pas identiques");
    } else if (
      !email ||
      !password ||
      !description ||
      !confirmPassword ||
      !username
    ) {
      return setErrorMessage("Merci de remplir tous vos champs !");
    }

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        { email, password, description, username }
      );
      console.log("response", response);
      alert("Vous êtes connectés");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé !");
      }
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title1}>Sign up</Text>
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
              placeholder="username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
          </View>
          <View style={styles.infoDescription}>
            <TextInput
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
              placeholder={"describe yourself"}
              multiline={true}
              numberOfLines={10}
              maxLength={250}
            />
          </View>
          <View style={styles.infoInput}>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder={"password"}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.infoInput}>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              placeholder={"confirm password"}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btnSign}
            activeOpacity={0.8}
            onPress={handleSignUp}
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
      marginBottom: 30,
    },
    logo: {
      marginTop: 10,
      height: 80,
      width: 140,
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
      marginBottom: 40,
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

    infoDescription: {
      borderWidth: 1,
      marginBottom: 10,
      borderColor: "#EB5A62",
      height: 100,
      padding: 10,
    },
  });
  return styles;
};
