import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, FONT } from '../../constants';
import styles from './questview.style';

const QuestView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { name, distance, latitude, longitude } = useLocalSearchParams();

  console.log(`Latitude Received: ${latitude}`);
  console.log(`Longitude Received: ${longitude}`);
  console.log(`Distance Received: ${distance}`)

  const subtitle = `${distance} • 100 exp • 10 ©`;

  const initialRegion = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.007,
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
          headerTitle: 'caribou',
        }}
      />
      <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} initialRegion={initialRegion}>
        <Marker coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }} />
      </MapView>
      <Text style={styles.nameText}>Visit Checkpoint</Text>
      <Text style={styles.questName}>{name}</Text>
      <Text style={styles.questText}>{subtitle}</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <TouchableOpacity style={styles.generateBtn} onPress={() => {}}>
        <Text style={{ marginLeft: 73, fontFamily: FONT.bold, fontSize: 25 }}>Complete Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestView;
