import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationService from '~/utils/NavigationService';
import SelectionScreen from '../../screens/SelectionScreen';
import IntroSlideScreen from '../../screens/IntroSliderScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ConfirmSignUpScreen from '../../screens/ConfirmSignUpScreen';
import RecoverPasswordScreen from '../../screens/RecoverPasswordScreen';
import ConfirmRecoverPasswordScreen from '../../screens/ConfirmRecoverPassScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import CompleteResetPassScreen from '../../screens/CompleteResetPassScreen';
import MainScreen from '../../screens/MainScreen';
import CompleteSignUpScreen from '../../screens/CompleSignUpScreen';
import WebViewScreen from '~/screens/WebviewScreen';
import ChangePassScreen from '~/screens/ChangPassScreen';
import CameraScreen from '~/screens/CameraScreen';
import FirstScreen from '~/screens/FirstScreen';
import IntroCameraScreen from '~/screens/IntroCameraScreen';
import PostPolicyScreen from '~/screens/PostPolicyScreen';
import CompletePostPolicyScreen from '~/screens/CompletePostPolicyScreen';
import NoticesScreen from '~/screens/NoticesScreen';
import NoticeDetailScreen from '~/screens/NoticeDetailScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DetailPolicy from '~/screens/DetailPolicy';
import UpdateDetailPolicy from '~/screens/UpdateDetailPolicy';
import ShowImageScreen from '~/screens/ShowImageScreen';
import ShareScreen from '~/screens/ShareScreen';
import TotalPolicy from '~/screens/TotalPolicy';
import ChangeEmailScreen from '~/screens/ChangeEmailScreen';
import ConfirmChangeMailScreen from '~/screens/ConfirmChangeMailScreen';
import { StatusBar } from 'native-base';
import CompletePostInquiries from '~/screens/CompletePostInquiries';

export default function NavigationComponent() {
  const Stack = createStackNavigator();
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaProvider>
      <NavigationContainer ref={NavigationService.navigationRef}>
        <Stack.Navigator initialRouteName="First">
          <Stack.Screen
            name="IntroSlider"
            component={IntroSlideScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Selection"
            component={SelectionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmSignUp"
            component={ConfirmSignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmRecover"
            component={ConfirmRecoverPasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompleteResetPass"
            component={CompleteResetPassScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompleteSignUp"
            component={CompleteSignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePass"
            component={ChangePassScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="First"
            component={FirstScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IntroCamera"
            component={IntroCameraScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostPolicy"
            component={PostPolicyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompletePostPolicy"
            component={CompletePostPolicyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notices"
            component={NoticesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NoticeDetail"
            component={NoticeDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailPolicy"
            component={DetailPolicy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Share"
            component={ShareScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateDetailPolicy"
            component={UpdateDetailPolicy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShowImageScreen"
            component={ShowImageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TotalPolicy"
            component={TotalPolicy}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmailScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="ConfirmChangeMail"
            component={ConfirmChangeMailScreen}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="CompletePostInquiries"
            component={CompletePostInquiries}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </>
  );
}
