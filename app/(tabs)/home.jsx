import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import Header from "../../components/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";

const globalStyles = require("../../constants/GlobalStyles");

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <View>
          <Link href="/todos">
            <View style={styles.item}>
            <MaterialIcons name="task" size={200} color={Colors.folder} />
            <Text style={globalStyles.folderHeader}>Дела</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomView}>
          <Link href="/notes">
            <View style={styles.item}>
            <FontAwesome name="sticky-note" size={50} color={Colors.folder} />
            <Text style={globalStyles.folderHeader}>Заметки</Text>
            </View>
          </Link>
          <Link href="/lists">
            <View style={styles.item}>
            <MaterialCommunityIcons name="clipboard-list" size={50} color={Colors.folder}/>
            <Text style={globalStyles.folderHeader}>Списки</Text>
            </View>
          </Link>
          <Link href="/photos">
            <View style={styles.item}> 
            <Fontisto name="photograph" size={50} color={Colors.folder} />
            <Text style={globalStyles.folderHeader}>Фото</Text>
            </View>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "90%",
    justifyContent: 'center',
    alignItems: "center",
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 70
  }
});
