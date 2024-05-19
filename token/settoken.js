import * as SecureStore from 'expo-secure-store'

const setToken = (token) => {
  return SecureStore.setItemAsync('secure_token', token);
};

export default setToken
