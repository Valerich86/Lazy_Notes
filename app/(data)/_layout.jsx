import { StyleSheet } from 'react-native'
import {Stack} from 'expo-router'
import React from 'react'

const DataLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='notes' options={{headerShown: false}}/>
        <Stack.Screen name='lists' options={{headerShown: false}}/>
        <Stack.Screen name='photos' options={{headerShown: false}}/>
        <Stack.Screen name='todos' options={{headerShown: false}}/>
        <Stack.Screen name='search-notes/[query]' options={{headerShown: false}}/> 
        <Stack.Screen name='get-note/[note]' options={{headerShown: false}}/> 
        <Stack.Screen name='update-note/[note]' options={{headerShown: false}}/> 
        <Stack.Screen name='createNote' options={{headerShown: false}}/> 
        <Stack.Screen name='search-lists/[query]' options={{headerShown: false}}/> 
        <Stack.Screen name='get-list/[list]' options={{headerShown: false}}/> 
        <Stack.Screen name='createList' options={{headerShown: false}}/> 
        <Stack.Screen name='search-photos/[query]' options={{headerShown: false}}/> 
        <Stack.Screen name='get-photo/[photo]' options={{headerShown: false}}/> 
        <Stack.Screen name='addPhoto' options={{headerShown: false}}/> 
        <Stack.Screen name='createTodo' options={{headerShown: false}}/> 
      </Stack>
    </>
  )
}

export default DataLayout

const styles = StyleSheet.create({})