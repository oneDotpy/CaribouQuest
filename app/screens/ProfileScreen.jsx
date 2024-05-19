import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants';
import { Profile } from '../../components';

const ProfileScreen = () => {
  const params = useLocalSearchParams();
  const { name } = params;
  const username = `${name}`
  

  console.log(`NAME RECIEVED: ${username}`)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Profile
        name={username}
      />
    </SafeAreaView>
  )
};

export default ProfileScreen