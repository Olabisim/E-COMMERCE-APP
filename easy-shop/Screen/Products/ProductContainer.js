import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet as SS, Text as T, FlatList as FL,  Dimensions as D } from 'react-native'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
// connection
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';


var {width, height }  = D.get("window")

const data = require('../../assets/data/products.json')
const productsCategories = require('../../assets/data/categories.json')

const ProductContainer = (props) => {

    const [ products, setProducts] = useState([]);
    const [ productsFiltered, setProductsFiltered] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories] = useState([]); 
    const [ productsCtg, setproductsCtg] = useState([]); 
    const [ active, setActive] = useState();
    const [ initialState, setinitialState] = useState([]);


    useEffect(() => {

        setFocus(false);
        setCategories(productsCategories)
        setActive(-1)
        

        console.log('reached the axios stage');
        console.log(`${baseURL}products`);

        axios
            .get(`${baseURL}products`)
            .then(res => {
                setProducts(res.data);
                setProductsFiltered(res.data);
                setproductsCtg(res.data);
                setinitialState(res.data);
                console.log('axios res')
                console.log(res)
            })
            .catch(err => {console.log("this is the erro coming in axios", err); console.log(err[0])})


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
        // once we call searchproduct of with the text we want to search it will give us productfiltered contains searched product
        setProductsFiltered(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())))
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    // Categories

    const changeCtg = (ctg) => {
        // set all categories to active if all is active. 
        {
            ctg === 'all'
            ?
            [setproductsCtg(initialState), setActive(true)]
            :
            [setproductsCtg(products.filter((i) => i.category._id === ctg), setActive(true))]
        }
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
                <SearchedProduct 
                    navigation={props.navigation}
                    productsFiltered={productsFiltered}
                />
            )
            : 
            (  
            <V style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'center'}}> 
                <V style={{flex:3}}>
                    <Banner />
                </V>
                
                <CategoryFilter 
                    categories={categories}
                    CategoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                />
                {
                    productsCtg.length > 0 
                    ?
                    (
                        <V style={styles.thirdLayoutView}>
                            
                            {/* {productsCtg.map((item) => {
                                return (
                                    <ProductList 
                                        navigation={props.navigation}
                                        key={item._id}
                                        item={item}
                                    />
                                )
                            })} */}
                            
                            <FL 
                                numColumns={2}
                                // horizontal
                                data={products}
                                renderItem={({item}) => <ProductList key={item.id} item={item} />}
                                keyExtractor={item => item.name}
                            />
                        </V>
                    )
                    : 
                    (
                        <V style={styles.thirdLayoutView}>
                            <T>No products found</T>
                        </V>   
                    )
                }
            </V>
            )
            }
        </Container>
    )
}

const styles = SS.create({
    thirdLayoutView: {
        marginTop: 20, 
        flex: 5, 
        width, 
        height,
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export default ProductContainer;