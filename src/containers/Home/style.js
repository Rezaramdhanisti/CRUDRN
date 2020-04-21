import {colors} from '../../utils/Colors';

export default {
  loginScreen: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    width: '80%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowLayer: {
    width: '90%',
    height: '70%',
    padding: '3%',
    marginBottom: '5%',
    borderRadius: 10,
    shadowColor: colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  imageBackground: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    height: 40,
  },
  loginTxtUp: {
    width: '100%',
    marginTop: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    backgroundColor: colors.YELLOW,
  },
  inputText: {
    height: '15%',
    marginBottom: 6,
  },
};
