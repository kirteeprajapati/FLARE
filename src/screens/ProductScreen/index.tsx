import React, {useState, useEffect} from 'react';                  //react hooks useState and useEffect
import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';                //install  'npm install @react-native-picker/picker --save'
import {useRoute, useNavigation} from '@react-navigation/native';  //Hook UseRoute this will get details of our route
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

import styles from './styles';
import QuantitySelector from '../../components/QuantitySelector';   
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);            //if option exist it will show otherwise null

  const [selectedOption, setSelectedOption] = useState<string | undefined>(          //picked-selectedOption and available to pick- setSelectedOption
    undefined,
  );
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();                                   //called route
  // Route props
  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />              //it refers to the options available in product.ts under data
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>             //prize
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Qunatiti selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button                    //add to cart btn this redirects to components-button-index.tsx
        text={'Add To Cart'}
        onPress={onAddToCart}
        containerStyles={{backgroundColor: '#FCCBCC'}}
      />
      <Button //buy now
        text={'Buy Now'}         // this redirects to components-button-index.tsx
        onPress={() => {
          console.warn('Buy now');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;
