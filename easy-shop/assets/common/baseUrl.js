import {Platform } from 'react-native';

let baseURL = 'http://102.88.71.186/api/v1/';

// {
//     Platform.OS == 'android'
//     ?
//     baseURL = 'http://10.0.2.2:3000/api/v1/'
//     : 
//     baseURL = 'http://localhost:3000/api/v1/' 102.88.71.186/32
// }

export default baseURL;