import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import { Link } from 'expo-router';

const globalStyles = require('../../constants/GlobalStyles')

const Create = () => {
  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <Link href="/createTodo">
          <MaterialIcons name="add-task" size={70} color="#6ca587" />
          <Text style={globalStyles.header}>Добавить дело</Text>
        </Link>
        <Link href="/createNote">
          <Text style={globalStyles.header}>Добавить заметку</Text>
          <MaterialCommunityIcons name="note-plus" size={70} color="#6ca587" />
        </Link>
        <Link href="/createList">
          <MaterialIcons name="playlist-add" size={90} color="#6ca587" />
          <Text style={globalStyles.header}>Добавить список</Text>
        </Link>
        <Link href="/addPhoto">
          <Text style={globalStyles.header}>Добавить фото</Text>
          <MaterialIcons name="add-photo-alternate" size={80} color="#6ca587" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

export default Create

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "90%",
    justifyContent: "space-around",
  },
})