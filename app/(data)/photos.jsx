import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../components/ListHeader";
import ImageCard from "../../components/ImageCard";
import { getImages } from "../../web/appwrite";
import SearchInput from "../../components/SearchInput";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const globalStyles = require("../../constants/GlobalStyles");

const Photos = () => {
  const [sortedBy, setSortedBy] = useState("$createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { user } = useGlobalContext();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getImages(user.$id, sortedBy);
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

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
        <>
          <View>
            <ListHeader
              title="Мои изображения"
              handleCreate={() => router.push("/addPhoto")}
              handleReturnPress={() => {
                router.push("/home");
              }}
            />
            <FlatList
              data={data}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <ImageCard item={item}/>}
              ListEmptyComponent={() => (
                <Text style={[globalStyles.description, { marginTop: 100 }]}>
                  Изображения не загружены...
                </Text>
              )}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => <SearchInput searchDirectory='/search-photos'/>}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Photos;

const styles = StyleSheet.create({});
