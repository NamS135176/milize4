import {Box, FlatList, Flex, Pressable, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import BackSVG from '~/assets/back.svg';
import TotalSVG from '~/assets/total.svg';
import {getAnnualSum} from '~/services/policyService';
import totalPolicyStyles from './TotalPolicyStyle';
import TotalLoad from './TotalLoad';
export default function Index(props: any) {
  const [annualSum, setAnnualSum] = useState<any>();
  console.log('annual', annualSum);
  useEffect(() => {
    const getData = async () => {
      const result = await getAnnualSum();
      setAnnualSum(result);
      // console.log(result);
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      {annualSum ? (
        <Box style={{backgroundColor: '#fafafa'}} flex={1}>
          <Flex
            backgroundColor="white"
            flexDirection="row"
            justifyContent="space-between"
            paddingX={5}
            paddingY={2}
            paddingTop={5}>
            <Pressable
              p={0}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <BackSVG />
            </Pressable>
            <Text p={0} style={totalPolicyStyles.boldText}>
              年間保険料合計
            </Text>
            <Text style={{opacity: 0}}>1</Text>
          </Flex>
          <Box
            style={{
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: 'white',
            }}>
            <TotalSVG />
            <Text
              style={{
                position: 'absolute',
                color: 'red',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {annualSum.annual_premium_sum}
              {annualSum.annual_premium_sum_unit}
            </Text>
          </Box>
          <Text
            style={{
              fontSize: 12,
              color: '#62717C',
              padding: 12,
              fontWeight: 'bold',
            }}>
            各契約の年間保険料
          </Text>
          <FlatList
            data={annualSum.insurance_policies.filter(item => {
              return item.status == 'done';
            })}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              if (item.status === 'done') {
                return (
                  <Pressable
                    onPress={() => {
                      console.log('qweqwe');
                      props.navigation.navigate('MainInsurance', {
                        screen: 'DetailPolicy',
                        params: {
                          insuranceId: item.id,
                        },
                      });
                    }}>
                    <Flex
                      style={totalPolicyStyles.itemPolicy}
                      direction="row"
                      justify="space-between">
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#0B1D31',
                          fontWeight: 'bold',
                        }}>
                        {item.insurance_name || '-'}
                      </Text>
                      <Flex direction="row" alignItems="center">
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingHorizontal: 4,
                          }}>
                          {item.annual_premium}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#A6AEB5',
                          }}>
                          {item.annual_premium_unit}
                        </Text>
                        <Box
                          style={{
                            paddingRight: 10,
                            // backgroundColor: 'red',
                            transform: [{rotate: '180deg'}],
                          }}>
                          <BackSVG />
                        </Box>
                      </Flex>
                    </Flex>
                  </Pressable>
                );
              } else {
                return <></>;
              }
            }}
          />
          <Box backgroundColor="#EDEEED" p={2} px={3} mx={3} my={2}>
            <Text style={{fontSize: 10}}>
              ・1米ドル=110円/1豪ドル=375円に円換算して表示しています。
            </Text>
            <Text style={{fontSize: 10}}>
              ・主たる保障内容や保険金額・給付金額を表示しております。詳しい保障内容は、保険証券を
              ご確認下さい。
            </Text>
          </Box>
        </Box>
      ) : (
        <Box style={{backgroundColor: '#fafafa'}} flex={1}>
          <TotalLoad />
        </Box>
      )}
    </SafeAreaView>
  );
}
