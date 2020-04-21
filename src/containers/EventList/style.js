import {colors} from '../../utils/Colors';

export default {
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    height: 150,
    backgroundColor: colors.WHITE,
  },
  listItemContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    height: 150,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
  },
  listImage: {
    height: 130,
    width: 150,
    alignSelf: 'center',
  },
  itemNameLabel: {
    fontSize: 12,
    color: '#bd7fc3',
  },
  itemName: {
    fontSize: 14,
    color: colors.BLACK,
  },
  gridItemName: {
    fontSize: 14,
    color: colors.WHITE,
    fontWeight: '600',
    marginLeft: 4,
    position: 'absolute',
    bottom: 0,
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  viewSelectedStyle: {
    borderRadius: 30,
    width: 100,
    padding: 5,
    backgroundColor: colors.YELLOW,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewNotSelectedStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  styleRenderType: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  styleCard: {
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'space-between',
  },
  paddingBot80: {
    paddingBottom: 80,
  },
  styleParentListItem: {
    flex: 1,
    flexDirection: 'column',
  },
  styleListItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    alignSelf: 'center',
  },
  borderStyle: {
    height: 1,
    backgroundColor: colors.GRAY,
  },
  styleCustomInput: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
};
