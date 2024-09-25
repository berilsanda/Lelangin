import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { auth } from "src/services/firebase";
import { signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { colors, size } from "src/data/globals";
import { AccountStackParamList } from "src/navigations/AccountNavigator";

type Props = NativeStackScreenProps<AccountStackParamList, "Account">;

export default function Account({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const onSignOut = () => {
    setLoading(true);
    try {
      signOut(auth);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "SplashScreen",
            },
          ],
        })
      );
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  interface ItemListProps {
    label: string;
    onPress: () => void;
    style?: ViewStyle;
    loading?: boolean;
  }

  const ItemList: React.FC<ItemListProps> = ({
    label,
    onPress,
    style,
    loading,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.itemList, style]}>
        {loading ? (
          <ActivityIndicator
            color={colors.grey.dark}
            size={18}
            style={{ marginRight: size.m }}
          />
        ) : null}
        <Text style={{ flex: 1 }}>{label}</Text>
        <Feather name="chevron-right" color={colors.grey.medium} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ItemList label="Edit Profil" onPress={() => {}} />
      <ItemList
        label="Ubah Password"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <ItemList
        label="Keluar"
        onPress={() => onSignOut()}
        style={{ borderBottomWidth: 0 }}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.xl
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: size.l,
    borderBottomWidth: 1,
    borderColor: colors.grey.light,
  },
});
