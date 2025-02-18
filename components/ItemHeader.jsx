import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { router } from 'expo-router'
import React, {useState} from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomButton from './CustomButton'

const ItemHeader = ({handleUpdatePress, handleReturnPress, handleDeletePress}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{position: 'static', width: '100%'}}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{textAlign: 'center', fontSize: 25}}>Вы уверены?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <CustomButton 
                containerStyles = "{marginTop: 25, width: '45%'}"
                title = 'Отмена'
                handlePress = {() => setModalVisible(false)}
              />
              <CustomButton 
                containerStyles = "{marginTop: 25, width: '45%', backgroundColor: 'red'}"
                title = 'Удалить'
                handlePress = {handleDeletePress}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleReturnPress}>
          <Entypo name="back" size={40} color="gray" />
        </TouchableOpacity>
        {handleUpdatePress && (
          <TouchableOpacity onPress={handleUpdatePress}>
            <Entypo name="pencil" size={40} color="#6ca587" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="delete-forever" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%'
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
})