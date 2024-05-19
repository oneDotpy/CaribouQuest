import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, icons } from '../../constants';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import QuestCard from '../cards/questCard'; 
import MapView, { Marker } from 'react-native-maps';
import styles from './quest.style';
import { ScreenHeaderBtn } from '../../components';

const Quest = () => {
  const router = useRouter();
  const {
    lat1, lat2, lat3, lat4, lat5,
    lng1, lng6, lng3, lng4, lng5,
    name1, name2, name3, name4, name5, dist1, dist2, dist3, dist4, dist5
  } = useLocalSearchParams();

  const questType = [
    { name: name1, distance: dist1, latitude: parseFloat(lat1), longitude: parseFloat(lng1)},
    { name: name2, distance: dist2, latitude: parseFloat(lat2), longitude: parseFloat(lng6) },
    { name: name3, distance: dist3, latitude: parseFloat(lat3), longitude: parseFloat(lng3) },
    { name: name4, distance: dist4, latitude: parseFloat(lat4), longitude: parseFloat(lng4) },
    { name: name5, distance: dist5, latitude: parseFloat(lat5), longitude: parseFloat(lng5) }
  ];

  const initialRegion = {
    latitude: 43.474979, 
    longitude: -80.529302,
    latitudeDelta: 0.005,
    longitudeDelta: 0.007,
  };
  
  const handlePress = (name, distance, latitude, longitude) => {
    router.push({
      pathname: '/screens/QuestViewScreen',
      params: {
        name,
        distance,
        latitude,
        longitude
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite }, 
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
            </View>
          ),
          headerTitle: 'caribou'
        }}
      />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {lat1 && lng1 && <Marker coordinate={{ latitude: parseFloat(lat1), longitude: parseFloat(lng1) }} />}
        {lat2 && lng6 && <Marker coordinate={{ latitude: parseFloat(lat2), longitude: parseFloat(lng6) }} />}
        {lat3 && lng3 && <Marker coordinate={{ latitude: parseFloat(lat3), longitude: parseFloat(lng3) }} />}
        {lat4 && lng4 && <Marker coordinate={{ latitude: parseFloat(lat4), longitude: parseFloat(lng4) }} />}
        {lat5 && lng5 && <Marker coordinate={{ latitude: parseFloat(lat5), longitude: parseFloat(lng5) }} />}
        <Marker coordinate={{ latitude: 43.4504, longitude: -80.4892 }} />
      </MapView>
      <FlatList
        data={questType}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.name, item.distance, item.latitude, item.longitude)}>
            <QuestCard 
              name={item.name}
              dist={item.distance}
              latitude={item.latitude}
              longitude={item.longitude}
              handleNavigate={handlePress}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default Quest;
