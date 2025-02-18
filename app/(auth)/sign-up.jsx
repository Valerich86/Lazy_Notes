import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../web/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import MiniLogo from "../../components/MiniLogo";

const globalStyles = require("../../constants/GlobalStyles");

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async () => {
    // if (form.email === '' || form.password === ''){
    //   Alert.alert('', 'Заполните все поля!')
    // }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Что-то не так!", 'Проверьте введенные данные');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView contentContainerStyle={{ minHeight: "100%" }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <MiniLogo anotherStyles='{"marginLeft": "10"}'/>
          <Text style={globalStyles.header}>Регистрация</Text>
          <FormField
            title="Имя"
            value={form.username}
            handleChangeText={(e) => {
              setform({ ...form, username: e });
            }}
          />
          <FormField
            title="Почта"
            value={form.email}
            handleChangeText={(e) => {
              setform({ ...form, email: e });
            }}
            keyboardType="email-address"
          />
          <FormField
            title="Пароль"
            value={form.password}
            placeholder="Не менее 8 символов"
            handleChangeText={(e) => {
              setform({ ...form, password: e });
            }}
          />
          <CustomButton
            containerStyles="{marginTop: 45, width: '100%'}"
            title="Сохранить"
            handlePress={handleFormSubmit}
            isLoading={isSubmitting}
          />
          <View style={styles.bottomBlock}>
            <Text style={styles.text}>Уже есть аккаунт?</Text>
            <Link href="/sign-in" style={styles.link}>
              Войти
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  link: {
    color: "green",
    marginLeft: 20,
    textDecorationLine: "underline",
  },
  bottomBlock: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
