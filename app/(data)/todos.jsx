import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../components/ListHeader";
import TodoCard from "../../components/TodoCard";
import { getTodos, deleteTodo, getAllDatesWithTodos, getDatesWithHighPriorityTodos } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const globalStyles = require("../../constants/GlobalStyles");

const Todos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [header, setHeader] = useState('Ближайшие дела')
  const [atribut, setAtribut] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState(null);
  const [allDatesWithTodos, setAllDatesWithTodos] = useState([]);
  const [datesWithHighPriorityTodos, setDatesWithHighPriorityTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  const { user } = useGlobalContext();

  const handleDeletePress = async (itemId) => {
    try {
      await deleteTodo(itemId);
      setUpdate(!update)
    } catch (error) {
      Alert.alert("handleDeletePress", error.message);
    }
  };

  const getDataForCalendar = async () => {
    try {
      const allDates = await getAllDatesWithTodos(user.$id);
      setAllDatesWithTodos(allDates)
      const highPriority = await getDatesWithHighPriorityTodos(user.$id)
      setDatesWithHighPriorityTodos(highPriority)
    } catch (error) {
      Alert.alert("fetchData", error.message);
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getTodos(user.$id, atribut, value);
      setData(response);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    getDataForCalendar();
  }, [value, update]);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
          <View style={{width: '100%', paddingTop: 50, paddingBottom: 50}}>
            <ListHeader
              title={header}
              handleReturnPress={() => {
                router.push("/home");
              }}
              handleChangeDate={(date) => {
                setHeader(`Выполнить до ${date}`)
                setAtribut('completeBefore');
                setValue(date);
              }}
              handleChangeOption={(atr, val, title) => {
                setHeader(title)
                setAtribut(atr);
                setValue(val);
              }}
              handleCreateTodoPress={() => router.push('/addTodo')}
              allDatesWithTodos={allDatesWithTodos}
              datesWithHighPriorityTodos={datesWithHighPriorityTodos}
            />
            <FlatList
              data={data}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => 
                <TodoCard item={item} 
                handleDeletePress={(id) => handleDeletePress(id)} 
                />}
              ListEmptyComponent={() => (
                <Text style={[globalStyles.description, { marginTop: 100 }]}>
                  Не найдено...
                </Text>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
      )}
    </SafeAreaView>
  );
};

export default Todos;

