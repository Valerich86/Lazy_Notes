import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Colors } from '../constants/Colors'

const FormField = ({title, subtitle, value, placeholder, handleChangeText, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.inputField}>
        <TextInput style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          onChangeText={handleChangeText}
          cursorColor={'gray'}
          secureTextEntry={title === 'Пароль' && !showPassword}
        />
        {title === 'Пароль' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}>
            {showPassword && (
              <FontAwesome name="eye" size={24} />
            )}
            {!showPassword && (
              <FontAwesome name="eye-slash" size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  subtitle: {
    marginBottom: 5,
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