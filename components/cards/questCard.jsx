import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './questCard.style';

const QuestCard = ({ name, dist, latitude, longitude, handleNavigate }) => {
  console.log(`CARD NAME: ${name}`)
  console.log(`CARD dist: ${dist}`)
  console.log(`CARD lat: ${latitude}`)
  console.log(`CARD long: ${longitude}`)
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => handleNavigate(name, dist, latitude, longitude)}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icons/Point.png')}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{name}</Text>
        <Text style={styles.jobType}>{dist} • 100 exp • 10 ©</Text>
      </View>
    </TouchableOpacity>
  );
}

export default QuestCard;
