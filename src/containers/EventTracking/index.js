import React, {PureComponent} from 'react';
import {
  AsyncStorage,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/Colors';
import GestureRecognizer from '../../utils/GestureRecognizer';
import {config} from '../../utils/Constants';
import styles from './style';

export default class EventTracking extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Tracking List',
      headerTintColor: colors.WHITE,
      headerStyle: {
        backgroundColor: colors.YELLOW,
      },
    };
  };

  componentDidMount() {
    let data = this.props.navigation.getParam('data', {});
    this.setState({data});
  }

  _keyExtractor = (item) => item.id;

  renderListView = (items) => {
    const {navigation} = this.props;
    return (
      <FlatList
        data={items}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={this._keyExtractor}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EventDetails', {
                item: item,
                from: true,
              })
            }
            style={styles.listItemContainer}>
            <View style={styles.parentFlatList}>
              <View style={[styles.listItemContainer]}>
                <Image source={{uri: item.imageUrl}} style={styles.listImage} />
                <View style={styles.viewContainerList}>
                  {this.renderCustomTextInputLayout('Event Name', item.name)}
                  {this.renderCustomTextInputLayout('Location', item.place)}
                  {this.renderCustomTextInputLayout(
                    'Entry Type',
                    item.freeEntry === 1 ? 'Free Entry' : 'Paid Entry',
                  )}
                </View>
                <View style={styles.viewParentIcon}>
                  <TouchableOpacity
                    onPress={() => {
                      let filteredData = this.state.data.filter(
                        (Item) => Item.id !== item.id,
                      );
                      this.setState({data: filteredData});
                      let userName = global.userName;
                      AsyncStorage.setItem(
                        userName,
                        JSON.stringify(filteredData),
                      );
                    }}>
                    <Image
                      style={styles.iconStyle}
                      source={require('../../assets/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.borderStyle} />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  renderCustomTextInputLayout(title, value) {
    return (
      <View style={styles.viewCustomInput}>
        <Text style={styles.itemNameLabel}>{title}</Text>
        <Text style={styles.itemName} numberOfLines={1}>
          {value}
        </Text>
      </View>
    );
  }

  render() {
    const {data} = this.state;
    return (
      <SafeAreaView>
        <GestureRecognizer
          onSwipeRight={() => {
            this.props.navigation.goBack();
          }}
          config={config}>
          {this.renderListView(data)}
        </GestureRecognizer>
      </SafeAreaView>
    );
  }
}
