import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';     //@stripe/stripe-react-native package
import countryList from 'country-list';                               //to return country list we installed this module 
import {Auth, DataStore,} from 'aws-amplify';
import {Order, OrderProduct, CartProduct} from '../../models';
import Button from '../../components/Button';
import styles from './styles';

const countries = countryList.getData();                             //this gets the data from country list module  //and its an Array

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullname] = useState('');                           //gets name and full name in address form initially null
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');                             //gets address
  const [addressError, setAddressError] = useState('');                   //returns address error

  const [city, setCity] = useState('');                                   //city
  const [clientSecret, setClientSecret] = useState<string | null>(null);  //optional

  const navigation = useNavigation();
  const route = useRoute();
  
  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();     //creating a new order
    // create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,                        //saves new order with these options
        fullName: fullname,
        phoneNumber: phone,
        country,
        city,
        address,
      }),
    );

    // fetch all cart items
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );

    // attach all cart items to the order
    await Promise.all(
      cartItems.map(cartItem =>                        //it waits until this data is filled
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );

    // delete all cart items
    await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));
  const onCheckout = () => {                                    //this function checks for errors and submits the form if filled correctly 
    if (addressError) {
      Alert.alert('Fix all field errors before submiting');
      return;
    }

    if (!fullname) {
      Alert.alert('Please fill in the fullname field');
      return;
    }

    if (!phone) {
      Alert.alert('Please fill in the phone number field');
      return;
    }

  //   // handle payments
  //   openPaymentSheet();
  // };

  const validateAddress = () => {
    if (address.length < 3) {                              //if address is 3 letter shot then it returns error
      setAddressError('Address is too short');             //inline errors
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}                //Operating system is set to Android
      keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 0}>
        {/* list item in scroll view */}
      <ScrollView style={styles.root}>                                               
        <View style={styles.row}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map(country => (                                           //this picker will assemble all the list
              <Picker.Item value={country.code} label={country.name} />           //with country code and name
            ))}
          </Picker>
        </View>

        {/* Full name */}
        <View style={styles.row}>
          <Text style={styles.label}>Full name (First and Last name)</Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullname}                                                      //gets the Name value from the user
            onChangeText={setFullname}
          />
        </View>

        {/* Phone number */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone number</Text>                  
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phone}                                                        //gets Phone number
            onChangeText={setPhone}
            keyboardType={'phone-pad'}
          />
        </View>

        {/* Address */}
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address" 
            value={address}                                                     //gets the valid address                                                                                                              
            onEndEditing={validateAddress}                           //function defined above
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
          />
          {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
          )}
        </View>

        {/* City */}
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <Button text="Checkout" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;