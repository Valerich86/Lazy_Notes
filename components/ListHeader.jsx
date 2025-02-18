import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {router} from 'expo-router'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Entypo from '@expo/vector-icons/Entypo'

const globalStyles = require('../constants/GlobalStyles')

const ListHeader = ({title, handleSort, handleCreate, handleReturnPress}) => {
  const [opened, setOpened] = useState(false)

  const onSortChange = (sortedBy) => {
    setOpened(false)
    handleSort(sortedBy)
  }

  return (
    <View style={{position: 'static'}}>
      <Text style={globalStyles.header}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10}}>
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
            <TouchableOpacity style={styles.menuItem} onPress={() => onSortChange('$createdAt')}>
              <Text>По времени</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSortChange('color')}>
              <Text>По цвету</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSortChange('title')}>
              <Text>По алфавиту</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleCreate}>
          <Ionicons name="add-circle" size={50} color='#6ca587' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ListHeader

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'column',
  },
  menuItem: {
    backgroundColor: '#c2c6c7',
    opacity: 0.5,
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 2,
    padding: 5,
  }
})