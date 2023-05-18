import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {Toproundbox, Toptxt} from '../../StyledComponent/wrapper/Styles';
const TestMobile = () => {
  return (
    <View style={styles.wrp}>
      <StatusBar animated={true} backgroundColor="#00A6ED" />
      <View style={{borderTopColor: '#fff', borderTopWidth: 1, marginTop: 6}}>
        <Toptxt>REFIT</Toptxt>
      </View>
      <Toproundbox>
        <Text>TestMobile</Text>
      </Toproundbox>
    </View>
  );
};

export default TestMobile;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: '#00A6ED',
  },
});
