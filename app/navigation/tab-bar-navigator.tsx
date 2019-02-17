import React from 'react'
import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation"
import { Icon } from 'react-native-elements'

import MapScreen from "../screens/map-screen"
import ProfileScreen from "../screens/profile-screen"

export const TabBarApp = createBottomTabNavigator(
  {
    map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: (focused: boolean, horizontal: boolean, tintColor: string) => {
          return (<View><Icon name='map-pin' type={'feather'} color={tintColor} /></View>);
        }
      }
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: (focused: boolean, horizontal: boolean, tintColor: string) => {
          return (<View><Icon name='user' type={'feather'} color={tintColor} /></View>);
        }
      }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "#6CB76A",
      inactiveTintColor: "#2A7028"
    }
  }
);