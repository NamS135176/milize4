import {StyleSheet} from 'react-native';

const totalPolicyStyles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  itemPolicy: {
    padding: 15,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 12,
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
    // transform: [{translateX: }],
  },
});

export default totalPolicyStyles;
