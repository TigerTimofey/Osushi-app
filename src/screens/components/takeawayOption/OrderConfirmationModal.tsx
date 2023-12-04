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
import { COLORS, SIZES, FONTS, images } from "../../../constants";

import Takeaway from "./takeaway/Takeaway";
import Delivery from "./delivery/Delivery";

const OrderConfirmationModal = ({
  cartData,
  onClose,
  setShowOrderConfirmationModal,
  setShowAddToCartModal,
  setShowCartModal,
}) => {
  const [showDelivery, setShowDelivery] = React.useState(false);
  const [showTakeAway, setShowTakeAway] = React.useState(false);

  return (
    <View>
      {/* Modal content */}

      <TouchableOpacity onPress={onClose}>
        <Modal
          animationType="slide"
          transparent={true}
          style={{ width: "100%", height: "100%" }}
        >
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
                source={images.logoQuestion}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: 80,
                }}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonBack, styles.absoluteChoose]}
              onPress={() => setShowOrderConfirmationModal(false)}
            >
              <View>
                <Image
                  source={images.back}
                  resizeMode="contain"
                  style={{
                    width: 55,
                    height: 55,
                  }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{ display: "flex", margin: 20, marginBottom: 100 }}
            ></View>

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
                <TouchableOpacity
                  onPress={() => {
                    setShowDelivery(true);
                    setShowTakeAway(false);
                  }}
                >
                  <Text
                    style={
                      {
                        backgroundColor: COLORS.yellow,
                        padding: 15,
                        marginHorizontal: 40,
                        color: COLORS.darknessGray,
                        ...FONTS.h2,
                      } as StyleProp<TextStyle>
                    }
                  >
                    KAASA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowTakeAway(true);
                    setShowDelivery(false);
                  }}
                >
                  <Text
                    style={
                      {
                        backgroundColor: COLORS.yellow,
                        padding: 15,
                        marginHorizontal: 40,
                        color: COLORS.darknessGray,
                        ...FONTS.h2,
                      } as StyleProp<TextStyle>
                    }
                  >
                    ISE JÄRGI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {showDelivery && (
                <Delivery
                  cartData={cartData}
                  onClose={undefined}
                  setShowDelivery={setShowDelivery}
                  setShowOrderConfirmationModal={setShowOrderConfirmationModal}
                  setShowAddToCartModal={setShowAddToCartModal}
                  setShowCartModal={setShowCartModal}
                />
              )}
              {showTakeAway && (
                <Takeaway
                  cartData={cartData}
                  onClose={undefined}
                  setShowTakeAway={setShowTakeAway}
                  setShowOrderConfirmationModal={setShowOrderConfirmationModal}
                  setShowAddToCartModal={setShowAddToCartModal}
                  setShowCartModal={setShowCartModal}
                />
              )}
            </View>
          </ScrollView>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBack: {
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  absolute: {
    position: "absolute",
    top: -450,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
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
  absoluteChoose: {
    position: "absolute",
    top: 80,
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
