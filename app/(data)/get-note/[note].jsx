import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getNote, deleteNote } from "../../../web/appwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import ItemHeader from "../../../components/ItemHeader";

const globalStyles = require("../../../constants/GlobalStyles");

const Note = () => {
  const { note } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getNote(note);
      setData(response);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePress = async () => {
    try {
      await deleteNote(note);
      router.push("/notes");
    } catch (error) {
      Alert.alert("fetchData", error.message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
        <View>
          <ItemHeader
            handleUpdatePress={() => router.push(`/update-note/${data.$id}`)}
            handleReturnPress={() => router.push("/notes")}
            handleDeletePress={handleDeletePress}
          />
          <ScrollView
            contentContainerStyle={{ minHeight: "90%" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.container, { borderColor: data.color }]}>
              <View
                style={[styles.colorIndicator, { backgroundColor: data.color }]}
              ></View>
              <Text style={styles.date}>
                {new Date(data.$createdAt).toLocaleString()}
              </Text>
              {data.title && <Text style={styles.title}>{data.title}</Text>}
              <Text style={styles.text}>{data.text}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 3,
    minHeight: 200,
    backgroundColor: "white",
  },
  text: {
    textAlign: "left",
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
  date: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
  },
  colorIndicator: {
    width: "100%",
    height: 20,
  },
});
