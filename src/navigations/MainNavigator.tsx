
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "screens/Login";
import Register from "screens/Register";
import SplashScreen from "src/screens/SplashScreen";
import HomeNavigator from "./HomeNavigator";

export type StackParamList = {
    HomeNav: undefined;
    Login: undefined;
    Register: undefined;
    SplashScreen: undefined;
  };

const Stack = createNativeStackNavigator<StackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeNav" component={HomeNavigator} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
