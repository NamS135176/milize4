import {StyleSheet} from 'react-native';

const postStyles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  textDisable: {
    paddingLeft: 10,
    color: '#bbb',
  },
  textShow: {
    paddingLeft: 10,
    color: '#000',
  },
  itemCompany: {
    borderTopWidth: 1,
    padding: 7,
    borderColor: '#cfd4d9',
    alignItems: 'center',
  },
});

export default postStyles;
