import { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';


import { COLORS, icons, images, SIZES } from '../constants'
import { Login, Map, Propelauth, Welcome, Quest, ScreenHeaderBtn, Profile } from '../components'
import HomeScreen from './screens/HomeScreen';


const { width } = Dimensions.get('window');

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Login /> 
  );
}

export default Home;