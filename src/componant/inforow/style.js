import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components';

export const styles = StyleSheet.create({
  infoWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#01131A',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginHorizontal: -16,
    paddingHorizontal: 20,
  },
  info: {
    color: '#01131A',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    paddingLeft: 5,
    marginBottom: -2,
  },
  txtwrp: {flexDirection: 'row', alignItems: 'center'},
  tikBtn: {},
});
