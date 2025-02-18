import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getList, deleteList, updateCrossedOut, updateList } from "../../../web/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import ItemHeader from "../../../components/ItemHeader";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "../../../components/CustomButton";
import Entypo from '@expo/vector-icons/Entypo'

const globalStyles = require("../../../constants/GlobalStyles");

const List = () => {
  const { list } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newElement, setNewElement] = useState('')

  let counter = 1

  const updateCrossedOutElements = async (e, act) => {
    setIsLoading(true);
    const crossedOut = data.crossedOut
    if (act === 'add')
      crossedOut.push(e)
    if (act === 'remove'){
      crossedOut.splice(crossedOut.indexOf(e), 1)
    }
    try {
      await updateCrossedOut(list, crossedOut);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const addNewElement = async () => {
    if (newElement === '') return
    setIsLoading(true);
    let newList = data.list
    newList.push(newElement)
    try {
      await updateList(list, newList);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setModalVisible(false)
      setNewElement('')
      setIsLoading(false);
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getList(list);
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

  const handleDeletePress = async () => {
    try {
      await deleteList(list);
      router.push("/lists");
    } catch (error) {
      Alert.alert("fetchData", error.message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
        <View>
          <ItemHeader
            handleReturnPress={() => router.push("/lists")}
            handleDeletePress={handleDeletePress}
          />
          <ScrollView
            contentContainerStyle={{ minHeight: "90%" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.container, { borderColor: data.color }]}>
              <View
                style={[styles.colorIndicator, { backgroundColor: data.color }]}
              ></View>
              <View style={{padding: 5}}>
                <Text style={styles.date}>
                  {new Date(data.$createdAt).toLocaleString()}
                </Text>
                {data.title && <Text style={styles.title}>{data.title}</Text>}
                {data.list.map((el) => (
                  <View key={counter++} style = {styles.listItem}>
                    <Text style={[styles.text, (data.crossedOut.indexOf(el, 0) != -1 && {textDecorationLine: 'line-through', opacity: 0.5, color: 'gray'})]}>
                      {`${counter}. `}{el}
                    </Text>
                    {data.crossedOut.indexOf(el, 0) == -1 && (
                      <TouchableOpacity onPress={() => updateCrossedOutElements(el, 'add')}>
                        <AntDesign name="minuscircle" size={30} color="red" />
                      </TouchableOpacity>
                    )}
                    {data.crossedOut.indexOf(el, 0) != -1 && (
                      <TouchableOpacity onPress={() => updateCrossedOutElements(el, 'remove')}>
                        <Ionicons name="add-circle" size={37} color='#6ca587' />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Ionicons name="add-circle" size={50} color='#6ca587' />
                </TouchableOpacity>
              </View>
                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={styles.modalInput}
                          value={newElement}
                          onChangeText={(e) => setNewElement(e)}
                          cursorColor={'gray'}
                          multiline={true}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10}}>
                          <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Entypo name="back" size={40} color="gray" />
                          </TouchableOpacity>
                          <CustomButton 
                            containerStyles = "{width: '45%'}"
                            title = 'Готово'
                            handlePress = {addNewElement}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 3,
    minHeight: 200,
    backgroundColor: "white",
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    width: '90%'
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10
  },
  date: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
  },
  colorIndicator: {
    width: "100%",
    height: 20,
  },
  listItem: {
    borderBottomWidth: 1,
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomView: {
    height: 80,
    justifyContent: 'center',
    padding: 5
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
  }
});
