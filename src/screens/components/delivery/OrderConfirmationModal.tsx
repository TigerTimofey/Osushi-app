// OrderConfirmationModal.js

import React from "react";
import {
  StyleSheet,
  Image,
  Modal,
  TextStyle,
  StyleProp,
  ScrollView,
} from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, images } from "../../../constants";

const OrderConfirmationModal = ({ cartData, onClose }) => {
  // Your modal content here

  return (
    <View>
      {/* Modal content */}
      {/* ... */}
      <TouchableOpacity onPress={onClose}>
        <Modal animationType="slide" transparent={true}>
          {/* Modal content */}
          <ScrollView
            style={{
              borderRadius: 10,
              width: "100%",
              backgroundColor: COLORS.white,
              maxHeight: 700,
            }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: 200,
                }}
              />
            </View>

            <View style={{ display: "flex", margin: 20 }}></View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                  marginHorizontal: SIZES.padding,
                }}
              >
                <Text>ORDER LOGIC MODAL</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonConfirm: {
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
  },
  shopButton: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.red,
    borderRadius: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  closeButton: {
    marginTop: 20,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recentSearchShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  recentSearches: {
    width: "100%",
    transform: [{ rotateY: "180deg" }],
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderConfirmationModal;
