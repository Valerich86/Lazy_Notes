import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { setImage } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const globalStyles = require("../../constants/GlobalStyles");

const AddPhoto = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("");

  const [form, setForm] = useState({
    title: "Новое изображение",
    image: null,
    color: "black",
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type:  ['image/png', 'image/jpg', 'image/jpeg']
    })

    if (!result.canceled){
        setForm({...form, image: result.assets[0]})
    }
  }

  const handleFormSubmit = async () => {
    if (form.image == null) {
      return Alert.alert("Изображение не выбрано");
    }
    setIsSubmitting(true);
    try {
      await setImage({ ...form, userId: user.$id });
      router.push("/photos");
    } catch (error) {
      Alert.alert("Упс!", error.message);
    } finally {
      setIsSubmitting(false);
      setForm({
        title: "Новое изображение",
        image: null,
        color: "black",
      });
    }
  };

  const colorChangeSubmit = (e) => {
    setForm({ ...form, color: e });
    setColorIndicator(e);
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ minHeight: "90%", minWidth: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.push('/photos')}>
            <Entypo name="back" size={40} color="gray" />
          </TouchableOpacity>
          <Text style={globalStyles.header}> Новое изображение </Text>
          <TouchableOpacity
            onPress={() => setForm({ title: "", text: "", color: "" })}
          >
            <MaterialIcons name="cleaning-services" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FormField
            title="Заголовок"
            subtitle='(уникальный заголовок поможет легко отыскать нужное фото)'
            value={form.title}
            handleChangeText={(e) => {
              setForm({ ...form, title: e });
            }}
          />
          <Text style={styles.text}>Изображение</Text>
          <TouchableOpacity style={styles.photoContainer} onPress={() => openPicker()}>
          {form.image ? (
            <Image source={{uri: form.image.uri}} resizeMode='contain'
            style={styles.photo}/>
          ) : (
            <View style={styles.photoUpload}>
              <FontAwesome5 name="upload" size={30} color="gray" />
            </View>
          )}
        </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>Цвет</Text>
            <View
              style={{
                width: "80%",
                height: 15,
                backgroundColor: colorIndicator,
                borderRadius: 10,
              }}
            ></View>
          </View>
          <View style={styles.bottomBlock}>
            <TouchableOpacity onPress={() => colorChangeSubmit("red")}>
              <View
                style={[styles.colorPicker, { backgroundColor: "red" }]}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => colorChangeSubmit("violet")}>
              <View
                style={[styles.colorPicker, { backgroundColor: "violet" }]}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => colorChangeSubmit("green")}>
              <View
                style={[styles.colorPicker, { backgroundColor: "green" }]}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => colorChangeSubmit("blue")}>
              <View
                style={[styles.colorPicker, { backgroundColor: "blue" }]}
              ></View>
            </TouchableOpacity>
          </View>
          <CustomButton
            containerStyles="{marginTop: 30, width: '100%'}"
            title="Сохранить"
            handlePress={handleFormSubmit}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  bottomBlock: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorPicker: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  photoUpload: {
    opacity: 0.5,
    width: '100%',
    height: 85,
    borderRadius: 10,
    backgroundColor: '#c2c6c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 3
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  photoContainer: {
    alignItems: 'center',
    width: '100%'
  },
});
