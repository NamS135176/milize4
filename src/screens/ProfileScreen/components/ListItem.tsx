import React from 'react';
import {Box, Flex, Text, Image} from 'native-base';

export default function ListItem(props) {
  return (
    <Flex
      borderTopWidth={1}
      borderTopColor="#ccc"
      justifyContent="space-between"
      flexDirection="row"
      padding={3}
      alignItems='center'>
      <Text>{props.title}</Text>
      <Image source={require('~/assets/images/front.png')} alt="front"></Image>
    </Flex>
  );
}
