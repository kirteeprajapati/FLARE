import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'      //imported Pressable button

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const Button = ({ text, onPress, containerStyles }: ButtonProps) => { //receiving props for the btn
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>    
     {/* //array of styles */}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FCA8B3',
    marginVertical: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,     
    borderWidth: 1,
    borderColor: '#f78392',
  },
  text: {
    fontSize: 16,
  },
})

export default Button;
