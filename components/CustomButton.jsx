import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.body, eval("(" + containerStyles + ")")]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text style={[styles.text, eval("(" + textStyles + ")")]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#6ca587",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderBottomWidth: 3,
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 40,
  },
  isLoading: {
    opacity: 50,
  },
});
