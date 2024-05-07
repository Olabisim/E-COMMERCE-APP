

import React from 'react';
import {View as V, StyleSheet as SS, Text as T, ActivityIndicator, FlatList as FL,  Dimensions as D, ScrollView as SV, TouchableOpacity as TO} from 'react-native'
import {ListItem, Badge, Text} from 'native-base'


var {width} = D.get('window')


const CategoryFilter = (props) => {
    return (
        <SV
            bounces={true}
            horizontal={true}
            style={{backgroundColor: "#f2f2f2", flex: 1, width, height: 50}}
        >
            <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
                <TO 
                    key={1}
                    // onPress={()}
                >
                    <Badge
                        style={[styles.center, {margin: 5}]}
                    >
                        <Text style={{color: 'white'}}>name</Text>
                    </Badge>
                </TO>
            </ListItem>
        </SV>
    )
}

const styles = SS.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})

export default CategoryFilter;

