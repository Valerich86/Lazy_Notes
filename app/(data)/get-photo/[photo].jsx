import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImage, deleteImage } from "../../../web/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import ItemHeader from "../../../components/ItemHeader";

const globalStyles = require("../../../constants/GlobalStyles");

const Photo = () => {
  const { photo } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getImage(photo);
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
      await deleteImage(photo);
      router.push("/photos");
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
            handleReturnPress={() => router.push("/photos")}
            handleDeletePress={handleDeletePress}
          />
          <View style={[styles.container, { borderColor: data.color }]}>
            <View
              style={[styles.colorIndicator, { backgroundColor: data.color }]}
            ></View>
            <Text style={styles.date}>
              {new Date(data.$createdAt).toLocaleString()}
            </Text>
            {data.title && <Text style={styles.title}>{data.title}</Text>}
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ImageBackground
                style={styles.photo}
                source={{uri: data.image}}
                resizeMode='contain'
              >
              </ImageBackground>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 3,
    minHeight: '90%',
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
  photo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
