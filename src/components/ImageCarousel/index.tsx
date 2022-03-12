import React, {useState, useCallback} from 'react';   //imported UseState and useCallBack from react
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const ImageCarousel = ({images}: {images: string[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);    
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({viewableItems}) => {       //useCallback hook
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
    console.log(viewableItems);
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{                     //how should our visible item be managed
          viewAreaCoveragePercentThreshold: 50,  //so that item will only be visible when we have slided more than 50%
          minimumViewTime: 300, //so that it slides after 300ms
        }}
        onViewableItemsChanged={onFlatlistUpdate} //to keep a track of which elements are active on screen
      />

      <View style={styles.dots}>
        {/* //to render all the images */}
        {images.map((image, index) => (
          <View
            style={[
              styles.dot,         //dot view of product
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#fcebed', //so that bg clr of the active dot is different
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',          //dot in same row
    justifyContent: 'center',      //dots at center
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,                 //border width of dot
    backgroundColor: '#fcebed',      
    borderColor: '#c9c9c9',
    margin: 5,
  },
});

export default ImageCarousel;
