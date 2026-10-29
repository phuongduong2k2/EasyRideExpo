import {
  createNativeBottomTabNavigator,
  createNativeBottomTabScreen,
} from '@react-navigation/bottom-tabs/unstable';
import { Platform } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Updates } from './screens/Updates';

export const HomeTabs = createNativeBottomTabNavigator({
  screens: {
    Home: createNativeBottomTabScreen({
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: Platform.select({
          ios: { type: 'sfSymbol', name: 'newspaper' },
          default: { type: 'image', source: newspaper },
        }),
      },
    }),
    Updates: createNativeBottomTabScreen({
      screen: Updates,
      options: {
        tabBarIcon: Platform.select({
          ios: { type: 'sfSymbol', name: 'bell' },
          default: { type: 'image', source: bell },
        }),
      },
    }),
  },
});
