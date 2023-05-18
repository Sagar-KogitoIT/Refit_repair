import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  text-align: center;
  background-color: ${props => (props.disabled ? '#666' : '#23CDB2')};
  align-items: center;
  height: 52px;
  display: flex;
  justify-content: center;
  margin-top: ${props => props.margin}px;
  border-radius: 30px;
`;
export const ButttonText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #fff;
  font-size: 17px;
  font-family: Poppins-SemiBold;
`;
