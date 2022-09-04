import React, {useEffect} from 'react';
import {Box, Flex, Text, ScrollView, FlatList, Center} from 'native-base';
import {RouteProp} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Cancel from '../../assets/images/cancel.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable} from 'react-native';
import Document from '../../assets/images/document.svg';
import {getNoticeDetail} from '~/services/noticeService';
import SafeAreaView from 'react-native-safe-area-view';
import FastImage from 'react-native-fast-image';
import NoticeImage from '~/components/NoticeImage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
interface Props {
  route: RouteProp<MainStackParamList, 'Notices'>;
  navigation: StackNavigationProp<MainStackParamList, 'Notices'>;
}
export default function NoticesScreen({navigation}: Props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused === true) {
      console.log(isFocused);
      dispatch({
        type: 'GET_NOTICES',
      });
    }
  }, [isFocused]);

  const listNotices: INoticeState = useSelector((state: IAllState) => {
    return state.notice;
  });
  // if (listNotices.loading) {
  //   return <Spinner visible={true} textStyle={{color: '#FFF'}} />;
  // } else {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Spinner visible={listNotices.loading} textStyle={{color: '#FFF'}} />
      {/* {listNotices?.listNotices?.length == 0 ? (
        <Center>
          <Text>There are no notification.</Text>
        </Center>
      ) : ( */}
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
                //     routes: [{ name: 'Main' }],
                // });
                navigation.goBack();
              }}>
              <Cancel></Cancel>
            </Pressable>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>通知</Text>
            <Box opacity={0}>
              <Cancel></Cancel>
            </Box>
          </Flex>
          <Box paddingBottom={100}>
            <FlatList
              data={listNotices.listNotices}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <Pressable
                    onPress={async () => {
                      const data = await getNoticeDetail(item.id);
                      navigation.navigate('NoticeDetail', {notice: item});
                    }}>
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      marginX={3}
                      paddingY={3}
                      borderColor="#CFD4D9"
                      borderBottomWidth={1}>
                      {item.is_read ? (
                        <Box
                          opacity={0}
                          width={2}
                          height={2}
                          borderRadius={10}
                          backgroundColor="#F53D5E"></Box>
                      ) : (
                        <Box
                          width={2}
                          height={2}
                          borderRadius={10}
                          backgroundColor="red"></Box>
                      )}
                      <Box paddingY={5} paddingRight={3}>
                        <NoticeImage noticeKind={item.notice_kind} />
                      </Box>
                      <Box>
                        <Text style={{fontSize: 12, paddingVertical: 5}}>
                          {moment(Date.parse(item.created_at)).format(
                            'yyyy年MM月DD日',
                          )}
                        </Text>
                        <Text style={{fontSize: 14, paddingVertical: 5}}>
                          {item.title}
                        </Text>
                      </Box>
                    </Flex>
                  </Pressable>
                );
              }}></FlatList>
          </Box>
        </Box>
      {/* )} */}
    </SafeAreaView>
  );
}
// }
