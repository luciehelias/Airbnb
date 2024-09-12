import { Text, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home() {
  const styles = useStyle();

  return (
    <KeyboardAwareScrollView>
      <Text></Text>
    </KeyboardAwareScrollView>
  );
}

const useStyle = () => {
  const styles = StyleSheet.create({});
  return styles;
};
