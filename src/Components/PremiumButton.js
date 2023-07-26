import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../Utils/Color';

const PremiumButton = () => {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="crown"
        style={{ marginEnd: 10 }}
        color={Color.PrimaryColor}
      />
      <Text style={styles.heading}>Premium</Text>
    </View>
  );
};

export default PremiumButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAF2',
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingVertical: 5,
    marginStart: 10,
  },
  heading: {
    color: Color.PrimaryColor,
    fontWeight: '700',
  },
});
