import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, {useState} from 'react'
import { Colors } from '../constants/Colors'
import { router } from 'expo-router'
import SearchInput from './SearchInput'

const globalStyles = require("../constants/GlobalStyles");

const ListCard = ({item}) => {
  
  let bgColor, counter=1, cutList=[]
  
  if (item.list.length > 5){
    for (var i = 0; i < 5; i++){
      cutList.push(item.list[i])
    }
  } else {
    cutList = item.list
  }

  const list = cutList.map(function(el){
    return (
      <Text key={counter++} numberOfLines={1} style={styles.text}>
        {`${counter}. `}{el}
      </Text>
    )
  })

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
      router.push(`/get-list/${item.$id}`)
    }}>
      <View style={[styles.shadow, {backgroundColor: Colors.shadow}]}></View>
      <View style={[styles.card, {
      borderColor: item.color,
      backgroundColor: bgColor,
      overflow: 'hidden'
      }]}>
        <Text >{new Date(item.$createdAt).toLocaleString()}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        {list}
        <Text>...</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListCard

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