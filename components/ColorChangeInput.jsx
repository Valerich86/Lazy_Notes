import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const ColorChangeInput = ({colorChangeSubmit, colorIndicator}) => {
  
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={{fontWeight: 'bold'}}>Цвет</Text>
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
    </View>
  )
}

export default ColorChangeInput

const styles = StyleSheet.create({
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
})