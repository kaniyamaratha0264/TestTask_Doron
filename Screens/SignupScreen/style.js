import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageStyle: {
    alignSelf: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 24,
    color: Colors.title,
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: 56,
  },
  formContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
  },
  alreadyAccView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 20,
  },
  alreadyAccTextStyle: {
    fontSize: 13,
    color: Colors.title,
  },
});

export default styles;
