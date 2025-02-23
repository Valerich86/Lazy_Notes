import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomCalendar from "./CustomCalendar";
import { categories } from "../constants/Categories";

const globalStyles = require("../constants/GlobalStyles");

const ListHeader = ({
  title,
  handleSort,
  handleCreate,
  handleReturnPress,
  handleChangeDate,
  handleChangeOption,
  handleCreateTodoPress,
  allDatesWithTodos,
  datesWithHighPriorityTodos,
}) => {
  const [opened, setOpened] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const onSortChange = (sortedBy) => {
    setOpened(false);
    handleSort(sortedBy);
  };

  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useAnimatedValue(screenWidth);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth - 200,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ position: "static" }}>
      <Text style={globalStyles.header}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={handleReturnPress}>
          <Entypo name="back" size={40} color="gray" />
        </TouchableOpacity>
        {!opened && handleSort && (
          <TouchableOpacity onPress={() => setOpened(true)}>
            <FontAwesome name="sort" size={40} color="gray" />
          </TouchableOpacity>
        )}
        {opened && handleSort && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onSortChange("$createdAt")}
            >
              <Text>По времени</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onSortChange("color")}
            >
              <Text>По цвету</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onSortChange("title")}
            >
              <Text>По алфавиту</Text>
            </TouchableOpacity>
          </View>
        )}
        {!handleChangeDate && (
          <TouchableOpacity onPress={handleCreate}>
            <Ionicons name="add-circle" size={50} color="#6ca587" />
          </TouchableOpacity>
        )}
        {handleChangeDate && (
          <>
            <TouchableOpacity onPress={() => setCalendarVisible(true)}>
              <AntDesign name="calendar" size={60} color="#6ca587" />
            </TouchableOpacity>
            {!opened && handleChangeOption && (
              <TouchableOpacity
                onPress={() => {
                  setOpened(true);
                  slideIn();
                }}
              >
                <MaterialIcons name="menu" size={40} color="gray" />
              </TouchableOpacity>
            )}
            {opened && handleChangeOption && (
              <TouchableOpacity
                onPress={() => {
                  setOpened(false);
                  slideOut();
                }}
              >
                <MaterialIcons name="menu-open" size={40} color="gray" />
              </TouchableOpacity>
            )}
            <Animated.View
              style={[
                styles.menuModal,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <View style={styles.menu}>
              <TouchableOpacity
                  style={[styles.menuItem, {backgroundColor: '#6ca587'}]}
                  onPress={handleCreateTodoPress}
                >
                  <Text>Добавить дело</Text>
                </TouchableOpacity>
                <View style={{height: 1, borderTopWidth: 1, borderColor: 'gray', marginTop: 2, marginBottom: 2}}></View>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption('', '', 'Ближайшие дела')}
                >
                  <Text>Ближайшие</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("priority", "Высокий", "Высокий приоритет")}
                >
                  <Text>Высокий приоритет</Text>
                </TouchableOpacity>
                <Text style={{textDecorationLine: 'underline', fontStyle: 'italic', textAlign: 'center'}}>Категории</Text>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[0], `Категория "${categories[0]}"`)}
                >
                  <Text>{categories[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[1], `Категория "${categories[1]}"`)}
                >
                  <Text>{categories[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[2], `Категория "${categories[2]}"`)}
                >
                  <Text>{categories[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[3], `Категория "${categories[3]}"`)}
                >
                  <Text>{categories[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[4], `Категория "${categories[4]}"`)}
                >
                  <Text>{categories[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleChangeOption("category", categories[5], `Категория "${categories[5]}"`)}
                >
                  <Text>{categories[5]}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </>
        )}
        <CustomCalendar
          calendarVisible={calendarVisible}
          setCalendarVisible={setCalendarVisible}
          onDaySelect={(date) => handleChangeDate(date)}
          allDatesWithTodos={allDatesWithTodos}
          datesWithHighPriorityTodos={datesWithHighPriorityTodos}
        />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  menu: {
    flexDirection: "column",
  },
  menuItem: {
    backgroundColor: "#c2c6c7",
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 2,
    padding: 5,
  },
  menuModal: {
    position: "absolute",
    backgroundColor: 'white',
    width: "40%",
    zIndex: 1,
    top: 70,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    elevation: 10
  },
});
