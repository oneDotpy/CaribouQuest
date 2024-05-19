import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';
import Map from '../../components/map/Map';
import { getToken } from '../../token/token';

const HomeScreen = () => {
  const [name, setName] = useState('');

  const profileRequest = async () => {
    const token = await getToken();
    console.log(token);
    try {
      const response = await fetch('http://172.20.10.4:3001/protected/profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.status == 200) {
        const user = await response.json();
        console.log(user.username);
        setName(user.username);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    profileRequest();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1 }}>
        <Map name={name} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
