import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "screens/Login";
import Register, { UserRegisterData } from "screens/Register/Register";
import SplashScreen from "src/screens/SplashScreen";
import HomeNavigator from "./HomeNavigator";
import UserDetail from "src/screens/Register/UserDetail";
import AddAuction from "src/screens/AddAuction";
import DetailAuction from "src/screens/DetailAuction";
import { ProductType } from "src/screens/Home";

export type StackParamList = {
  HomeNav: undefined;
  Login: undefined;
  Register: undefined;
  UserDetail: UserRegisterData;
  SplashScreen: undefined;
  TambahLelang: undefined;
  DetailLelang: ProductType;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="HomeNav" component={HomeNavigator} />
      <Stack.Screen
        name="TambahLelang"
        component={AddAuction}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: "Tambah Lelang",
        }}
      />
      <Stack.Screen
        name="DetailLelang"
        component={DetailAuction}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: "Detail Lelang",
        }}
      />
    </Stack.Navigator>
  );
}
