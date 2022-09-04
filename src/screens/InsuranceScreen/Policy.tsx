import React from 'react';
import {Box, Flex, Text, Image} from 'native-base';
import UserSVG from '~/assets/user.svg';
import Batch from '~/assets/batch.svg';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import RenderImage from './RenderImage';
import {renderUnit} from '~/utils/renderUnit';

export default function Policy(props: any) {
  const item = props.item;
  const {idUser} = props;

  return (
    <Box flex={1} px={1}>
      <Flex
        style={{overflow: 'hidden'}}
        direction="row"
        align="center"
        justify="space-between">
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#0B1D31'}}>
          {item.company}
        </Text>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#0B1D31'}}>
          {item.insurance_type}
        </Text>
      </Flex>
      <Flex py={3} direction="row" justify="space-between">
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B1D31'}}>
          {item.insurance_name ? item.insurance_name : item.insurance_type}
        </Text>
        <Flex flexDirection="row" alignItems="center">
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B1D31'}}>
            {item.premium}
          </Text>
          <Text style={{fontSize: 12, color: '#6C7883', marginLeft: 5}}>
            {item.premium_unit} / {renderUnit(item.premium_payment_method_ja)}
          </Text>
        </Flex>
      </Flex>
      <Flex flex={1} direction="row" overflow="hidden">
        <Flex flex={1} direction="row" alignItems="center">
          <UserSVG height={60} />
          <Box style={{width: 170}} px={2}>
            <Text style={{fontSize: 12, color: '#848F97', fontWeight: 'bold'}}>
              被保険者
            </Text>
            <Text style={{color: '#0B1D31'}}>{item.insured}</Text>
          </Box>
        </Flex>
        <Flex flex={1} direction="row" alignItems="center">
          <UserSVG height={60} />
          <Box style={{overflow: 'hidden'}} px={2}>
            <Text style={{fontSize: 12, color: '#848F97', fontWeight: 'bold'}}>
              受取人
            </Text>
            <Text style={{color: '#0B1D31'}}>{item.payee}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex direction="row" flexWrap="wrap">
        {item.insurance_labels?.map((item: any) => (
          <Box
            key={item.id}
            style={{
              padding: 1,
              margin: 3,
              paddingRight: 4,
              paddingLeft: 4,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            borderRadius={5}
            backgroundColor="#0766EF">
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {item.label_ja}
            </Text>
          </Box>
        ))}
      </Flex>

      <Box
        style={{
          position: 'absolute',
          right: 0,
          bottom: -40,
          zIndex: -100,
          opacity: 0.1,
        }}>
        <RenderImage width={180} height={180} type={item.display_type} />
      </Box>
      <Box
        style={{
          position: 'absolute',
          right: -20,
          bottom: -11,
          zIndex: -100,
        }}>
        {item.is_mine === false && <Batch width={24} height={24} />}
      </Box>
    </Box>
  );
}
