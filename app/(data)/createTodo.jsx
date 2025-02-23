import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { addTodo } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import { categories } from "../../constants/Categories";
import { Dropdown } from "react-native-material-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo'
import CustomCalendar from "../../components/CustomCalendar";

const globalStyles = require("../../constants/GlobalStyles");

const CreateTodo = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date().toLocaleString().substring(0, 10)

  const [form, setform] = useState({
    priority: "Низкий",
    text: "",
    category: categories[0],
    completeBefore: today
  });

  const handleFormSubmit = async () => {
    if (form.text === "") {
      return Alert.alert("Нужно записать текст задачи");
    }
    setIsSubmitting(true);
    try {
      await addTodo({ ...form, userId: user.$id });
      router.push("/todos");
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setform({
        priority: "Низкий",
        text: "",
        category: categories[0],
        completeBefore: today
      });
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
          <TouchableOpacity onPress={() => router.push('/notes')}>
            <Entypo name="back" size={40} color="gray" />
          </TouchableOpacity>
          <Text style={globalStyles.header}> Новая задача </Text>
          <TouchableOpacity
            onPress={() => setform({
              priority: "Низкий",
              text: "",
              category: categories[0],
              completeBefore: today
            })}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Приоритет</Text>
          <Dropdown/>
          <Text style={styles.text}>Текст</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              value={form.text}
              placeholderTextColor={Colors.placeholder}
              onChangeText={(e) => {
                setform({ ...form, text: e });
              }}
              cursorColor={"gray"}
              multiline={true}
            />
          </View>
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

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold'
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
});
