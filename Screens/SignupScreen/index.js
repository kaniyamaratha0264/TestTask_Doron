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
import React, {useEffect, useState} from 'react';
import styles from './style';
import CommonTextInput from '../../commons/commonTextInput';
import CommonButton from '../../commons/commonButton';
import {Colors} from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [pasSecStatus, setPasSecStatus] = useState(true);
  const [conPasSecStatus, setConPasSecStatus] = useState(true);
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    userNameErr: false,
    emailError: false,
    validEmailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });
  const {
    userNameErr,
    emailError,
    passwordError,
    confirmPasswordError,
    validEmailError,
  } = error;
  const {userName, email, password, confirmPassword} = userData;

  const signUp = async () => {
    setError({
      ...error,
      userNameErr: userData.userName === '' ? true : false,
      passwordError: userData.password ? false : true,
      confirmPasswordError: userData.confirmPassword ? false : true,
      emailError: userData.email ? false : true,
    });
    if (userName && email && password && confirmPassword) {
      try {
        const userDetails = JSON.stringify(userData);
        await AsyncStorage.setItem('userDetails', userDetails);
        ToastAndroid.show('User registered successfully', 2);
        navigation.navigate('LoginScreen');
      } catch (e) {
        ToastAndroid.show('Something went wrong, please try again', 2);
      }
    } else {
      ToastAndroid.show('Please fill all user details', 2);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            source={require('../../assets/images/TopHeaderImage.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.titleText}>Registration</Text>
          <View style={styles.formContainer}>
            <CommonTextInput
              placeholder={'Username'}
              errorText={'Please enter a username'}
              errorStatus={userNameErr}
              value={userData.userName}
              onChangeText={value => {
                if (value.length > 0) {
                  setUserData({...userData, userName: value});
                  setError({...error, userNameErr: false});
                } else {
                  setError({...error, userNameErr: true});
                }
              }}
            />
            <CommonTextInput
              inputstyle={{marginTop: 12}}
              placeholder={'Email'}
              errorText={
                validEmailError
                  ? 'Please enter valid email'
                  : 'Please enter your email'
              }
              errorStatus={emailError}
              onChangeText={value => {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (value.length > 0) {
                  if (reg.test(value) == true) {
                    setUserData({...userData, email: value});
                    setError({
                      ...error,
                      emailError: false,
                      validEmailError: false,
                    });
                  } else {
                    setError({
                      ...error,
                      validEmailError: true,
                      emailError: true,
                    });
                  }
                } else {
                  setError({
                    ...error,
                    emailError: true,
                    validEmailError: false,
                  });
                }
              }}
            />
            <CommonTextInput
              placeholder={'Password'}
              inputstyle={{marginTop: 12}}
              errorText={'Please enter a password'}
              errorStatus={passwordError}
              secureTextEntry={pasSecStatus}
              isPasswordField={true}
              value={userData.password}
              onChangeText={value => {
                if (value.length > 0) {
                  setUserData({...userData, password: value});
                  setError({...error, passwordError: false});
                } else {
                  setError({...error, passwordError: true});
                }
              }}
              handlePasswordStatus={() => setPasSecStatus(!pasSecStatus)}
            />
            <CommonTextInput
              placeholder={'Confirm Password'}
              errorText={
                password !== confirmPassword
                  ? 'Confirm password should be same as set password'
                  : 'Please confirm your password'
              }
              errorStatus={confirmPasswordError}
              inputstyle={{marginTop: 12}}
              secureTextEntry={conPasSecStatus}
              isPasswordField={true}
              onChangeText={value => {
                if (value.length > 0) {
                  if (password !== value) {
                    setError({...error, confirmPasswordError: true});
                  } else {
                    setUserData({...userData, confirmPassword: value});
                    setError({...error, confirmPasswordError: false});
                  }
                } else {
                  setError({...error, confirmPasswordError: true});
                }
              }}
              handlePasswordStatus={() => setConPasSecStatus(!conPasSecStatus)}
            />
            <CommonButton
              text="Sign Up"
              buttonStyle={{marginTop: 20}}
              onPress={() => signUp()}
            />
            <View style={styles.alreadyAccView}>
              <Text style={styles.alreadyAccTextStyle}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate('LoginScreen')}
                  style={[
                    styles.alreadyAccTextStyle,
                    {fontWeight: '500', color: Colors.borderColor},
                  ]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
