import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { colors } from "src/data/globals";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "src/navigations/MainNavigator";
import { auth } from "src/services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "src/reduxs/reducer/persistReducer";
import { onAuthStateChanged } from "firebase/auth";
import _ from 'lodash';

const { width, height } = Dimensions.get("screen");

type Props = NativeStackScreenProps<StackParamList, "SplashScreen">;

export default function SplashScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persist.userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let currentUser = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoUrl: user.photoURL,
        };
        if (!_.isEqual(userData, currentUser)) {
          dispatch(setUser(currentUser));
        }
        return navigation.replace("HomeNav");
      } else {
        return navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ height: height, width: width }}
        resizeMode="cover"
        source={require("assets/splash.png")}
      />
      <Text style={styles.versionText}>Ver 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  versionText: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 16,
    textAlign: "center",
    zIndex: 99,
    color: colors.grey.dark,
  },
});
