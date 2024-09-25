import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import Home from "src/screens/Home/Home";
import Transaction from "src/screens/Transaction/Transaction";
import AddAuction from "src/screens/AddAuction";
import AccountNavigator from "./AccountNavigator";

export type StackParamList = {
  Home: undefined;
  Transaksi: undefined;
  AccountNav: undefined;
  TambahLelang: undefined;
};

const Stack = createBottomTabNavigator<StackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,

      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="Transaksi"
        component={Transaction}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="TambahLelang"
        component={AddAuction}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="AccountNav"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
