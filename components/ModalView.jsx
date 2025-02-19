import { StyleSheet, Text, View, Modal, 
  TouchableOpacity, TextInput } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import Entypo from "@expo/vector-icons/Entypo";

const ModalView = ({
    isRemove, 
    modalVisible, 
    setModalVisible, 
    handleAgreePress, 
    newElement, 
    setNewElement, 
  }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {setNewElement && (
                <TextInput
                  style={styles.modalInput}
                  value={newElement}
                  onChangeText={(e) => setNewElement(e)}
                  cursorColor={"gray"}
                  multiline={true}
                  autoFocus={true}
                />)}
              {isRemove && (
                <Text style={{ textAlign: "center", fontSize: 25 }}>
                  Вы уверены?
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Entypo name="back" size={40} color="gray" />
                </TouchableOpacity>
                <CustomButton
                  containerStyles={!isRemove ? "{width: '45%'}" : "{width: '45%', backgroundColor: 'red'}"}
                  title="Готово"
                  handlePress={handleAgreePress}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 3,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: "80%",
  },
  modalInput: {
    width: "100%",
    height: 60,
    backgroundColor: "#c2c6c7",
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: "black",
    opacity: 0.5,
  },
});
