import { StyleSheet, Text, View, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomDropdown = ({title, items, initValue, onChange}) => {
  const [currentValue, setCurrentValue] = useState(initValue)
  const [currentList, setCurrentList] = useState(items)
  const [closed, setClosed] = useState(true)

  const replaceItems = (el) => { 
    let list = currentList;
    let currentIndex = list.indexOf(el);
    var removed = list.splice(currentIndex, 1);
    list.unshift(removed[0]);
    setCurrentList(list)
  }

  const DropDownItem = ({el}) => {
    return(
      <Pressable 
        style={styles.item}
        onPress={() => {
          replaceItems(el);
          setCurrentValue(el);
          setClosed(true);
          onChange(el);
        }}
        >
        <Text style={[styles.itemText, el === currentValue ? styles.itemSelected : {}]}>{el}</Text>
      </Pressable>
    )
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {closed && (
          <TouchableOpacity 
            style={{
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10
            }}
            onPress={() => {setClosed(false)}}
          >
            <Text style={styles.itemSelected}>{currentValue}</Text>
            <Ionicons name="caret-down-sharp" size={24} color="black" />
          </TouchableOpacity>
        )}
        {!closed && (currentList.map((item) => <DropDownItem el={item}/>))}
      </View>
    </View>
  )
}

export default CustomDropdown

const styles = StyleSheet.create({
  title: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    width: '100%',
    backgroundColor: "#c2c6c7",
    opacity: 0.5,
    borderRadius: 5,
    borderBottomWidth: 3,
  },
  item: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    fontSize: 17,
    color: 'gray'
  },
  itemSelected: {
    fontSize: 20,
    color: 'black'
  },
})