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
import { colors, size } from "src/data/globals";

interface ItemCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  dueDate: Date;
  bidder: number;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 2 * size.xl - size.l) / 2;

const ItemCard: React.FC<ItemCardProps> = ({
  image,
  title,
  price,
  dueDate,
  bidder = 0,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <NumericFormat
          value={price}
          displayType={"text"}
          prefix={"Rp "}
          thousandSeparator="."
          decimalSeparator=","
          renderText={(val) => <Text style={styles.price}>{val}</Text>}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.infoText}>{bidder} Bidder</Text>
          <Text style={styles.infoText}>{moment(dueDate).fromNow()}</Text>
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
    backgroundColor: colors.background,
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
  title: {
    fontSize: 16,
  },
  price: {
    marginTop: size.s,
    marginBottom: size.m,
    fontSize: 18,
    fontWeight: "700",
    color: colors.error,
  },
  infoText: {
    fontSize: 12,
    color: colors.grey.dark,
  },
});

export default ItemCard;
