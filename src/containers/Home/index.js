import React, {PureComponent} from 'react';
import {
  AsyncStorage,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Container, Input, Item, Text} from 'native-base';
import {loginString} from '../../utils/Constants';
import styles from './style';

class Home extends PureComponent {
  static navigationOptions = {
    title: 'Welcome',
    headerLeft: null,
    headerStyle: {display: 'none'},
  };
  onUpdate = () => {
    this.setState({
      isLoading: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
    };
    global.userName = '';
  }

  componentWillUnmount() {
    if (this.state.isLoading) {
      this.onUpdate();
    }
  }

  getUserDataIfExist(userName) {
    const {navigation} = this.props;

    if (!userName) {
      alert(loginString.userNameBlank);
    } else {
      global.userName = userName;
      AsyncStorage.getItem(userName)
        .then((data) => {
          if (data && data !== '[]') {
            navigation.navigate('EventTracking', {
              data: JSON.parse(data),
            });
          } else {
            navigation.navigate('EventList');
          }
        })
        .catch((err) => {
          if (err) {
            navigation.navigate('EventList');
          }
        });
    }
  }

  //Handle Text Change Event
  userNameChangeHandler(text) {
    this.setState({
      username: text,
    });
  }

  render() {
    const {username} = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        onPressIn={() => {
          Keyboard.dismiss();
        }}
        onPressOut={() => {
          Keyboard.dismiss();
        }}>
        <Container>
          <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" />

            <View style={styles.loginScreen}>
              <View style={styles.windowLayer}>
                <Item style={styles.inputText}>
                  <Input
                    style={styles.input}
                    placeholder={loginString.enterEmail}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    multiline={false}
                    autoCorrect={false}
                    numberOfLines={1}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onChangeText={(text) => this.userNameChangeHandler(text)}
                    value={username}
                    blurOnSubmit={true}
                  />
                </Item>
                <Button
                  block
                  full
                  style={styles.button}
                  onPress={() => {
                    this.getUserDataIfExist(username);
                  }}>
                  <Text>Login</Text>
                </Button>
              </View>
            </View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

export default Home;
