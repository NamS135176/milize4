import React from 'react';
import {Modal, Text, Flex} from 'native-base';

export default function ModalConfirm(props) {
  return (
    <Modal isOpen={props.show} onClose={props.handleReject}>
      <Modal.Content maxWidth="80%">
        <Text style={{fontSize: 23, paddingBottom: 20}}>{props.title}</Text>
        {props.mess && (
          <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
            {props.mess}
          </Text>
        )}
        <Flex flexDirection="row" justifyContent="flex-end">
          <Text
            onPress={props.handleReject}
            style={{
              textAlign: 'right',
              paddingHorizontal: 15,
              paddingVertical: 20,
              color: '#2097f3',
            }}>
            {props.rejectText}
          </Text>
          <Text
            onPress={props.handleAccept}
            style={{
              textAlign: 'right',
              paddingHorizontal: 15,
              paddingVertical: 20,
              color: '#2097f3',
            }}>
            {props.acceptText}
          </Text>
        </Flex>
      </Modal.Content>
    </Modal>
  );
}
