
import React, {useState, useEffect} from 'react';
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV } from 'react-native';
import Swiper from "react-native-swiper"; 

var {width} = D.get('window');

const Banner = () => {

    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        setBannerData([
            'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
            'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
            'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg'
        ])

        return () => {
            setBannerData([])
        }
    },[])

    console.log(bannerData)
    console.log("bannerData")

    return (
        <V style={styles.container}>
            {/* <V style={styles.swiper}> */}
                <Swiper 
                    style={{height: width / 2}}
                    showsButtons={true}
                    autoPlay={true}
                    autoplayTimeout={2}
                >
                    {bannerData.map((item) => {
                        return (
                            <I 
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}} 
                            />
                        );
                    })}
                </Swiper>
                 {/* <Swiper style={styles2.wrapper} showsButtons loop={false}>
                    <V testID="Hello" style={styles2.slide1}>
                        <T style={styles2.text}>Hello Swiper</T>
                    </V>
                    <V testID="Beautiful" style={styles2.slide2}>
                        <T style={styles2.text}>Beautiful</T>
                    </V>
                    <V testID="Simple" style={styles2.slide3}>
                        <T style={styles2.text}>And simple</T>
                    </V>
                </Swiper> */}
                {/* <V style={{height: 20}}></V> */}
            {/* </V> */}
        </V>
    )
}

const styles = SS.create({  
    container: {
        // flex: 1,
        height: 200,
        backgroundColor: "gainsboro",
    },
    swiper: {
        width: width,
        alignItems: "center",
        // marginTop: 10,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
})

const styles2 = SS.create({  
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
})

export default Banner;