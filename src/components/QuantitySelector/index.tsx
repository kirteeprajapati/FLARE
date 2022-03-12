import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';  //pressable component

const QuantitySelector = ({quantity, setQuantity}) => {
  const onMinus = () => {                              //increases the quantity selector
    setQuantity(Math.max(0, quantity - 1));            //this function prevents the user to go below 0
  };

  const onPlus = () => {                          //decreases the amount
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.root}>
      {/* //minus btn to decrease quantity */}
      <Pressable onPress={onMinus} style={styles.button}> 
      {/* quantity decreaser*/}
        <Text style={styles.butonText}>-</Text>
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable onPress={onPlus} style={styles.button}>      
      {/* quantity increaser*/}
        <Text style={styles.butonText}>+</Text>               
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({         //product quantity button
  root: {
    flexDirection: 'row',                 //button in row
    alignItems: 'center',                 
    justifyContent: 'space-between',
    borderWidth: 1,                       //component border
    borderColor: '#FCA8B3',
    width: 130,
  },
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCBCC',
  },
  butonText: {
    fontSize: 18,
  },
  quantity: {
    color: '#007eb9',
  },
});

export default QuantitySelector;
