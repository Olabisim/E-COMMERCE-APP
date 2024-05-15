

import React from 'react';
import {View as V, StyleSheet as SS, Text as T, FlatList as FL,  Dimensions as D, ScrollView as SV, TouchableOpacity as TO} from 'react-native'
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
                    onPress={() => {
                        // setting it to all if it all categories is clicked on.
                        props.CategoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 5}, props.active == -1 ? styles.active : styles.inactive]}
                    >
                        <Text style={{color: 'white'}}>All</Text>
                    </Badge>
                </TO>
                {props.categories.map((item) => (
                    <TO 
                        key={item._id}
                        onPress={() => {
                            // setting it to each if it each category is clicked on.
                            props.CategoryFilter(item._id), props.setActive(props.categories.indexOf(item))
                        }}
                    >
                        <Badge
                            style={[styles.center, {margin: 5}, props.active == props.categories.indexOf(item) ? styles.active : styles.inactive]}
                        >
                            <Text style={{color: 'white'}}>{item.name}</Text>
                        </Badge>
                    </TO>
                ))}
            </ListItem>
        </SV>
    )
}

const styles = SS.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;

