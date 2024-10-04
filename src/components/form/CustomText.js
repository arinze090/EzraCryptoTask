import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomText = ({style, children, ...props}) => {
  return (
    <Text style={[styles.customFont, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'ClashDisplay-Bold',
  },
});

export default CustomText;
