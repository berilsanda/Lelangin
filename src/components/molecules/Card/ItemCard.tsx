import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NumericFormat } from "react-number-format";
import { colors, size, typography } from "src/data/globals";
import { StackParamList } from "src/navigations/MainNavigator";
import { ProductType } from "src/screens/Home";


const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 2 * size.xl - size.l) / 2;

type ItemCardProps = {
  item: ProductType;
};

const ItemCard: React.FC<ItemCardProps> = ({item}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>()

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('DetailLelang', item)}>
      <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={typography.label3}>{item.title}</Text>
        <NumericFormat
          value={item.currentBid == 0 ? item.startingBid : item.currentBid}
          displayType={"text"}
          prefix={"Rp "}
          thousandSeparator="."
          decimalSeparator=","
          renderText={(val) => <Text style={[typography.label1,styles.price]}>{val}</Text>}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[typography.paragraph4, styles.infoText]}>{item.bidder.length} Bidder</Text>
          <Text style={[typography.paragraph4, styles.infoText]}>{moment(item.auctionEnd).fromNow()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: size.l,
    marginBottom: size.l,
    width: ITEM_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: size.s,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.grey.light
  },
  image: {
    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
  },
  contentContainer: {
    padding: size.m,
  },
  price: {
    marginTop: size.s,
    marginBottom: size.m,
    color: colors.warning,
  },
  infoText: {
    color: colors.textSecondary,
  },
});

export default ItemCard;
