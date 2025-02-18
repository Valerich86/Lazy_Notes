import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Colors } from '../constants/Colors'
import { router } from 'expo-router'

const NoteCard = ({item}) => {
  
  let bgColor

  switch (item.color){
    case 'black':
      bgColor = 'white'
      break
    case 'red':
      bgColor = Colors.redLight
      break
    case 'violet':
      bgColor = Colors.violetLight
      break
    case 'blue':
      bgColor = Colors.blueLight
      break
    case 'green':
      bgColor = Colors.greenLight
      break
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      router.push(`/get-note/${item.$id}`)
    }}>
      <View style={[styles.shadow, {backgroundColor: Colors.shadow}]}></View>
      <View style={[styles.card, {
      borderColor: item.color,
      backgroundColor: bgColor
      }]}>
        <Text >{new Date(item.$createdAt).toLocaleString()}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.text} numberOfLines={10}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NoteCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
  },
  card: {
    width: '70%',
    height: 200,
    borderWidth: 3,
    borderTopWidth: 10,
    padding: 5
  },
  shadow: {
    position: 'absolute',
    width: '70%',
    height: 200,
    top: 5,
    left: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    fontSize: 10,
    marginTop: 10
  }
})