import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants';
import Quest from '../../components/quest/quest';

const QuestScreen = () => {
  const params = useLocalSearchParams();
  const { lat1, lng1, lat2, lng6, lat3, lng3, lat4, lng4, lat5, lng5,
    name1, name2, name3, name4, name5, dist1, dist2, dist3, dist4, dist5
   } = params;


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1 }}>
        <Quest 
          lat1={lat1}
          lng1={lng1}
          lat2={lat2}
          lng6={lng6}
          lat3={lat3}
          lng3={lng3}
          lat4={lat4}
          lng4={lng4}
          lat5={lat5}
          lng5={lng5}
          name1={name1}
          name2={name2}
          name3={name3}
          name4={name4}
          name5={name5}
          dist1={dist1}
          dist2={dist2}
          dist3={dist3}
          dist4={dist4}
          dist5={dist5}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestScreen;