import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, icons, FONT } from '../../constants';
import styles from './map.style';
import { ScreenHeaderBtn } from '../../components';
import { fetchChatGPTData } from '../../hooks/fetchChatGPT'; // Adjust the import path as necessary

const Map = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const initialRegion = {
    latitude: 43.474979,
    longitude: -80.529302,
    latitudeDelta: 0.005,
    longitudeDelta: 0.007,
  };

  const useName = `${name}`
  const username = `Hello, ${name}`;
  console.log(`NAME: ${useName}`)

  const handlePress = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchChatGPTData();
    if (data) {
      router.push({
        pathname: '/screens/QuestScreen',
        params: {
          lat1: data[0].Latitude,
          
          lat2: data[1].Latitude,
          
          lat3: data[2].Latitude,
          
          lat4: data[3].Latitude,

          
          lat5: data[4].Latitude,
          lng1: data[0].Longitude,
          lng3: data[2].Longitude,
          lng4: data[3].Longitude,
          lng5: data[4].Longitude,
          lng6: data[1].Longitude,
          name1: data[0].Loc,
          name2: data[1].Loc,
          name3: data[2].Loc,
          name4: data[3].Loc,
          name5: data[4].Loc,
          dist1: data[0].Distance,
          dist2: data[1].Distance,
          dist3: data[2].Distance,
          dist4: data[3].Distance,
          dist5: data[4].Distance
        },
        
      });

    } else {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  const handleProfile = async () => {
    setLoading(true);
    router.push({
      pathname: '/screens/ProfileScreen',
      params: {
        name: name,
      }
    })
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <TouchableOpacity onPress={handleProfile}>
                <ScreenHeaderBtn iconUrl={icons.profile} dimension="100%" handlePress={handleProfile}/>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: 'caribou',
        }}
      />
      <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} initialRegion={initialRegion}>
        <Marker coordinate={{ latitude: 43.474979, longitude: -80.529302 }} />
        <Marker coordinate={{ latitude: 43.6426, longitude: -79.3871 }} />
      </MapView>
      <Text style={styles.nameText}>{username}</Text>
      <Text style={styles.questText}>Ready to start a quest?</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <TouchableOpacity style={styles.generateBtn} onPress={handlePress}>
        <Text style={{ marginLeft: 70, fontFamily: FONT.bold, fontSize: 25 }}>Generate Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
