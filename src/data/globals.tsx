import { TextStyle } from "react-native";

export const colors = {
  primary: "#4840EE",
  primaryContainer: "#EEE9FE",
  accent: "#F58A07",
  surface: "#FFFFFF",
  surfaceSecondary: "#FAFAFA",
  surfaceTetriary: "#F5F5F5",
  surfaceInverse: "#000000",
  surfaceInverseSecondary: "#212121",
  surfaceInverseTetriary: "#424242",
  textPrimary: "#212121",
  textSecondary: "#616161",
  textTetriary: "#9E9E9E",
  textInversePrimary: "#FFFFFF",
  textInverseSecondary: "#FAFAFA",
  textInverseTetriary: "#F5F5F5",
  grey: {
    dark: "#9E9E9E",
    medium: "#BDBDBD",
    light: "#E0E0E0",
  },
  success: "#00A520",
  successContainer: "#E5F6E6",
  warning: "#E6353D",
  warningContainer: "#FEEBEF",
  alert: "#FFB201",
  alertContainer: "#FFF8E1",
  information: "#064FF3",
  informationContainer: "#E9ECFF"
};

export const size = {
  s: 4,
  sm: 6,
  m: 8,
  l: 16,
  xl: 20,
  compHeight: 40
};

interface Typography {
  [key: string]: TextStyle;
}

export const typography: Typography = {
  heading1: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 24,
    lineHeight: 36
  },
  heading2: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 20,
    lineHeight: 28
  },
  paragraph1: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 18,
    lineHeight: 24
  },
  paragraph2: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
    lineHeight: 24
  },
  paragraph3: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
    lineHeight: 20
  },
  paragraph4: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    lineHeight: 16
  },
  paragraph5: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 10,
    lineHeight: 16
  },
  label1: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    lineHeight: 24
  },
  label2: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    lineHeight: 24
  },
  label3: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
    lineHeight: 20
  },
  label4: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    lineHeight: 16
  },
  label5: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 10,
    lineHeight: 16
  },
}
