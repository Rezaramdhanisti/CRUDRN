import React from 'react';
import AuthLoadingScreen from './src/auth/AuthLoadingScreen';
import {View} from 'react-native';
import NavigationService from './src/utils/NavigationService';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AuthLoadingScreen
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}
