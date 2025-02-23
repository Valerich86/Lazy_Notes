import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { Colors } from "../constants/Colors";
import ModalView from "./ModalView"
import CustomButton from "./CustomButton";

const TodoCard = ({ item, handleDeletePress }) => {
  let bgColor, borderColor;
  const [daysToDone, setDaysToDone] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  
  const getDaysToDone = async () => {
    let result = Math.round((new Date(item.completeBefore) - new Date()) / (1000 * 60 * 60 * 24)) + 1;
    setDaysToDone(result)
  }

  useEffect(() => {
    getDaysToDone();
  }, [])

  if (daysToDone < 0){
    bgColor = Colors.redLight;
    borderColor = "red";
  } else if (daysToDone > 0){
    bgColor = 'white';
    borderColor = "black";
  } else {
    bgColor = '#fde2cf';
    borderColor = "orange";
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            borderColor: borderColor,
            backgroundColor: bgColor,
          },
        ]}
      >
        {daysToDone < 0 && (
          <Text style={[styles.text2, {fontSize: 20, color: 'red'}]}>Истек срок выполнения!</Text>
        )}
        {daysToDone == 0 && (
          <Text style={[styles.text2, {fontSize: 20, color: 'red'}]}>Срок выполнения истекает сегодня!</Text>
        )}
        <Text style={styles.text} numberOfLines={1}>
          Выполнить до: {''}  
          <Text style={[styles.text2, {fontSize: 20}]}>
            {item.completeBefore.toLocaleString().substring(0, 10)}
            <Text style={styles.text}> (осталось дней: {daysToDone})</Text>
          </Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Приоритет: <Text style={styles.text2}>{item.priority}
            <Text style={{color: 'red', fontSize: 30}}>{item.priority === 'Высокий' ? ' !!!' : ''}</Text>
          </Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Категория: <Text style={styles.text2}>{item.category}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Создано:{" "}
          <Text style={styles.text2}>
            {new Date(item.$createdAt).toLocaleString()}
          </Text>
        </Text>
        <View style={[styles.separator, {borderColor: borderColor}]}></View>
        <Text style={styles.text3} numberOfLines={20}>
          {item.text}
        </Text>
        <CustomButton
          title = 'Выполнить'
          handlePress = {() => setModalVisible(true)}
          containerStyles = "{width: '30%'}"
          textStyles = "{fontSize: 20}"
        />
        <ModalView
          isRemove = {true}
          modalVisible = {modalVisible}
          setModalVisible = {setModalVisible}
          handleAgreePress = {() => handleDeletePress(item.$id)}
        />
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  card: {
    width: "100%",
    borderWidth: 3,
    borderTopWidth: 10,
    padding: 5,
    elevation: 10,
  },
  text2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    fontSize: 10,
    marginTop: 10,
  },
  text3: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'italic'
  },
  separator: {
    height: 2,
    borderWidth: 1,
    width: "100%",
  },
});
