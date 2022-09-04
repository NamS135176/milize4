import {useState, useEffect, useCallback} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postTokenFirebase} from '~/services/tokenFirebase';
import {AppState} from 'react-native';
const ChannelId = 'miruho-default-channel-id';

function useFcm() {
  async function saveTokenToDatabase(fcm_token: string, checkExist = true) {
    const tokenDb = await AsyncStorage.getItem('@fcm_token');
    console.log('saveTokenToDatabase... ', {fcm_token});
    if (fcm_token !== tokenDb) {
      await AsyncStorage.setItem('@fcm_token', fcm_token);
      await postTokenFirebase(fcm_token);
    }
  }
  const navigation = useNavigation();

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('useFcm... Authorization status:', authStatus);
    }
  }, []);

  const handleOpenNotification = useCallback((data: any) => {
    try {
      const notificationId = data?.id;
      console.log('handleOpenNotification... ', {data});
      console.log('appstate', AppState.currentState);
      if (AppState.currentState === 'background') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('useFcm... getToken', {token});
        return saveTokenToDatabase(token);
      });

    return messaging().onTokenRefresh(token => {
      console.log('useFcm... onTokenRefresh', {token});
      saveTokenToDatabase(token);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('messaging().onMessage()... ', {remoteMessage});
        PushNotification.localNotification({
          channelId: ChannelId,
          largeIcon: '',
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body ?? '',
          bigText: remoteMessage.notification?.body,
          userInfo: remoteMessage.data,
        });
        console.log('messaging().onMessage()... END');
      },
    );

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage && remoteMessage.data) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          handleOpenNotification(remoteMessage.data);
        }
      })
      .catch(err => {});

    PushNotification.createChannel(
      {
        channelId: ChannelId, // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      onNotification: (notification: any) => {
        console.log('PushNotification.configure... ', {notification});
        if (!notification) {
          return;
        }
        //@ts-ignore
        const userInteraction =
          notification.userInteraction ||
          (notification.data && notification.data.userInteraction);
        if (userInteraction) {
          const data = notification.data
            ? notification.data
            : notification.userInfo;
          handleOpenNotification(data);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    requestUserPermission();

    return unsubscribe;
  }, []);

  return null;
}

export default useFcm;
