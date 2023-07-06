import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});
  const bottomSheetRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef?.current?.open();
    }, 500);
    getUserDetails();
    getListDetails();
    return () => bottomSheetRef?.current?.close();
  }, [bottomSheetRef?.current]);

  const openBottomSheet = () => {
    bottomSheetRef?.current?.open();
  };

  const getUserDetails = async () => {
    const userDetails = await AsyncStorage.getItem('userDetails');
    setUserDetails(JSON.parse(userDetails));
  };

  const getListDetails = item => {
    setIsLoading(true);
    var requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      item === 'sports' ? 'sports' : 'business'
    }&apiKey=3fa7bc0569984633b9cdaeb8c428aca3`;
    try {
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          var temp = JSON.parse(result);
          if (temp.articles) {
            setData(temp.articles);
          } else {
            ToastAndroid.show(
              'Something went wrong, please try again later',
              2,
            );
          }
          setIsLoading(false);
        });
    } catch (e) {
      ToastAndroid.show('Something went wrong, please try again later', 2);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
    ToastAndroid.show('User successfully logout', 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.borderColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {userDetails.userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <FontAwesome5
            name={'sign-out-alt'}
            color={Colors.white}
            size={20}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={Colors.borderColor} />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <View style={styles.listView}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Image
                    height={200}
                    source={{
                      uri:
                        item.urlToImage !== null
                          ? item.urlToImage
                          : 'https://i.ytimg.com/vi/wwGRW7bffcM/maxresdefault.jpgs',
                    }}
                  />
                  <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                    <Text style={styles.descTitle}>Description</Text>
                    <Text style={styles.descSubTitle}>{item.description}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => openBottomSheet()}
          style={styles.bottomSheetIconView}>
          <View style={styles.bottomSheetIcon}></View>
        </TouchableOpacity>
        <RBSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          dragFromTopOnly={true}
          height={150}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: styles.bottomSheetContainer,
            draggableIcon: styles.draggableIcon,
          }}>
          <View style={styles.bottomSheetButView}>
            <TouchableOpacity
              onPress={() => {
                getListDetails('business');
              }}
              style={styles.buttonView}>
              <Text style={styles.buttonText}>Business</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getListDetails('sports');
              }}
              style={[styles.buttonView, {marginLeft: 10}]}>
              <Text style={styles.buttonText}>Sports</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
