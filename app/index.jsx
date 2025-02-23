import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Animated,
  useAnimatedValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import CustomButton from "../components/CustomButton";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const globalStyles = require("../constants/GlobalStyles");

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const zooming = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(zooming, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
        <View style={styles.container}>
          <Animated.View style={{ transform: [{ scale: zooming }] }}>
            <ImageBackground source={require("../assets/images/gradient.png")}>
              <Image
                source={require("../assets/images/app-logo.png")}
                style={styles.logo}
              />
            </ImageBackground>
          </Animated.View>
          <CustomButton
            title="Продолжить с почтой"
            containerStyles="{width: '100%', marginTop: 50}"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "300",
    height: "300",
  },
});
