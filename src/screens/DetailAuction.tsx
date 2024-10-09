import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "src/navigations/MainNavigator";
import ImageLightbox from "src/components/atoms/ImageLightbox";
import { size } from "src/data/globals";

type Props = NativeStackScreenProps<StackParamList, "DetailLelang">;

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function DetailAuction({ route: { params } }: Props) {
  //   console.log(params);
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate={"fast"}
      >
        {params.images.map((image) => {
          return (
            <ImageLightbox
              key={image}
              style={{
                width: WINDOW_WIDTH,
                height: (3 / 4) * WINDOW_WIDTH,
                resizeMode: "cover",
              }}
              source={image}
            />
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text>{params.title}</Text>
        <Text>Deskripsi</Text>
        <Text>{params.description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: size.l,
    paddingHorizontal: size.xl,
  },
});
