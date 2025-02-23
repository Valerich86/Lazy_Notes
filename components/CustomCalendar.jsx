import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, View, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useGlobalContext } from "../context/GlobalProvider";
import { getTodos } from "../web/appwrite";

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = "ru";

export default function CustomCalendar({
  onDaySelect,
  calendarVisible,
  setCalendarVisible,
  allDatesWithTodos,
  datesWithHighPriorityTodos
}) {
  const {user} = useGlobalContext();
  const initDate = new Date().toString();
  const [selected, setSelected] = useState(initDate);

  const getMarked = () => {
    let marked = {};
    if (allDatesWithTodos){
      for (let i = 0; i < allDatesWithTodos.length; i++) {
        marked[allDatesWithTodos[i]] = { marked: true, dotColor: "green" };
      }
      for (let i = 0; i < datesWithHighPriorityTodos.length; i++) {
        marked[datesWithHighPriorityTodos[i]] = { marked: true, dotColor: "red" };
      }
    }
    marked[selected] = {
      selected: true,
      selectedColor: "#222222",
      selectedTextColor: "yellow",
    };
    return marked;
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarVisible}
        onRequestClose={() => {
          setCalendarVisible(!calendarVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 10}}>
            <View style={styles.description}>
              <View style={[styles.mark, {backgroundColor: 'green'}]}></View>
              <Text style={styles.text}>есть задачи</Text>
            </View>
            <View style={styles.description}>
              <View style={[styles.mark, {backgroundColor: 'red'}]}></View>
              <Text style={styles.text}>есть задачи с высоким приоритетом</Text>
            </View>
            </View>
            <Calendar
              style={{
                borderRadius: 5,
                elevation: 5,
              }}
              initialDate={initDate}
              markedDates={getMarked()}
              onDayPress={(day) => {
                setSelected(day.dateString);
                onDaySelect(day);
                setCalendarVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#1c1d1d",
    borderRadius: 20,
    borderWidth: 3,
    padding: 5,
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
  description: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mark: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 10
  },
  text: {
    color: 'white'
  }
});
