import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default CommonTextInput = ({
  placeholder,
  inputstyle,
  secureTextEntry,
  onChangeText,
  value,
  isPasswordField,
  handlePasswordStatus,
  errorText,
  errorStatus,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={[{...styles.textInputStyle}, inputstyle]}
        placeholderTextColor={Colors.hintTextColor}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        onChangeText={onChangeText}
      />
      {isPasswordField && (
        <TouchableOpacity
          style={[styles.passIconStyle, {top: errorStatus ? '33%' : '45%'}]}
          onPress={handlePasswordStatus}>
          <FontAwesome5
            name={secureTextEntry ? 'eye-slash' : 'eye'}
            color={Colors.hintTextColor}
            size={16}
          />
        </TouchableOpacity>
      )}
      {errorStatus ? <Text style={styles.errStyle}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 100,
    paddingHorizontal: 25,
    paddingVertical: 14,
    backgroundColor: Colors.textInputBgColor,
    fontSize: 16,
    color: Colors.black,
  },
  passIconStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',

    right: '8%',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  errStyle: {
    fontSize: 12,
    color: 'red',
    marginLeft: 20,
    marginTop: 3,
  },
});
