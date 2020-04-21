import React, {PureComponent} from 'react';
import {
  AsyncStorage,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {colors} from '../../utils/Colors';
import {EventListData} from '../../utils/EventListData';
import {Card} from 'native-base';
import GestureRecognizer from '../../utils/GestureRecognizer';
import {config} from '../../utils/Constants';
import styles from './style';

let trackingData;
export default class EventList extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Event List',
      headerTintColor: colors.WHITE,
      headerStyle: {
        backgroundColor: colors.YELLOW,
      },
    };
  };
  _renderType = () => {
    return (
      <View style={styles.styleRenderType}>
        <Card style={styles.styleCard}>
          <TouchableOpacity
            style={
              this.state.type === true
                ? styles.viewSelectedStyle
                : styles.viewNotSelectedStyle
            }
            onPress={() => {
              setTimeout(() => this.setState({type: true}), 0);
            }}>
            <Text
              style={{
                color: this.state.type === true ? colors.WHITE : colors.BLACK,
                fontWeight: 'bold',
              }}>
              ListView
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              this.state.type === false
                ? styles.viewSelectedStyle
                : styles.viewNotSelectedStyle
            }
            onPress={() => {
              setTimeout(() => this.setState({type: false}), 0);
            }}>
            <Text
              style={{
                color: this.state.type === false ? colors.WHITE : colors.BLACK,
                fontWeight: 'bold',
              }}>
              GridView
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  _keyExtractor = (item) => item.id;

  renderListView = (items) => {
    return (
      <FlatList
        data={items}
        contentContainerStyle={styles.paddingBot80}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EventDetails', {item: item})
            }
            style={styles.listItemContainer}>
            <View style={styles.styleParentListItem}>
              <View style={[styles.listItemContainer]}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={styles.listImage}
                  onError={() => {}}
                />
                <View style={styles.styleListItem}>
                  {this.renderCustomTextInputLayout('Event Name', item.name)}
                  {this.renderCustomTextInputLayout('Location', item.place)}
                  {this.renderCustomTextInputLayout(
                    'Entry Type',
                    item.freeEntry === 1 ? 'Free Entry' : 'Paid Entry',
                  )}
                </View>
              </View>
              <View style={styles.borderStyle} />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  renderGridView = (items) => {
    return (
      <FlatGrid
        items={items}
        keyExtractor={this._keyExtractor}
        contentContainerStyle={styles.paddingBot80}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('EventDetails', {item: item})
              }
              style={styles.itemContainer}>
              <ImageBackground
                style={styles.itemContainer}
                source={{uri: item.imageUrl}}>
                <Text style={styles.gridItemName}>{item.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      type: true,
    };
  }

  renderCustomTextInputLayout(title, value) {
    return (
      <View style={styles.styleCustomInput}>
        <Text style={styles.itemNameLabel}>{title}</Text>
        <Text style={styles.itemName} numberOfLines={1}>
          {value}
        </Text>
      </View>
    );
  }

  render() {
    const items = EventListData;
    return (
      <SafeAreaView>
        <GestureRecognizer
          onSwipeLeft={() => {
            this.getUserDataIfExist();
          }}
          config={config}>
          {this._renderType()}
          {this.state.type === true
            ? this.renderListView(items)
            : this.renderGridView(items)}
        </GestureRecognizer>
      </SafeAreaView>
    );
  }

  getUserDataIfExist() {
    let userName = global.userName;
    AsyncStorage.getItem(userName).then((data) => {
      trackingData = data;
      if (trackingData && trackingData !== '[]') {
        this.props.navigation.navigate('EventTracking', {
          data: JSON.parse(trackingData),
        });
      } else {
        alert("You don't have any events in tracking list");
      }
    });
  }
}
