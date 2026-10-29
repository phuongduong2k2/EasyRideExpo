import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from '@react-navigation/native-stack';
import { HomeTabs } from './HomeTabs';
import { NotFound } from './screens/NotFound';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: createNativeStackScreen({
      screen: HomeTabs,
      options: {
        title: 'Home',
      },
    }),
    Profile: createNativeStackScreen({
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    }),
    Settings: createNativeStackScreen({
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    }),
    NotFound: createNativeStackScreen({
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    }),
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
