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
import { COLORS, SIZES, images, FONTS } from "../../../../constants";
// import GooglePlacesInput from "./form/GooglePlacesInput";

const Delivery = ({
  cartData,
  setCartData,
  onClose,
  setShowDelivery,
  setShowOrderConfirmationModal,

  setShowCartModal,
}) => {
  // Your modal content here
  console.log("cartData DELIVERY", cartData);
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
              backgroundColor: COLORS.yellow,
              maxHeight: "100%",
            }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
          >
            {/* "Tagasi" button at the top left */}
            <TouchableOpacity
              style={[styles.buttonBack, styles.absolute]}
              onPress={() => setShowDelivery(false)}
            >
              <Text
                style={
                  { color: COLORS.white, ...FONTS.h3 } as StyleProp<TextStyle>
                }
              >
                Tagasi
              </Text>
            </TouchableOpacity>

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
                <Text>Delivery LOGIC MODAL</Text>
              </View>

              <TouchableOpacity
                style={[styles.buttonBack, styles.absolute]}
                onPress={() => setShowDelivery(false)}
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

export default Delivery;
