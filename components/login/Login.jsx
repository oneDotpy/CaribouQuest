import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './login.style';
import { COLORS } from '../../constants';
import { setToken } from '../../token/token';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const loginRequest = async (email, password) => {
  try {
    const response = await fetch('http://172.20.10.4:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status == 200) {
      const data = await response.json();
      return data.token;
      
    } else {
      
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const Stack = createNativeStackNavigator();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {

    const token = await loginRequest(username, password);
    if (token) {
      setToken(token);
      router.push('/screens/HomeScreen');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite }, 
          headerShadowVisible: false,
          headerShown: false,
          headerTitle:''
        }}
      />
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image source={require('../../assets/images/caribou-logo.png')} style={styles.loginImage} />
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <Text style={styles.signinText}>SIGN IN</Text>
        </View>
        <View style={styles.singinInputContainer}>
          <TextInput
            id="ti_email"
            style={styles.placeholderTxt}
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Email"
            placeholderTextColor={COLORS.gray2}
          />
        </View>
        <View style={styles.singinInputContainer}>
          <TextInput
            id="ti_password"
            style={styles.placeholderTxt}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            placeholder="Password"
            placeholderTextColor={COLORS.gray2}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity style={styles.singinBtn} onPress={handleLogin}>
            <Text style={{ marginLeft: 140, opacity: 1 }}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
