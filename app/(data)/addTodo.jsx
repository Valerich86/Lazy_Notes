import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import CustomDropdown from "../../components/CustomDropdown";
import CustomButton from "../../components/CustomButton";
import {
  createTodo,
  getAllDatesWithTodos,
  getDatesWithHighPriorityTodos,
} from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import { categories, priorities } from "../../constants/Categories";
import CustomCalendar from "../../components/CustomCalendar";

const globalStyles = require("../../constants/GlobalStyles");

const AddTodo = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allDatesWithTodos, setAllDatesWithTodos] = useState([]);
  const [datesWithHighPriorityTodos, setDatesWithHighPriorityTodos] = useState(
    []
  );
  const [priority, setPriority] = useState(priorities[0]);
  const [category, setCategory] = useState(categories[0]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [text, setText] = useState("");
  const [completeBefore, setCompleteBefore] = useState(new Date());

  const getDataForCalendar = async () => {
    try {
      const allDates = await getAllDatesWithTodos(user.$id);
      setAllDatesWithTodos(allDates);
      const highPriority = await getDatesWithHighPriorityTodos(user.$id);
      setDatesWithHighPriorityTodos(highPriority);
    } catch (error) {
      Alert.alert("getDataForCalendar", error.message);
    }
  };

  useEffect(() => {
    getDataForCalendar();
  }, []);

  const handleFormSubmit = async () => {
    if (text === "") {
      return Alert.alert("Нужно записать текст задачи");
    }
    setIsSubmitting(true);
    try {
      await createTodo(user.$id, priority, category, text, completeBefore);
      router.push("/todos");
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setPriority(priorities[0]);
      setCategory(categories[0]);
      setText("");
      setCompleteBefore(new Date());
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ minHeight: "90%", minWidth: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.push("/todos")}>
            <Entypo name="back" size={40} color="gray" />
          </TouchableOpacity>
          <Text style={globalStyles.header}> Новая задача </Text>
          <TouchableOpacity
            onPress={() => {
              setPriority(priorities[0]);
              setCategory(categories[0]);
              setText("");
              setCompleteBefore(new Date());
            }}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <CustomDropdown
            title="Приоритет"
            items={priorities}
            initValue={priority}
            onChange={(e) => setPriority(e)}
          />
          <CustomDropdown
            title="Категория"
            items={categories}
            initValue={category}
            onChange={(e) => setCategory(e)}
          />
          <Text style={styles.text}>Текст</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              value={text}
              placeholderTextColor={Colors.placeholder}
              onChangeText={(e) => setText(e)}
              cursorColor={"gray"}
              multiline={true}
            />
          </View>
          <Text style={styles.text}>Выполнить до: </Text>
          <View style={styles.dateChange}>
            <Text style={{ fontSize: 20 }}>
              {new Date(completeBefore).toLocaleString().substring(0, 10)}
            </Text>
            <TouchableOpacity onPress={() => setCalendarVisible(true)}>
              <EvilIcons name="calendar" size={70} color="green" />
            </TouchableOpacity>
          </View>
          <CustomCalendar
            onDaySelect={(d) => setCompleteBefore(d)}
            calendarVisible={calendarVisible}
            setCalendarVisible={setCalendarVisible}
            allDatesWithTodos={allDatesWithTodos}
            datesWithHighPriorityTodos={datesWithHighPriorityTodos}
          />
          <CustomButton
            containerStyles="{marginTop: 45, width: '100%'}"
            title="Сохранить"
            handlePress={handleFormSubmit}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  bottomBlock: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorPicker: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  inputField: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#c2c6c7",
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: "black",
    opacity: 0.5,
  },
  input: {
    fontSize: 15,
  },
  dateChange: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
