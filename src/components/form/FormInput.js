import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/themes';
import {windowWidth} from '../../utils/Dimensions';

const FormInput = ({
  leftIcon,
  iconColor = '#fff',
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor,
  handlePasswordVisibility,
  onPress,
  autoCapitalize,
  autoComplete,
  keyboardType,
  maxLength,
  editable,
  width,
  ...rest
}) => {
  // This sets the color of the textInput field, default value is #333
  const [inputBg, setInputBg] = useState('#333');

  // this function changes the textInput field color when it's on focus
  const customOnFocus = () => {
    setInputBg(COLORS.pinky);
  };

  // this function changes the textInput field color when it's on blur
  const customOnBlur = () => {
    setInputBg('black');
  };
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {borderColor: inputBg, width: windowWidth / (width || 1.2)},
      ]}
      onPress={onPress}
      onBlur={customOnBlur}
      onFocus={customOnFocus}>
      {leftIcon ? (
        <Ionicons
          name={leftIcon}
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        autoCorrect="false"
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
        autoCapitalize={autoCapitalize}
        autoComplete={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Ionicons
            name={rightIcon}
            size={20}
            color={iconColor}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#333',
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    color: 'white',
  },
  rightIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
