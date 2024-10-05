import React from "react";
import { TextInputProps, ViewStyle } from "react-native";
import { Control, Controller } from "react-hook-form";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextInputMasks from "../TextInputMasks";
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from "react-native-masked-text";

interface AppTextInputMasksProps extends TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  control: Control<any>;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  defaultValue?: string;
  disabled?: boolean;
  multiline?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  type: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp | undefined;
}

const AppTextInputMasks: React.FC<AppTextInputMasksProps> = ({
  name,
  label,
  placeholder,
  value,
  onChangeText,
  control,
  style,
  inputStyle,
  defaultValue,
  disabled = false,
  multiline = false,
  icon,
  type,
  options,
  ...textInputProps
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInputMasks
            label={label}
            placeholder={placeholder}
            value={value}
            type={type}
            options={options}
            editable={!disabled}
            onChangeText={onChange}
            onBlur={onBlur}
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

export default AppTextInputMasks;
