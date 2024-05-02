import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


// Screens 
import ProductContainer from './Screen/Products/ProductContainer';
import Header from './Shared/Header';

export default function App() {
  return (
    <View       
      style={styles.container}>
        <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#fffff0'

  },
});
