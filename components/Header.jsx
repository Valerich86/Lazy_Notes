import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MiniLogo from './MiniLogo'
import Avatar from './Avatar'
import { useGlobalContext } from '../context/GlobalProvider'
import { Colors } from '../constants/Colors'

const Header = () => {
  const { user } = useGlobalContext()

  return (
    <>{user && (
      <View style={[styles.container, {borderBottomColor: Colors.separator}]}>
      <MiniLogo/>
      <Avatar size={50} username={user.username}/>
    </View>
    )}</>
  )
}

export default Header

const styles = StyleSheet.create({ 
  container: {
    position: 'static',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    height: 65,
    alignItems: 'center', 
    borderBottomWidth: 1
  }
})