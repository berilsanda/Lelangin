import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar as Bar,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppTextInputs, Buttons } from "components/atoms";
import { colors, size, typography } from "data/globals";
import { auth, createUser, UserRegister } from "src/services/firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "src/navigations/MainNavigator";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import uploadImageAsync from "src/services/uploadImageAsync";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "src/reduxs/reducer/persistReducer";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Silahkan masukkan nomor telepon anda"),
  streetAddress: yup.string().required("Silahkan masukkan alamat anda"),
  city: yup.string().required("Silahkan masukkan kota anda tinggal"),
  zipCode: yup.string().required("Silahkan masukkan kode pos anda"),
});

type Props = NativeStackScreenProps<StackParamList, "UserDetail">;

export default function UserDetail({ navigation, route: { params } }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  }

  async function onSubmit(data: {
    phoneNumber: string;
    streetAddress: string;
    city: string;
    zipCode: string;
  }) {
    setLoading(true);
    try {
      const registerUser = await UserRegister(params.email, params.password);

      if (registerUser) {
        const pathToUpload = `User/${registerUser.uid}/Profil`;
        const photo = await uploadImageAsync(userImage!, pathToUpload, `photo`);

        let sendData = {
          address: {
            city: data.city,
            streetAddress: data.streetAddress,
            zipCode: data.zipCode,
          },
          createdAt: new Date(),
          displayName: params.displayName,
          email: params.email,
          favorites: [],
          lastLogin: new Date(),
          phoneNumber: parseInt(data.phoneNumber),
          photoURL: photo,
          uid: registerUser.uid,
          updateAt: new Date(),
        };

        await createUser(sendData);

        const currentUser = auth.currentUser;
        await updateProfile(currentUser!, {
          displayName: params.displayName,
          photoURL: photo,
        });

        dispatch(setUser(sendData));
      }
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ ...typography.paragraph4, color: colors.textSecondary }}>
          Langkah 2 dari 2
        </Text>
        <Text style={{ ...typography.heading2, marginBottom: size.xl }}>
          Data Pengguna
        </Text>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => pickImage()}
            style={{ alignSelf: "center", marginBottom: size.l }}
          >
            {!!userImage ? (
              <Image
                source={{ uri: userImage }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.image}>
                <MaterialCommunityIcons
                  name="image-off-outline"
                  color={colors.grey.dark}
                  size={20}
                />
              </View>
            )}
          </TouchableOpacity>

          {!!userImage ? (
            <TouchableOpacity
              style={styles.deleteImage}
              onPress={() => setUserImage(null)}
            >
              <MaterialCommunityIcons name="close" size={14} />
            </TouchableOpacity>
          ) : null}
        </View>
        {/** TODO: create app text input mask */}
        <AppTextInputs
          name="phoneNumber"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon anda"
          keyboardType="phone-pad"
          control={control}
          disabled={loading}
        />
        {/** TODO: integrate google place autocomplete */}
        <AppTextInputs
          name="streetAddress"
          label="Alamat"
          placeholder="Masukkan alamat anda"
          control={control}
          disabled={loading}
        />
        {/** TODO: app picker for city list */}
        <AppTextInputs
          name="city"
          label="Kota"
          placeholder="Masukkan kota anda tinggal"
          control={control}
          disabled={loading}
        />
        <AppTextInputs
          name="zipCode"
          label="Kode Pos"
          placeholder="Masukkan kode pos alamat anda"
          keyboardType="numeric"
          maxLength={6}
          control={control}
          disabled={loading}
        />
      </ScrollView>
      <View style={{ paddingHorizontal: size.xl }}>
        <Buttons
          label="Daftar"
          onPress={handleSubmit(onSubmit)}
          style={{ marginBottom: size.l }}
          disabled={loading}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.xl,
    paddingVertical: size.l,
    paddingTop: Bar?.currentHeight! + size.l,
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: size.s,
    overflow: "hidden",
    backgroundColor: colors.grey.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: size.l,
  },
  deleteImage: {
    position: "absolute",
    right: "40%",
    top: -12,
    backgroundColor: colors.primaryContainer,
    borderRadius: 50,
    padding: 4,
  },
});
