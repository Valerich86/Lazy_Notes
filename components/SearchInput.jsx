import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { usePathname, router } from 'expo-router'
import { Colors } from '../constants/Colors'

const SearchInput = ({initialQuery, searchDirectory}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')

  return (
    <View>
      <View style={styles.inputField}>
        <TextInput style={styles.input}
          value={query}
          placeholder='Поиск по заголовку'
          placeholderTextColor={Colors.placeholder}
          onChangeText={(e) => setQuery(e)}
        />
        <TouchableOpacity 
          onPress={() =>{
            if (!query){
              Alert.alert('Введите параметры поиска')
            }
            if (pathname.startsWith({searchDirectory})){
              router.setParams({query})
            }else{
              router.push(`${searchDirectory}/${query}`)
            }
          }} 
          style={styles.icon}
        >
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15
  },
  inputField: {
    width: '100%',
    height: 50,
    backgroundColor: '#c2c6c7',
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    opacity: 0.5
  },
  input: {
    fontSize: 15
  },
  icon: {
    marginTop: -35,
    marginLeft: '90%'
  }
})