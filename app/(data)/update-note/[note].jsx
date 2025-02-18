import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";
import { useLocalSearchParams, router } from "expo-router";
import { getNote, updateNote } from "../../../web/appwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo'

const globalStyles = require("../../../constants/GlobalStyles");

const UpdateNote = () => {
  const { note } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("");

  const [form, setform] = useState({
    title: "",
    text: "",
    color: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getNote(note);
      setform(response);
      setColorIndicator(response.color);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    if (form.text === "" || !form.color) {
      return Alert.alert("Заполнены не все поля");
    }
    setIsSubmitting(true);
    try {
      await updateNote(form, note);
      router.push(`/get-note/${note}`);
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setform({
        title: "",
        text: "",
        color: "",
      });
    }
  };

  const colorChangeSubmit = (e) => {
    setform({ ...form, color: e });
    setColorIndicator(e);
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
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
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="back" size={40} color="gray" />
            </TouchableOpacity>
            <Text style={globalStyles.header}> Редактирование </Text>
            <TouchableOpacity
              onPress={() => setform({ title: "", text: "", color: "" })}
            >
              <MaterialIcons name="cleaning-services" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <FormField
              title="Заголовок (не обязательно)"
              value={form.title}
              handleChangeText={(e) => {
                setform({ ...form, title: e });
              }}
            />
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
                autoFocus={true}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text>Цвет</Text>
              <View
                style={{
                  width: "80%",
                  height: 15,
                  backgroundColor: colorIndicator,
                  borderRadius: 10,
                }}
              ></View>
            </View>
            <View style={styles.bottomBlock}>
              <TouchableOpacity onPress={() => colorChangeSubmit("red")}>
                <View
                  style={[styles.colorPicker, { backgroundColor: "red" }]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => colorChangeSubmit("violet")}>
                <View
                  style={[styles.colorPicker, { backgroundColor: "violet" }]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => colorChangeSubmit("green")}>
                <View
                  style={[styles.colorPicker, { backgroundColor: "green" }]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => colorChangeSubmit("blue")}>
                <View
                  style={[styles.colorPicker, { backgroundColor: "blue" }]}
                ></View>
              </TouchableOpacity>
            </View>
            <CustomButton
              containerStyles="{marginTop: 45, width: '100%'}"
              title="Сохранить"
              handlePress={handleFormSubmit}
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UpdateNote;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15,
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
