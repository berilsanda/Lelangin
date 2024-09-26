import {
  Modal,
  ModalBaseProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface AppModalsProps extends ModalBaseProps {
  visible: boolean;
  onDismiss: () => void;
  children: any;
  style?: ViewStyle;
}

const AppModals: React.FC<AppModalsProps> = ({
  visible,
  onDismiss,
  children,
  style: addOnStyle,
  ...modalBaseProps
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...modalBaseProps}
    >
      <TouchableWithoutFeedback
        onPress={onDismiss}
      >
        <View style={[StyleSheet.absoluteFillObject, styles.modalContainer, addOnStyle]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
});

export default AppModals;
