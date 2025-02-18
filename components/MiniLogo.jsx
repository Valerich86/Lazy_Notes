import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const MiniLogo = ({anotherStyles}) => {
  return (
    <View style={[styles.back, anotherStyles ? (JSON.parse(anotherStyles)) : {}]}>
      <Image source={require('../assets/images/app-minilogo.png')}
      resizeMode="contain" style={{width: 100, height: 50}}/>
    </View>
  )
}

export default MiniLogo

const styles = StyleSheet.create({
  back: {
    borderRadius: 50,
    backgroundColor: 'azure',
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})