import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors, size } from "src/data/globals";

interface RadioGroupsProps {
  label?: string;
  data: { label: string; value: any }[];
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  style?: ViewStyle;
}

const RadioGroups: React.FC<RadioGroupsProps> = ({
  label,
  data,
  value,
  setValue,
  style,
}) => {
  return (
    <View>
      {label ? <Text style={{ marginBottom: size.m }}>{label}</Text> : null}
      <View style={[styles.container, style]}>
        {data.map((item, index) => {
          let isSelected = value == item.value;
          return (
            <TouchableOpacity
              key={index}
              style={styles.radioContainer}
              onPress={() => setValue(item.value)}
            >
              <View
                style={[
                  styles.outerRadio,
                  {
                    borderColor: isSelected ? colors.primary : colors.grey.dark,
                  },
                ]}
              >
                <View
                  style={[
                    styles.innerRadio,
                    { display: isSelected ? "flex" : "none" },
                  ]}
                />
              </View>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: size.l,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: size.m,
    marginRight: size.l
  },
  outerRadio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: size.m,
    height: size.l,
    width: size.l,
    borderWidth: 1,
    borderRadius: size.l / 2,
  },
  innerRadio: {
    height: size.m,
    width: size.m,
    backgroundColor: colors.primary,
    borderRadius: size.m / 2,
  },
});

export default RadioGroups;
