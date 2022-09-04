import {StyleSheet} from 'react-native';

const detailPolicyStyles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  itemPolicy: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 48,
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 24,
    // left: '50%',
    zIndex: 100,
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
  modalShare: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  textShare: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '17%',
    marginTop: 40,
    lineHeight: 40,
  },
  fontSmall: {
    fontSize: 12,
    color: '#6C7883',
    padding: 16,
    fontWeight: 'bold',
  },
  fontSmallP0: {
    fontSize: 12,
    color: '#6C7883',
    lineHeight: 20,
    fontWeight: 'bold',
  },
  fontNormal: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default detailPolicyStyles;
