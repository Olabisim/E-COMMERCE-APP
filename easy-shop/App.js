import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigators/Main';

// Navigators 

// Screens 
import ProductContainer from './Screen/Products/ProductContainer';
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
      {/* <View       
        style={styles.container}> */}
          <Header />
        <Main />
        {/* <ProductContainer /> */}
      {/* </View> */}

    </NavigationContainer>
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
