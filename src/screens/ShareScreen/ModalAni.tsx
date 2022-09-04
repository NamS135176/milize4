import React from 'react';
import Modal from 'react-native-modal';
import {Box, Text, Center, Flex} from 'native-base';
import CheckSVG from '~/assets/images/check_white.svg'
export default function ModalAni(Props) {
  return (
    <Modal
      hasBackdrop={false}
      coverScreen={true}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationOutTiming={1500}
      isVisible={Props.show}>
      <Flex marginTop={8} flex={1} justifyContent="center" alignItems="flex-start" flexDirection="row">
        <Flex alignItems='center' flexDirection='row' style={{paddingVertical:4, paddingHorizontal:8}} borderRadius={20} backgroundColor='#0766EF'>
          <CheckSVG/>
          <Text style={{fontSize:12, color:'white', paddingLeft:10}}>{Props.text}</Text>
        </Flex>
      </Flex>
    </Modal>
  );
}
