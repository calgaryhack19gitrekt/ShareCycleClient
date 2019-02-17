import { createStackNavigator } from "react-navigation"
import { TabBarApp } from "./tab-bar-navigator"
import WelcomeScreen from '../screens/welcome-screen'


export const RootNavigator = createStackNavigator(
  {
    welcomeScreen: { screen: WelcomeScreen },
    app: { screen: TabBarApp },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: true },
  },
)
