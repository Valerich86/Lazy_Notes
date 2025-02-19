import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Touchable,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { createNote } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo'
import ColorChangeInput from "../../components/ColorChangeInput";

const globalStyles = require("../../constants/GlobalStyles");

const CreateNote = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("");

  const [form, setform] = useState({
    title: "Новая заметка",
    text: "",
    color: "black",
  });

  const handleFormSubmit = async () => {
    if (form.text === "") {
      return Alert.alert("Нужно записать текст заметки");
    }
    setIsSubmitting(true);
    try {
      await createNote({ ...form, userId: user.$id });
      router.push("/notes");
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setform({
        title: "Новая заметка",
        text: "",
        color: "black",
      });
    }
  };

  const colorChangeSubmit = (e) => {
    setform({ ...form, color: e });
    setColorIndicator(e);
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
          <Text style={globalStyles.header}> Новая заметка </Text>
          <TouchableOpacity
            onPress={() => setform({ title: "", text: "", color: "" })}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FormField
            title="Заголовок"
            subtitle='(уникальный заголовок поможет легко отыскать нужную заметку)'
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
            />
          </View>
          <ColorChangeInput colorChangeSubmit={colorChangeSubmit} colorIndicator={colorIndicator}/>
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

export default CreateNote;

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
