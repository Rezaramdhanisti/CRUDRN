import React, {PureComponent} from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/Colors';
import {config} from '../../utils/Constants';
import GestureRecognizer from '../../utils/GestureRecognizer';
import styles from './style';

let trackingData;
export default class EventDetails extends PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Event Details',
      headerTintColor: colors.WHITE,
      headerStyle: {
        backgroundColor: colors.YELLOW,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      from: false,
    };
  }

  componentDidMount() {
    let item = this.props.navigation.getParam('item', {});
    let from = this.props.navigation.getParam('from', false);
    this.setState({item, from});
  }

  render() {
    const {item} = this.state;
    return (
      <SafeAreaView style={styles.parentContainer}>
        <GestureRecognizer
          onSwipeLeft={() => {
            this.getUserDataIfExist();
          }}
          config={config}
          style={styles.gestureStyle}>
          <View style={styles.parentListImage}>
            <Image source={{uri: item.imageUrl}} style={styles.listImage} />
            <View style={styles.listItem}>
              {this.renderCustomTextInputLayout('Event Name', item.name)}
              {this.renderCustomTextInputLayout('Location', item.place)}
              {this.renderCustomTextInputLayout(
                'Entry Type',
                item.freeEntry === 1 ? 'Free Entry' : 'Paid Entry',
              )}
              {!this.state.from && (
                <TouchableOpacity
                  onPress={() => {
                    // add it to the local storage
                    this.updateStorage(item);
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Add To Tracking</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
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

  updateStorage(selectedItem) {
    let userName = global.userName;
    AsyncStorage.getItem(userName)
      .then((stringData) => {
        try {
          let data = JSON.parse(stringData);
          if (data && data.length > 0) {
            let isDataExist = data.find(function (item) {
              return item.id === selectedItem.id;
            });
            if (!!isDataExist) {
              this.props.navigation.goBack();
              this.showMessage('Event already exist in tracking list.');
            } else {
              data.push(selectedItem);
              AsyncStorage.setItem(userName, JSON.stringify(data));
              this.showMessage();
            }
          } else {
            this.insertThisAsFresh(selectedItem);
          }
        } catch (e) {
          this.insertThisAsFresh(selectedItem);
        }
      })
      .catch((err) => {
        if (err) {
          this.insertThisAsFresh(selectedItem);
        }
      });
  }

  insertThisAsFresh(selectedItem) {
    let data = [];
    data.push(selectedItem);
    AsyncStorage.setItem(userName, JSON.stringify(data));
    this.showMessage();
  }

  showMessage(msg) {
    Alert.alert(
      'Event Added',
      msg ? msg : 'Event added successfully to your tracking list.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ],
    );
  }

  renderCustomTextInputLayout(title, value) {
    return (
      <View style={styles.styleCustomInput}>
        <Text style={styles.itemNameLabel}>{title}</Text>
        <Text style={styles.itemName}>{value}</Text>
      </View>
    );
  }
}
