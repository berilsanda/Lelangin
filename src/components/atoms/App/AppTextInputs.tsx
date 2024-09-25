import React from "react";
import { TextInputProps, ViewStyle } from "react-native";
import TextInputs from "../TextInputs";
import { Control, Controller } from "react-hook-form";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface AppTextInputsProps extends TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  control: Control<any>;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  defaultValue?: string;
  disabled?: boolean;
  multiline?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const AppTextInputs: React.FC<AppTextInputsProps> = ({
  name,
  label,
  placeholder,
  value,
  onChangeText,
  control,
  secureTextEntry = false,
  style,
  inputStyle,
  defaultValue,
  disabled = false,
  multiline = false,
  icon,
  ...textInputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInputs
            label={label}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            editable={!disabled}
            onChangeText={(val) => onChange(val.trim())}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            style={style}
            inputStyle={inputStyle}
            disabled={disabled}
            multiline={multiline}
            icon={icon}
            error={error?.message}
            {...textInputProps}
          />
        </>
      )}
    />
  );
};

export default AppTextInputs;
