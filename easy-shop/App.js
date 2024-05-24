// import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import Main from './Navigators/Main';
import Toast from "react-native-toast-message";

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Navigators 
import { NavigationContainer } from '@react-navigation/native';

// Screens 
// import ProductContainer from './Screen/Products/ProductContainer';
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>

      <NavigationContainer>
        {/* <View       
          style={styles.container}> */}
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          {/* <ProductContainer /> */}
        {/* </View> */}

      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
  
//   container: {
//     flex: 1,
//     padding: 0,
//     flexDirection: 'column',
//     backgroundColor: '#fffff0'

//   },
// });
