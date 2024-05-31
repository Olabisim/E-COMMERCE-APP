import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet 
} from "react-native"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

var { width } = Dimensions.get("window")

const Categories = (props) => {
    
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    return (
        <View style={{ position: "relative", height: "100%"}}>
            <View style={{ marginBottom: 60 }}>
                <FlatList 
                    data={categories}
                    renderItem={({ item, index }) => (
                        <Text>{item}</Text>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Category</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput 
                        value={categoryName}
                        style={styles.input}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                        medium
                        primary
                    >
                        <Text style={{ color: "white", fontWeight: "bold"}}>Submit</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    }
})

export default Categories;