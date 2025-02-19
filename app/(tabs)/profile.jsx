import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../../components/Header';
import { useGlobalContext } from '../../context/GlobalProvider';
import Avatar from '../../components/Avatar';
import { signOut, getNotes, getLists, getImages } from '../../web/appwrite';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router, Link } from 'expo-router';
import ModalView from '../../components/ModalView';

const globalStyles = require('../../constants/GlobalStyles')

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const [isLoading, setIsLoading] = useState(true);
  const [sortedBy, setSortedBy] = useState("$createdAt");
  const [notes, setNotes] = useState(0)
  const [lists, setLists] = useState(0)
  const [photos, setPhotos] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  const logout = async () => {
    await signOut()
    setModalVisible(false)
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/')
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const notes = await getNotes(user.$id, sortedBy);
      setNotes(notes?.length || 0);
      const lists = await getLists(user.$id, sortedBy);
      setLists(lists?.length || 0);
      const photos = await getImages(user.$id, sortedBy);
      setPhotos(photos?.length || 0);
    } catch (error) {
      Alert.alert("fetchData", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {isLoading && <ActivityIndicator color={"blue"} size={"large"} />}
      {!isLoading && (
      <>
        <Header />
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}> 
            <Avatar username={user.username} size={100}/>
            <Text style={globalStyles.header}>{user.username}</Text>
          </View>
          <View style={{justifyContent: 'flex-start'}}>
            <Link href={'/notes'}>
              <Text style={styles.text}>{`Заметки: ${notes}`}</Text>
            </Link>
            <Link href={'/lists'} style={{marginTop: 20}}>
              <Text style={styles.text}>{`Списки: ${lists}`}</Text>
            </Link>
            <Link href={'/photos'} style={{marginTop: 20}}>
              <Text style={styles.text}>{`Изображения: ${photos}`}</Text>
            </Link>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="logout" size={40} color="red" />
            <Text style={styles.text2}>Выйти из профиля</Text>
          </TouchableOpacity>
          <ModalView
            isRemove={true}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleAgreePress={logout}
          />
        </View>
      </>)}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "90%",
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#6ca587'
  },
  text2: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'red',
    fontStyle: 'italic'
  }
})