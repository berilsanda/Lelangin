import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors, size, typography } from "src/data/globals";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ImageLightbox from "../atoms/ImageLightbox";

interface PictureListUploaderProps {
  label: string;
  style?: ViewStyle;
  pictureList: string[];
  setPictureList: Dispatch<SetStateAction<string[]>>;
  error?: string;
}

const PictureListUploader: React.FC<PictureListUploaderProps> = ({
  pictureList,
  setPictureList,
  error,
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPictureList([...pictureList, result.assets[0].uri]);
    }
  };

  const deletePicture = (index: number) => {
    let newList = pictureList.filter((item, idx) => {
      if (idx != index) {
        return item;
      }
      return;
    });

    setPictureList(newList);
  };

  interface ImageItemProps {
    picture: string;
    index: number;
  }
  const ImageItem = ({ picture, index }: ImageItemProps) => {
    return (
      <View>
        <ImageLightbox source={picture} style={styles.image} />
        <TouchableOpacity
          style={styles.imgDeleteBtn}
          activeOpacity={0.8}
          onPress={() => deletePicture(index)}
        >
          <Text style={{ ...typography.paragraph3, color: colors.surface, textAlign: "center" }}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: size.l }}>
      <Text style={{ ...typography.paragraph3, marginBottom: size.m }}>Foto Barang</Text>
      <ScrollView horizontal>
        {pictureList.length > 0
          ? pictureList.map((item, index) => {
              return <ImageItem key={index} picture={item} index={index} />;
            })
          : null}
        {pictureList.length == 5 ? null : (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => pickImage()}
            activeOpacity={0.5}
          >
            <MaterialCommunityIcons
              name={"plus"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
      {error ? <Text style={[typography.paragraph3, styles.errorText]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 98.2,
    width: 98.2,
    marginRight: 12,
    borderRadius: size.s,
  },
  imgDeleteBtn: {
    position: "absolute",
    bottom: 0,
    right: 12,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: size.s,
    borderBottomRightRadius: size.s,
    paddingTop: 2,
    paddingBottom: size.s,
  },
  addBtn: {
    borderWidth: 1,
    borderRadius: size.s,
    borderStyle: "dashed",
    borderColor: colors.primary,
    alignSelf: "flex-start",
    padding: 36,
  },
  errorText: {
    color: colors.warning,
    marginTop: size.sm,
  },
});

export default PictureListUploader;
