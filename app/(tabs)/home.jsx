import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import Header from "../../components/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";

const globalStyles = require("../../constants/GlobalStyles");

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <Link href="/notes">
          <FontAwesome name="sticky-note" size={90} color={Colors.folder} />
          <Text style={globalStyles.folderHeader}>Заметки</Text>
        </Link>
        <Link href="/lists">
          <Text style={globalStyles.folderHeader}>Списки</Text>
          <MaterialCommunityIcons
            name="clipboard-list"
            size={100}
            color={Colors.folder}
          />
        </Link>
        <Link href="/photos">
          <Fontisto name="photograph" size={90} color={Colors.folder} />
          <Text style={globalStyles.folderHeader}>Фото</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "90%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
