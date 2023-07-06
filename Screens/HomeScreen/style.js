import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: Colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  bottomSheetIcon: {
    height: 5,
    width: 50,
    backgroundColor: Colors.black,
    borderRadius: 6,
  },
  bottomSheetIconView: {
    paddingVertical: 5,
    bottom: 15,
    marginTop: 15,
  },
  bottomSheetButView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  draggableIcon: {
    height: 5,
    width: 50,
    backgroundColor: Colors.black,
    borderRadius: 6,
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  buttonView: {
    borderColor: Colors.borderColor,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 26,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    marginBottom: '3%',
    marginTop: 15,
  },
  listView: {
    borderRadius: 16,
    paddingVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    marginBottom: 20,
  },
  descTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  descSubTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.subTitleColor,
    marginTop: 2,
  },
  titleText: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  logoutButton: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
