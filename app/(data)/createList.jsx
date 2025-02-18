import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { createList } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const globalStyles = require("../../constants/GlobalStyles");

const CreateList = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("");
  const [array, setArray] = useState([])
  const [newElement, setNewElement] = useState('')
  const [currentElement, setCurrentElement] = useState('')
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const [form, setform] = useState({
    title: "Новый список",
    color: "black",
  });

  let counter = 1;
  let list = []

  const updateElements = (act) => {
    let newArray = array
    if (act === 'add'){
      if (newElement === '') return
      newArray.push(newElement)
      setAddModalVisible(false)
    }
    if (act === 'remove'){
      newArray.splice(newArray.indexOf(currentElement), 1)
      setRemoveModalVisible(false)
    }
    setArray(newArray)
    setNewElement('')
  }

  const handleFormSubmit = async () => {
    if (array == []) {
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
      setArray([])
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
          <TouchableOpacity onPress={() => router.push('/lists')}>
            <Entypo name="back" size={40} color="gray" />
          </TouchableOpacity>
          <Text style={globalStyles.header}> Новый список </Text>
          <TouchableOpacity
            onPress={() => {
              setform({ title: "", color: "" })
              setArray([])
            }}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FormField
            title="Заголовок"
            subtitle='(уникальный заголовок поможет легко отыскать нужный список)'
            value={form.title}
            handleChangeText={(e) => {
              setform({ ...form, title: e });
            }}
          />
          {array != [] && (
            array.map((el) => (
              <View key={counter++} style = {styles.listItem}>
                <Text style={styles.listText}>
                  {`${counter}. `}{el}
                </Text>
                <TouchableOpacity onPress={() => {
                  setCurrentElement(el)
                  setRemoveModalVisible(true)
                }}>
                  <AntDesign name="minuscircle" size={30} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
          <View style={styles.addItemView}>
                <TouchableOpacity onPress={() => setAddModalVisible(true)}>
                  <Ionicons name="add-circle" size={50} color='#6ca587' />
                </TouchableOpacity>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Добавить элемент списка</Text>
              </View>
                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={addModalVisible}
                  onRequestClose={() => {
                    setAddModalVisible(!addModalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={styles.modalInput}
                          value={newElement}
                          onChangeText={(e) => setNewElement(e)}
                          cursorColor={'gray'}
                          multiline={true}
                          autoFocus={true}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10}}>
                          <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                            <Entypo name="back" size={40} color="gray" />
                          </TouchableOpacity>
                          <CustomButton 
                            containerStyles = "{width: '45%'}"
                            title = 'Готово'
                            handlePress = {() => updateElements('add')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={removeModalVisible}
                  onRequestClose={() => {
                    setRemoveModalVisible(!removeModalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={{textAlign: 'center', fontSize: 25}}>Вы уверены?</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10}}>
                        <TouchableOpacity onPress={() => setRemoveModalVisible(false)}>
                          <Entypo name="back" size={40} color="gray" />
                        </TouchableOpacity>
                        <CustomButton 
                          containerStyles = "{width: '45%', backgroundColor: 'red'}"
                          title = 'Готово'
                          handlePress = {() => updateElements('remove')}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={{}}>Цвет</Text>
            <View
              style={{
                width: "80%",
                height: 15,
                backgroundColor: colorIndicator,
                borderRadius: 10,
              }}
            ></View>
          </View>
          <View style={styles.colorsBlock}>
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
    </SafeAreaView>
  );
};

export default CreateList;

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
  colorsBlock: {
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
  addItemView: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: '80%'
  },
  modalInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#c2c6c7',
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    opacity: 0.5
  },
  listItem: {
    borderBottomWidth: 1,
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listText: {
    textAlign: "left",
    fontSize: 20,
    width: '90%'
  },
});
