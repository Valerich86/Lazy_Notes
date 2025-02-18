import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ListHeader from "../../components/ListHeader";
import NoteCard from "../../components/NoteCard";
import { getNotes } from "../../web/appwrite";
import SearchInput from "../../components/SearchInput";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const globalStyles = require("../../constants/GlobalStyles");

const Notes = () => {
  const [sortedBy, setSortedBy] = useState("$createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { user } = useGlobalContext();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getNotes(user.$id, sortedBy);
      setData(response);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortedBy]);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
        <>
          <View>
            <ListHeader
              title="Мои заметки"
              handleSort={(value) => setSortedBy(value)}
              handleCreate={() => router.push("/createNote")}
              handleReturnPress={() => {
                router.push("/home");
              }}
            />
            <FlatList
              data={data}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <NoteCard item={item} />}
              ListEmptyComponent={() => (
                <Text style={[globalStyles.description, { marginTop: 100 }]}>
                  Заметок еще нет...
                </Text>
              )}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => <SearchInput searchDirectory='/search-notes'/>}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Notes;

const styles = StyleSheet.create({});
