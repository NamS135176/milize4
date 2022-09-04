import {Box, Flex, Text} from 'native-base';
import React from 'react';
import detailPolicyStyles from './DetailPolicyStyles';

const arrInsuranceLabel = [
  '死亡',
  '入院',
  '手術',
  '通院',
  'がん',
  '就労不能',
  '三大疾病',
  '七大疾病',
  '介護',
  '先進医療',
  '女性疾病',
  '貯蓄性',
  '特定疾患',
];
export default function LabelLoad() {
  return (
    <Box>
      <Box py={3}>
        <Text style={detailPolicyStyles.fontSmallP0}>保障対象</Text>
      </Box>
      <Flex flexWrap="wrap" direction="row">
        {arrInsuranceLabel.map((item, index) => {
          return (
            <Box
              key={index}
              borderRadius={5}
              style={{
                backgroundColor: '#b1cef7',
                margin: 3,
                paddingRight: 4,
                paddingLeft: 4,
                paddingTop: 2,
                paddingBottom: 2,
              }}>
              <Text style={{color: 'white', fontSize: 12}}>{item}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}
