import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Toproundbox} from './Styles';
const Wrapper = props => {
  return (
    <View style={styles.wrp}>
      <Text>REFIT</Text>
      <Toproundbox style={{flex: 1}}>{props}</Toproundbox>
    </View>
  );
};

export default Wrapper;

const styles = StyleSheet.create({});
