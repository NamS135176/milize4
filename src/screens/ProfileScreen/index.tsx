import React, {useState} from 'react';
import {
  Box,
  Text,
  Modal,
  Flex,
  Image,
  ScrollView,
  Center,
  Pressable,
  Alert,
  Actionsheet,
} from 'native-base';
import {FlatList, Dimensions} from 'react-native';
import SettingSVG from '~/assets/images/setting.svg';
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {SignOut, DeleteAccount} from '~/services/userService';
import NotificationSVG from '~/assets/images/notification.svg';
import profileStyles from './ProfileStyles';
import ListItem from './components/ListItem';
import ModalConfirm from '~/components/ModalConfirm';
import {useDispatch} from 'react-redux';
import { deleteAccessToken } from '~/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {patchTokenFirebase} from '~/services/tokenFirebase';

interface Props {
  route: RouteProp<MainStackParamList, 'Profile'>;
  navigation: StackNavigationProp<MainStackParamList, 'Profile'>;
}

const titles = [
  {
    title: 'よくある質問',
    link: 'https://faq.dev.miruho.com/',
  },
  {
    title: 'お問い合わせ',
    link: '',
  },
  {
    title: 'プライバシーステートメント',
    link: 'https://privacy.miruho.com/',
  },
  {
    title: '利用規約',
    link: 'https://terms.miruho.com/',
  },
  {
    title: '個人情報の取り扱いについて',
    link: 'https://milize.net/policy',
  },
];

export default function ProfileScreen({navigation}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showModalCfSignOut, setShowModalCfSignOut] = useState(false);
  const [showModalCfDelAccount, setShowModalCfDelAccount] = useState(false);
  const w = Dimensions.get('window').width;
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const userInfo: IUserInfoData = useSelector((state: IAllState) => {
    return state.user.userInfo;
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAcceptSignOut = async () => {
    setShowModalCfSignOut(false);
    const res = await SignOut(userInfo.email);
    await AsyncStorage.removeItem('dataToken');
    navigation.reset({
      index: 0,
      routes: [{name: 'Selection'}],
    });
    deleteAccessToken()
    dispatch({
      type: 'CLEAR_DATA',
    });
    dispatch({
      type: 'CLEAR_USER',
    });
    dispatch({
      type: 'CLEAR_SHARE',
    });
    dispatch({
      type: 'CLEAR_COM',
    });
    dispatch({
      type: 'CLEAR_NOTICE',
    });
    console.log('accept');
  };

  const handleRecjectSignOut = () => {
    setShowModalCfSignOut(false);
  };

  const handleRejectDelAccount = () => {
    setShowModalCfDelAccount(false);
  };

  const handleAcceptDelAccount = async () => {
    setShowModalCfDelAccount(false);
    setShowModal(false);
    const res = await DeleteAccount();
    console.log(res);
    if (res.status == 204) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Selection'}],
      });
    }
    console.log('accept del');
  };

  return (
    <Box flex={1} backgroundColor="white">
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Box
          paddingBottom={5}
          borderBottomWidth={1}
          borderColor="#ccc"
          width={w}
          position="absolute"
          bottom={0}
          left={0}
          backgroundColor="white">
          <Text style={profileStyles.modalTitle}>設定</Text>
          <Box borderBottomWidth={1} borderColor="#ccc">
            <Text
              borderTopWidth={1}
              borderColor="#ccc"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('ChangeEmail', {});
              }}
              style={profileStyles.modalOption}>
              メールアドレス変更
            </Text>
            <Text
              borderTopWidth={1}
              borderColor="#ccc"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('ChangePass', {});
              }}
              style={profileStyles.modalOption}>
              パスワード変更
            </Text>
            <Text
              borderTopWidth={1}
              borderColor="#ccc"
              onPress={() => {
                setShowModalCfDelAccount(true);
              }}
              style={profileStyles.modalDelete}>
              アカウント削除
            </Text>
          </Box>
        </Box>
      </Modal> */}
      <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <Actionsheet.Content>
          <Text style={profileStyles.modalTitle}>設定</Text>
          <Actionsheet.Item
            onPress={() => {
              setShowModal(false);
              navigation.navigate('ChangeEmail', {});
            }}
            borderTopWidth={1}
            borderColor="#ccc">
            メールアドレス変更
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setShowModal(false);
              navigation.navigate('ChangePass', {});
            }}
            borderTopWidth={1}
            borderColor="#ccc">
            パスワード変更
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setShowModalCfDelAccount(true);
            }}
            borderTopWidth={1}
            borderColor="#ccc"
            borderBottomWidth={1}>
            <Text style={{color:'red'}}>アカウント削除</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <ModalConfirm
        title="ログアウトしますか?"
        mess=""
        rejectText="キャンセル"
        acceptText="ログアウト"
        show={showModalCfSignOut}
        handleReject={handleRecjectSignOut}
        handleAccept={handleAcceptSignOut}></ModalConfirm>
      <ModalConfirm
        title="アカウントを削除します
        か?"
        mess="アカウントを削除すると、登録し
        た保険情報が失われます。"
        rejectText="キャンセル"
        acceptText="削除"
        show={showModalCfDelAccount}
        handleReject={handleRejectDelAccount}
        handleAccept={handleAcceptDelAccount}></ModalConfirm>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        paddingX={5}
        paddingY={5}>
        <Pressable
          onPress={() => {
            navigation.navigate('Notices', {});
          }}>
          <NotificationSVG />
        </Pressable>
        <Text style={profileStyles.boldText}>プロフィール</Text>
        <Pressable onPress={handleShowModal}>
          <SettingSVG />
        </Pressable>
      </Flex>
      <ScrollView>
        <Center>
          <Image
            style={profileStyles.avatarImg}
            alt="avatar"
            source={require('~/assets/images/avatar.png')}></Image>
          {userInfo.email != undefined ? (
            <Text style={profileStyles.boldText}>{userInfo.email}</Text>
          ) : (
            <Text style={profileStyles.boldText}>{userInfo}</Text>
          )}
        </Center>

        <Box borderBottomWidth={1} borderColor="#ccc" marginY={6}>
          {titles.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('WebView', {item: item});
                }}
                key={index}>
                <ListItem title={item.title}></ListItem>
              </Pressable>
            );
          })}
        </Box>
        <Box marginBottom={10} borderBottomWidth={1} borderColor="#ccc">
          <Pressable
            onPress={() => {
              setShowModalCfSignOut(true);
            }}>
            <ListItem title="ログアウト"></ListItem>
          </Pressable>
        </Box>
        <Center>
          <Image
            alt="logo"
            source={require('~/assets/images/logoSymbol.png')}></Image>
          <Text style={profileStyles.versionText}>3.0.13 (279)</Text>
        </Center>
      </ScrollView>
    </Box>
  );
}
