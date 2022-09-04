import React, {useEffect} from 'react';
import {Box, Flex, Pressable, Text} from 'native-base';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Cancel from '~/assets/images/cancel.svg';
import Back from '../../assets/images/back.svg';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getPolicyDetail, checkListPolicy} from '~/services/policyService';
import NoticeImage from '~/components/NoticeImage';
import SafeAreaView from 'react-native-safe-area-view';
import HTMLView from 'react-native-htmlview';
import Document from '~/assets/images/document.svg';
interface Props {
  route: RouteProp<MainStackParamList, 'NoticeDetail'>;
  navigation: StackNavigationProp<MainStackParamList, 'NoticeDetail'>;
}

const styles = StyleSheet.create({
  p: {
    margin: 0,
    padding: 0,
  },
});
export default function NoticeDetailScreen({route, navigation}: Props) {
  useEffect(() => {}, []);

  const {notice} = route.params;
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box>
        <Flex
          backgroundColor="white"
          flexDirection="row"
          justifyContent="space-between"
          padding={3}>
          <Pressable
            onPress={() => {
              // navigation.reset({
              //     index: 0,
              //     routes: [{ name: 'Notices' }],
              // });
              // dispatch({
              //   type: 'GET_NOTICES',
              // });
              navigation.navigate('Notices', {});
            }}>
            <Back />
          </Pressable>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>詳細</Text>
          <Box opacity={0}>
            <Cancel></Cancel>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginX={3} paddingY={3}>
          <Box paddingY={5} paddingRight={5}>
            <NoticeImage noticeKind={notice.notice_kind}></NoticeImage>
          </Box>
          <Box>
            <Text style={{fontSize: 12, paddingVertical: 5, fontWeight:'bold'}}>
              {moment(Date.parse(notice.created_at)).format('yyyy年MM月DD日')}
            </Text>
            <Text style={{fontSize: 14, paddingVertical: 5}}>
              {notice.title}
            </Text>
          </Box>
        </Flex>
        <Box paddingX={5}>
          <HTMLView
            value={`<div>${notice.content.replace(/(\r\n|\n|\r)/gm, '')}</div>`}
            stylesheet={styles}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
