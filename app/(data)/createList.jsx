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
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { createList } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ColorChangeInput from "../../components/ColorChangeInput";
import ModalView from "../../components/ModalView";

const globalStyles = require("../../constants/GlobalStyles");

const CreateList = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("");
  const [array, setArray] = useState([]);
  const [newElement, setNewElement] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const [form, setform] = useState({
    title: "Новый список",
    color: "black",
  });

  let counter = 1;
  let list = [];

  const updateElements = (act) => {
    let newArray = array;
    if (act === "add") {
      if (newElement === "") return;
      newArray.push(newElement);
      setAddModalVisible(false);
    }
    if (act === "remove") {
      newArray.splice(newArray.indexOf(currentElement), 1);
      setRemoveModalVisible(false);
    }
    setArray(newArray);
    setNewElement("");
  };

  const handleFormSubmit = async () => {
    if (array.length == 0) {
      return Alert.alert("Нужно добавить список");
    }
    setIsSubmitting(true);
    try {
      await createList({ ...form, userId: user.$id, list: array });
      router.push("/lists");
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setform({
        title: "Новый список",
        color: "black",
      });
      setArray([]);
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
          <TouchableOpacity onPress={() => router.push("/lists")}>
            <Entypo name="back" size={40} color="gray" />
          </TouchableOpacity>
          <Text style={globalStyles.header}> Новый список </Text>
          <TouchableOpacity
            onPress={() => {
              setform({ title: "", color: "" });
              setArray([]);
            }}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FormField
            title="Заголовок"
            subtitle="(уникальный заголовок поможет легко отыскать нужный список)"
            value={form.title}
            handleChangeText={(e) => {
              setform({ ...form, title: e });
            }}
          />
          {array != [] &&
            array.map((el) => (
              <View key={counter++} style={styles.listItem}>
                <Text style={styles.listText}>
                  {`${counter}. `}
                  {el}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentElement(el);
                    setRemoveModalVisible(true);
                  }}
                >
                  <AntDesign name="minuscircle" size={30} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          <View style={styles.addItemView}>
            <TouchableOpacity onPress={() => setAddModalVisible(true)}>
              <Ionicons name="add-circle" size={50} color="#6ca587" />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Добавить элемент списка
            </Text>
          </View>
          <ModalView
            isRemove={false}
            modalVisible={addModalVisible}
            setModalVisible={setAddModalVisible}
            handleAgreePress={() => updateElements("add")}
            newElement={newElement}
            setNewElement={setNewElement}
          />
          <ModalView
            isRemove={true}
            modalVisible={removeModalVisible}
            setModalVisible={setRemoveModalVisible}
            handleAgreePress={() => updateElements("remove")}
          />
          <ColorChangeInput
            colorChangeSubmit={colorChangeSubmit}
            colorIndicator={colorIndicator}
          />
          <CustomButton
            containerStyles="{marginTop: 45, width: '100%'}"
            title="Сохранить"
            handlePress={handleFormSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  addItemView: {
    flexDirection: "row",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listItem: {
    borderBottomWidth: 1,
    minHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listText: {
    textAlign: "left",
    fontSize: 20,
    width: "90%",
  },
});
