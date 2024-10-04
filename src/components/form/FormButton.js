import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const FormButton = ({
  loading,
  title,
  onPress,
  disabled,
  width = false,
  marginTop,
  marginBottom,
  leftIcon,
  iconColor,
  height,
}) => {
  return (
    <TouchableOpacity
      style={[
        disabled ? styles.disabledBtn : styles.btn,
        {
          width: windowWidth / (width || 1.2),
          marginTop: marginTop,
          marginBottom: marginBottom,
          height: windowHeight / (height || 17),
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {leftIcon ? (
        <Ionicons
          name={leftIcon}
          size={20}
          color="white"
          style={styles.leftIcon}
        />
      ) : null}

      {loading ? (
        <ActivityIndicator size={20} color={'white'} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '600',
    zIndex: 1000,
  },
  btn: {
    height: windowHeight / 17,
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.pinky,
    justifyContent: 'center',
    alignContent: 'center',
    // marginBottom: 20,
    // marginTop: 5,
    flexDirection: 'row',
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    alignContent: 'center',
  },
  disabledBtn: {
    height: windowHeight / 17,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',

    // borderWidth: 1,
    // borderColor: COLORS.pinky,
    justifyContent: 'center',
    alignContent: 'center',
    // marginBottom: 20,
    //backgroundColor: COLORS.pinky,
    opacity: 0.45,
  },
  leftIcon: {
    marginRight: 10,
  },
});
