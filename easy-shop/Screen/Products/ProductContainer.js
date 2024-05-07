import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL,  Dimensions as D } from 'react-native'
// import {Icon} from 'native-base'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';


var {width}  = D.get("window")

const data = require('../../assets/data/products.json')
const categories = require('../../assets/data/categories.json')

const ProductContainer = () => {

    const [ products, setProducts] = useState([]);
    const [ productsFiltered, setProductsFiltered] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories] = useState([]);
    const [ active, setActive] = useState();
    const [ initialState, setinitialState] = useState([]);


    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(categories)
        setActive(-1)
        setinitialState(data)

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            setCategories([])
            setActive()
            setinitialState([])
        }

    }, [])


    const searchProduct = (text) => {
        setProductsFiltered(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())))
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }


    return (

        <Container> 
        
        <Header searchBar rounded>
            <Item>
                <Icon name="ios-search" />
                <Input 
                    placeholder="Search"
                    onFocus={openList}
                    onChangeText={(text) => {searchProduct(text);openList();}}
                />
                {/* to handle closing of the focus */}
                {focus == true && (
                    <Icon onPress={onBlur} name="ios-close" />
                )}
            </Item>
        </Header>
        
        {focus == true 
        ? 
        (
            // <V>

            // </V>
            <SearchedProduct 
                productsFiltered={productsFiltered}
            />
        )
        : 
        (  
        <V style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'center'}}> 
            <V style={{flex:3}}>
                <Banner />
            </V>
            
            <CategoryFilter />
            {/* <V>
            </V> */}
            <V style={{marginTop: 20, flex: 5, width, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <FL 
                    numColumns={2}
                    // horizontal
                    data={products}
                    renderItem={({item}) => <ProductList key={item.id} item={item} />}
                    keyExtractor={item => item.name}
                />
            </V>
        </V>
        )
        }
        
        </Container>

    )
}

export default ProductContainer;