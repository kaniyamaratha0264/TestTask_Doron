import {
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import CommonTextInput from '../../commons/commonTextInput';
import CommonButton from '../../commons/commonButton';
import {Colors} from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [secureTextStatus, setSecureTextStatus] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  const {emailError, passwordError} = error;
  const {email, password} = userData;

  const Login = async () => {
    setError({
      ...error,
      passwordError: userData.password ? false : true,
      emailError: userData.email ? false : true,
    });
    if (email && password) {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails !== null) {
          let data = JSON.parse(userDetails);
          if (email === data.email && password === data.password) {
            await AsyncStorage.setItem('flowStatus', 'loginSuccess');
            ToastAndroid.show('Login successfully', 2);
            navigation.navigate('HomeScreen');
          } else {
            ToastAndroid.show('Invalid credentials', 2);
          }
        } else {
          ToastAndroid.show('Please register first', 2);
        }
      } catch (e) {
        // error reading value
        ToastAndroid.show('Something went wrong, please try again', 2);
      }
    } else {
      ToastAndroid.show('Please enter your email or password', 2);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{width: '100%', flex: 1}}>
            <Image
              source={require('../../assets/images/TopHeaderImage.png')}
              style={styles.imageStyle}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.titleText}>Login</Text>
          <View style={styles.formContainer}>
            <CommonTextInput
              errorText={'Please enter your email'}
              errorStatus={emailError}
              value={userData.email}
              placeholder={'Email'}
              onChangeText={value => {
                if (value.length > 0) {
                  setUserData({...userData, email: value});
                  setError({...error, emailError: false});
                } else {
                  setError({...error, emailError: true});
                }
              }}
            />
            <CommonTextInput
              placeholder={'Password'}
              inputstyle={{marginTop: 12}}
              value={userData.password}
              errorText={'Please enter password'}
              errorStatus={passwordError}
              secureTextEntry={secureTextStatus}
              isPasswordField={true}
              onChangeText={value => {
                if (value.length > 0) {
                  setUserData({...userData, password: value});
                  setError({...error, passwordError: false});
                } else {
                  setError({...error, passwordError: true});
                }
              }}
              handlePasswordStatus={() =>
                setSecureTextStatus(!secureTextStatus)
              }
            />
            <Text style={styles.forgotPwStyle}>Forgot Password?</Text>
            <CommonButton
              text="Login"
              buttonStyle={{marginTop: 20}}
              onPress={() => Login()}
            />
            <View style={styles.newUserView}>
              <Text style={styles.newUserTextStyle}>New User? </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate('SignupScreen')}
                  style={[
                    styles.newUserTextStyle,
                    {fontWeight: '500', color: Colors.borderColor},
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
