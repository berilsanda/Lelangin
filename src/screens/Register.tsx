import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppTextInputs, Buttons } from "components/atoms";
import { colors, size } from "data/globals";
import { UserRegister } from "src/services/firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "src/navigations/MainNavigator";

type UserData = { email: string; password: string };

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Format email salah")
    .required("Silahkan masukkan email"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Silahkan masukkan password"),
  cpassword: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Silahkan masukkan konfirmasi password")
    .oneOf(
      [yup.ref("password"), ""],
      "Konfirmasi Password harus sama dengan Password"
    ),
});

type Props = NativeStackScreenProps<StackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: UserData) {
    setLoading(true);
    try {
      await UserRegister(data.email, data.password);
      reset();
      navigation.navigate("SplashScreen");
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          style={{
            height: 40,
            width: WINDOW_WIDTH * 0.75,
            alignSelf: "center",
            marginTop: WINDOW_HEIGHT * 0.25,
            marginBottom: 64,
          }}
          resizeMode="contain"
          source={require("../../assets/logo.png")}
        />
        <AppTextInputs
          name="email"
          label="Email"
          placeholder="Masukkan email anda"
          control={control}
          disabled={loading}
        />
        <AppTextInputs
          name="password"
          label="Password"
          placeholder="Masukkan password anda"
          secureTextEntry
          control={control}
          disabled={loading}
        />
        <AppTextInputs
          name="cpassword"
          label="Konfirmasi Password"
          placeholder="Masukkan kembali password anda"
          secureTextEntry
          control={control}
          disabled={loading}
        />
        <Buttons
          label="Daftar"
          onPress={handleSubmit(onSubmit)}
          style={{ marginBottom: size.l }}
          disabled={loading}
          loading={loading}
        />
        <Text style={{ textAlign: "center" }}>
          Sudah punya akun?{" "}
          <Text
            style={{ fontWeight: "700", color: colors.primary }}
            suppressHighlighting
            onPress={() => navigation.navigate("Login")}
          >
            Masuk disini.
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.xl,
    paddingVertical: size.l,
  },
});
