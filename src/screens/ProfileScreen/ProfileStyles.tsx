import {StyleSheet} from 'react-native';

const profileStyles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  avatarImg: {
    width: 80,
    height: 80,
    marginVertical: 25,
  },
  versionText: {
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 30,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalDelete: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'red',
  },
});

export default profileStyles;
