import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import { colors, size } from "src/data/globals";
import {
  AppTextInputs,
  AppTextInputMasks,
  Buttons,
  RadioGroups,
} from "src/components/atoms";
import AppDateTimePicker from "src/components/atoms/App/AppDateTimePicker";
import PictureListUploader from "src/components/molecules/PictureListUploader";
import moment from "moment";
import { useSelector } from "react-redux";
import { addProducts } from "src/services/firebase";
import { STORAGE_BUCKET } from "src/env";
import uploadImageAsync from "src/services/uploadImageAsync";
import { StackParamList } from "src/navigations/MainNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const schema = yup.object().shape({
  title: yup.string().required("Silahkan isi nama barang."),
  description: yup.string().required("Silahkan masukkan deskripsi barang."),
  timeAuctionEnd: yup.string().required("Silahkan pilih jam berakhir lelang."),
  dateAuctionEnd: yup
    .string()
    .required("Silahkan pilih tanggal berakhir lelang.")
    .test(
      "dateInNotPast",
      "Tidak bisa pilih tanggal kemarin.",
      (value) => !value || moment(value).isSameOrAfter(moment(), "day")
    ),
});

type Props = NativeStackScreenProps<StackParamList, "TambahLelang">;

export default function AddAuction({ navigation }: Props) {
// Todo : 
// - Fix validation for picture, conditions, auction end time
// - add loading spinner animations
// - Add image lightbox to uploader component

  const [loading, setLoading] = useState(false);
  const [conditions, setConditons] = useState();
  const [pictureList, setPictureList] = useState<string[]>([]);
  const [imageError, setImageError] = useState("");
  const userData = useSelector((state: any) => state.persist.userData);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  function parseCurrency(input: string): number {
    return parseInt(input.replace(/Rp|\s|\./g, ""));
  }

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      let productId = uuid.v4();

      // upload image
      const pathToUpload = `Product/${productId}/Images`;
      const imageList = await Promise.all(
        pictureList.map(async (picture) => {
          let image = picture;
          if (!picture.includes(STORAGE_BUCKET)) {
            const imageId = uuid.v4();
            image = await uploadImageAsync(
              picture,
              pathToUpload,
              `image ${imageId}`
            );
          }
          return image;
        })
      );

      // combine time date data
      const dateAuctionEnd = new Date(data.dateAuctionEnd);
      const timeAuctionEnd = new Date(data.timeAuctionEnd);

      dateAuctionEnd.setHours(timeAuctionEnd.getHours());
      dateAuctionEnd.setMinutes(timeAuctionEnd.getMinutes());
      dateAuctionEnd.setSeconds(timeAuctionEnd.getSeconds());
      dateAuctionEnd.setMilliseconds(timeAuctionEnd.getMilliseconds());

      let sendData = {
        id: productId,
        auctionEnd: dateAuctionEnd,
        bidder: [],
        condition: conditions,
        createdAt: new Date(),
        createdBy: userData.uid,
        currentBid: 0,
        description: data.description,
        images: imageList,
        startingBid: parseCurrency(data.startingBid),
        status: "active",
        stepBid: parseCurrency(data.stepBid),
        title: data.title,
        winner: null,
      };

      await addProducts(sendData);

      reset();
      setPictureList([]);
      setConditons(undefined);
      Alert.alert("Berhasil", "Lelang anda berhasil ditambah!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: size.l }}
      >
        <PictureListUploader
          label="Foto Barang"
          pictureList={pictureList}
          setPictureList={setPictureList}
          error={imageError}
        />
        <AppTextInputs
          name="title"
          label="Nama Barang"
          placeholder="Masukkan nama barang"
          control={control}
          disabled={loading}
        />
        <AppTextInputs
          name="description"
          label="Deskripsi Barang"
          placeholder="Masukkan deskripsi barang"
          control={control}
          disabled={loading}
          multiline
          numberOfLines={5}
        />
        <RadioGroups
          label="Kondisi Barang"
          data={[
            { label: "Baru", value: "new" },
            { label: "Bekas", value: "used" },
          ]}
          value={conditions}
          setValue={setConditons}
          style={{ flexDirection: "row" }}
        />

        <View style={styles.separator} />

        <AppTextInputMasks
          name="startingBid"
          label="Harga Awal"
          placeholder="Masukkan harga awal"
          control={control}
          disabled={loading}
          defaultValue="0"
          keyboardType="numeric"
          type="money"
          options={{
            precision: 0,
            separator: "",
            delimiter: ".",
            unit: "Rp ",
          }}
        />
        <AppTextInputMasks
          name="stepBid"
          label="Kelipatan Harga (Opsional)"
          placeholder="Masukkan kelipatan harga lelang"
          control={control}
          disabled={loading}
          defaultValue="0"
          keyboardType="numeric"
          type="money"
          options={{
            precision: 0,
            separator: "",
            delimiter: ".",
            unit: "Rp ",
          }}
        />

        <View style={styles.separator} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AppDateTimePicker
            name="timeAuctionEnd"
            label="Jam Berakhir"
            placeholder="Pilih Jam"
            control={control}
            type="time"
            style={{ flex: 1, marginRight: size.l }}
          />
          <AppDateTimePicker
            name="dateAuctionEnd"
            label="Tanggal Berakhir"
            placeholder="Pilih Tanggal"
            control={control}
            type="date"
            style={{ flex: 1 }}
            minimumDate={new Date()}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        <Buttons
          label="Tambah Lelang"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.xl,
    paddingVertical: size.l,
  },
  bottomBtnContainer: {
    paddingVertical: size.l,
    paddingHorizontal: size.xl,
    borderTopWidth: 1,
    borderColor: colors.grey.light,
  },
  separator: {
    marginBottom: size.l,
    borderTopWidth: 1,
    borderColor: colors.grey.light,
  },
});
