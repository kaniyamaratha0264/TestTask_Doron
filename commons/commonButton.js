import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

export default CommonButton = ({text, buttonStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={[{...styles.container}, buttonStyle]}
      onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 100,
    borderColor: Colors.borderColor,
  },
  textStyle: {
    fontSize: 16,
    color: Colors.borderColor,
    fontWeight: '600',
  },
});
