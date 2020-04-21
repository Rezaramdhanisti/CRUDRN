import {colors} from '../../utils/Colors';

export default {
  listImage: {
    flex: 1,
    height: 140,
    width: '100%',
    padding: 10,
    alignSelf: 'center',
  },
  itemNameLabel: {
    fontSize: 14,
    color: '#bd7fc3',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
  button: {
    backgroundColor: colors.YELLOW,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
    padding: 6,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    color: colors.WHITE,
  },
  parentContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  gestureStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  parentListImage: {
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 5,
  },
  styleCustomInput: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
  },
};
