import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "src/navigations/MainNavigator";
import ImageLightbox from "src/components/atoms/ImageLightbox";
import { colors, size, typography } from "src/data/globals";
import { NumericFormat } from "react-number-format";
import CountdownTimer from "src/components/atoms/CountdownTimer";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "src/services/firebase";
import serializeTime from "src/utils/serializeTime";
import BiddingModal from "src/components/molecules/BiddingModal";

type Props = NativeStackScreenProps<StackParamList, "DetailLelang">;

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function DetailAuction({ route: { params } }: Props) {
  const [item, setItem] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      (async () => {
        const productData = await getDoc(
          doc(collection(database, "products"), params.id)
        );

        if (productData.exists()) {
          let fetchedItem = productData.data();
          fetchedItem.auctionEnd = serializeTime(fetchedItem.auctionEnd);
          setItem(fetchedItem);
        }
      })();
    } catch (error: any) {
      Alert.alert("Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  }

  function subscribeData() {
    const unsubscribe = onSnapshot(
      doc(database, "products", params.id),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const currentBid = data?.currentBid;
          setItem((prevState) => ({ ...prevState, currentBid }));
        } else {
          console.log("Error document not found");
        }
      }
    );

    return unsubscribe;
  }

  useEffect(() => {
    fetchData();

    const unsubscribe = subscribeData();

    return () => {
      unsubscribe();
    };
  }, [params.id]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/** Image Carousel */}
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate={"fast"}
              >
                {item?.images.map((image: string) => {
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
            </View>

            {/** Content */}
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item?.title}</Text>

              <View style={styles.bidContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subLabel}>Bid Tertinggi</Text>
                  <NumericFormat
                    value={
                      item?.currentBid == 0
                        ? item?.startingBid
                        : item?.currentBid
                    }
                    displayType={"text"}
                    prefix={"Rp "}
                    thousandSeparator="."
                    decimalSeparator=","
                    renderText={(val) => (
                      <Text style={styles.bidValue}>{val}</Text>
                    )}
                  />
                </View>
                <View>
                  <Text style={[styles.subLabel, { textAlign: "right" }]}>
                    Selesai Dalam
                  </Text>
                  <CountdownTimer date={item?.auctionEnd || null} />
                </View>
              </View>

              <View style={styles.separator} />

              <Text style={typography.label2}>Deskripsi</Text>
              <Text
                style={[typography.paragraph3, { color: colors.textSecondary }]}
              >
                {item?.description}
              </Text>
            </View>
          </ScrollView>
          <BiddingModal
            auctionId={params.id}
            stepBid={item?.stepBid}
            currentBid={item?.currentBid}
            startingBid={item?.startingBid}
            disabled={new Date(item?.auctionEnd) < new Date()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: size.l,
    paddingHorizontal: size.xl,
  },
  title: {
    ...typography.heading2,
    marginBottom: size.l,
  },
  bidValue: {
    ...typography.heading2,
    color: colors.warning,
  },
  separator: {
    marginVertical: size.l,
    borderTopWidth: 1,
    borderColor: colors.grey.light,
  },
  bidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subLabel: {
    ...typography.paragraph4,
    color: colors.textSecondary,
  },
});
