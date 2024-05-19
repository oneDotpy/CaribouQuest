import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants';
import { QuestView } from '../../components';

const QuestViewScreen = () => {
  const params = useLocalSearchParams();
  const { name , dist
   } = params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <QuestView 
        name={name}
        dist={dist}
        
      />
    </SafeAreaView>
  )
};

export default QuestViewScreen