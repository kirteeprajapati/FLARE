import React from 'react';
import {Image, View, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';     //vector icons so importd
import {useNavigation} from '@react-navigation/native';
import styles from './styles';         ///its style sheet

interface ProductItemProps {           //defines how will product look the container
  item: {                              //product item with details
    id: string;
    title: string;
    image: string;
    avgRating: number; 
    ratings: number;
    price: number;
    oldPrice?: number;
  };
}

const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ProductDetails', {id: item.id});
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.rightContainer}>
        {/* title name wont exceed 3 lines */}
        <Text style={styles.title} numberOfLines={3}>           
        
          {item.title}
        </Text>
        {/* Ratings */}
        <View style={styles.ratingsContainer}>
          {[0, 0, 0, 0, 0].map((el, i) => (             //map for each item 5 times    el- element, in- index of that element
            <FontAwesome
              key={`${item.id}-${i}`}                   //item Id with index
              style={styles.star}
              name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}   //array of an element  Logic- it rounds off the rating
              size={18}
              color={'#F78392'}                                           //color of start
            />
          ))}
          {/* Display ratings and prize on products */}
          <Text>{item.ratings}</Text>              
        </View>
        <Text style={styles.price}>
          from ${item.price.toFixed(2)} 
          {item.oldPrice && (                   //&& denotes if Item has old prize then display it else ignore
            <Text style={styles.oldPrice}> ${item.oldPrice.toFixed(2)}</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;
