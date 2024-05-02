import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


// Screens 
import ProductContainer from './Screen/Products/ProductContainer';

export default function App() {
  return (
    <View       
      style={styles.container}>
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
