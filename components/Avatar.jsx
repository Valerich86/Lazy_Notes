import { StyleSheet, Text, View,  } from 'react-native'

const colors = [ '#2f1efc', '#a31efc', '#fc1ee8', '#fc521f', '#1ee3fc', '#1efcae', '#21fc1e', '#fcb61e' ];
const randIndex = Math.floor(Math.random() * colors.length);

const Avatar = ({username, size}) => {
  const initials = username.split(' ')
  let result
  (initials.length == 1) 
  ? result = initials[0][0].toUpperCase() + initials[0][1]
  : result = initials[0][0].toUpperCase() + initials[1][0].toUpperCase()
  
  return (
    <View style={[styles.container, {borderWidth: size/20}]}>
      <View style={[styles.avatar, {backgroundColor: colors[randIndex], width: size, height: size}]}>
        <Text style={[styles.initials, {fontSize: size/2}]}>{result}</Text>
      </View>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    borderColor: 'orange',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    color: 'white',
  }
})