import React from 'react';
import { COLORS, icons, images, SIZES, FONT } from '../../constants';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './profile.style';
import { ScreenHeaderBtn } from '../../components';


const Profile = ({name}) => {
  const router = useRouter();

  const email = `${name}@mail.com`

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite }, 
          headerShadowVisible: false,
          headerTitle:'caribou'
        }}
      />
      <View style={styles.profileContainer}>
        <Image 
          style={styles.profileImg}
          source={require('../../assets/icons/Profile.png')} 
        />
        <Text style={styles.usernameTxt}>
        {name}
        </Text>
        <Text style={styles.lvlTxt}>
          LVL 99
        </Text>
        <Text style={styles.lvlExpTxt}>
          (1000 EXP TO NEXT LEVEL)
        </Text>
        <Text style={styles.emailTxt}>
          {email}
        </Text>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={require('../../assets/icons/Coin.png')} resizeMode='contain'/>
          <Text style={styles.textContainer}>1000</Text>
        </View>
      </View>

    </View>
  )
};

export default Profile