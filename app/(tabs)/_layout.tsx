import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.mainTheme,
            borderTopColor: Colors.separator,
            borderTopWidth: 1,
            height: 60,
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Главная",
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name="home"
                  size={27}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Закладка",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="create-sharp"
                  size={30}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Профиль",
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="manage-accounts"
                  size={33}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
