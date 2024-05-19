import * as SecureStore from 'expo-secure-store'

const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

const setToken = (token) => {
  tk = SecureStore.setItemAsync('secure_token', token);
  console.log(SecureStore.getItemAsync('secure_token'));
  return tk
};


export {getToken, setToken}
