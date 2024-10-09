import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, typography } from "src/data/globals";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("assets/noData.png")}
        resizeMode="center"
      />
      <Text style={typography.label2}>{title}</Text>
      <Text
        style={{
          ...typography.paragraph3,
          color: colors.textSecondary,
          textAlign: "center",
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 8,
    height: 200,
    width: 200,
    resizeMode: "center",
  },
});
