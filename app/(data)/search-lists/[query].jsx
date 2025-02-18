import { StyleSheet, Text, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import ListCard from "../../../components/ListCard";
import { searchLists } from "../../../web/appwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import SearchInput from "../../../components/SearchInput";

const globalStyles = require("../../../constants/GlobalStyles");

const Search = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await searchLists(user.$id, query);
      setData(response);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={{ marginTop: 30 }}>
        <Header />
      </View>
      <View style={{ marginBottom: 30 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <ListCard item={item} />}
          ListEmptyComponent={() => (
            <Text style={[globalStyles.description, { marginTop: 100 }]}>
              Не найдено...
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ marginTop: 10 }}>
              <SearchInput initialQuery={query} searchDirectory='/search-lists'/>
              <Text style={globalStyles.description}>
                Результаты поиска по запросу
              </Text>
              <Text style={{ fontStyle: "italic" }}>"{query}...":</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
