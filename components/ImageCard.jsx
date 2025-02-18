import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { Colors } from '../constants/Colors'
import { router } from 'expo-router'

const ImageCard = ({item}) => {
  
  let bgColor, title

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
      router.push(`/get-photo/${item.$id}`)
    }}>
      <View style={[styles.shadow, {backgroundColor: Colors.shadow}]}></View>
      <View style={[styles.card, {
      borderColor: item.color,
      backgroundColor: bgColor
      }]}>
        <Text >{new Date(item.$createdAt).toLocaleString()}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Image source={{uri: item.image}} resizeMode='cover'
         style={styles.photo}/>
      </View>
    </TouchableOpacity>
  )
}

export default ImageCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
  },
  card: {
    width: '98%',
    height: 300,
    borderWidth: 3,
    borderTopWidth: 10,
    padding: 5
  },
  shadow: {
    position: 'absolute',
    width: '98%',
    height: 300,
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
  },
  photo: {
    height: 220, 
    borderRadius: 10, 
    marginTop: 10, 
    borderWidth: 1,
  }
})