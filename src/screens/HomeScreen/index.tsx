import React, {useState, useEffect} from 'react';           //
import {View, StyleSheet, FlatList} from 'react-native';    //to render list of product we need FlatList component from react-native
import ProductItem from '../../components/ProductItem';     //Fetch the details so mentioned in product item
import {DataStore} from 'aws- amplify';                     //backend
import {Product} from '../../models';

// import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        DataStore.query(Product).then(setProducts);
    }, []);

    return (
        <View style={styles.page}>
        {/* Render Product Componet */}
        <FlatList
            data={products}                                        //mandatory to provide
            renderItem={({item}) => <ProductItem item={item} />}   //this will be called for every individual item and we render custom components for each item
            showsVerticalScrollIndicator={false}                   //vertical scroll
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    });

export default HomeScreen;
