import {
  StyleSheet,
  StatusBar as Bar,
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { TextInputs } from "src/components/atoms";
import { size } from "src/data/globals";
import ItemCard from "src/components/molecules/Card/ItemCard";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "src/services/firebase";
import EmptyState from "src/components/molecules/EmptyState";

interface ProductType {
  auctionEnd: Date;
  bidder: any[];
  condition: string;
  createdAt: Date;
  createdBy: string;
  currentBid: number;
  description: string;
  id: string;
  images: string[];
  startingBid: number;
  status: string;
  stepBid: number;
  title: string;
  winner: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProductType[]>([]);

  async function fetchAuction() {
    setLoading(true);
    try {
      const q = query(
        collection(database, "products"),
        where("status", "==", "active"),
        where("auctionEnd", ">=", new Date())
      );
      const querySnapshot = await getDocs(q);

      let productItems: ProductType[] = [];
      querySnapshot.forEach((doc) => {
        let data = {
          id: doc.id,
          title: doc.data().title || "-",
          description: doc.data().description || "-",
          startingBid: doc.data().startingBid || 0,
          currentBid: doc.data().currentBid || 0,
          images: doc.data().images || [],
          auctionEnd: doc.data().auctionEnd.toDate(),
          condition: doc.data().condition || "-",
          createdAt: doc.data().createdAt.toDate(),
          createdBy: doc.data().createdBy || "-",
          stepBid: doc.data().stepBid || 10000,
          status: doc.data().status || "active",
          bidder: doc.data().bidder || [],
          winner: doc.data().winner || "-",
        };

        productItems.push(data);
      });

      setItems(productItems);
    } catch (error: any) {
      console.log(error.message)
      Alert.alert("Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async function () {
      await fetchAuction();
    })();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  async function onRefresh() {
    setRefreshing(true);
    try {
      await fetchAuction();
    } catch (error: any) {
      Alert.alert("Kesalahan", error.message);
    } finally {
      setRefreshing(false);
    }
  }

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
          {loading || refreshing ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              keyExtractor={(item) => item.id}
              data={items}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={{ flexGrow: 2 }}
              contentContainerStyle={{ paddingBottom: 64 }}
              ListEmptyComponent={
                <EmptyState
                  title="Data tidak ditemukan"
                  subtitle="Kami tidak dapat menemukan data lelang yang anda cari."
                />
              }
              renderItem={({ item }) => {
                return (
                  <ItemCard
                    id={item.id}
                    image={item.images[0]}
                    title={item.title}
                    price={
                      item.currentBid == 0 ? item.startingBid : item.currentBid
                    }
                    bidder={item.bidder.length}
                    dueDate={new Date(item.auctionEnd)}
                  />
                );
              }}
            />
          )}
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
