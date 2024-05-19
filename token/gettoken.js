import * as SecureStore from 'expo-secure-store'

const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

export default getToken
