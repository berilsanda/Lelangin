import {
  StyleSheet,
  StatusBar as Bar,
  View,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { TextInputs } from "src/components/atoms";
import { size } from "src/data/globals";
import ItemCard from "src/components/molecules/Card/ItemCard";
import { dummyData } from "src/data/dummyData";

export default function Home() {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInputs
          value=""
          placeholder="Cari lelang..."
          onChangeText={() => {}}
          icon="magnify"
          style={{ flex: 1, marginRight: size.l, marginBottom: 0 }}
        />
        <Feather name="heart" size={24} style={{ marginRight: 16 }} />
        <Feather name="bell" size={24} />
      </View>

      <View style={{ marginTop: size.l }}>
        <Text style={{ fontWeight: "700" }}>Lelang Terbaru</Text>
        <View style={{ marginTop: size.l, flexShrink: 2 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={dummyData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 2 }}
            contentContainerStyle={{paddingBottom: 64}}
            renderItem={({ item }) => {
              return (
                <ItemCard
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  bidder={item.bidder}
                  dueDate={new Date(item.dueDate)}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Bar.currentHeight || size.l) + size.l,
    paddingHorizontal: size.xl,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
