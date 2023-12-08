import React from "react";
import {
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  View,
  Text,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";

import { COLORS, FONTS, SIZES, images } from "../../../../constants";
import restoranWorkData from "../../../../constants/menu/timeStatesData";

const Recieve = ({
  openRecieve,
  orderDetails,
  cartData,
  setOpenRecieve,
  isDelivery,
  distance,
}) => {
  console.log("Recieve isDelivery", isDelivery);
  const distancePrice = Number(
    (
      Math.round(
        (restoranWorkData[0].minimumOrderFeeEur +
          (distance / 1000) * restoranWorkData[0].centsPerKilometer) *
          20
      ) / 20
    ).toFixed(2)
  );

  let totalNumericPrice = orderDetails.cartData.reduce(
    (sum, item) => sum + item.numericPrice * item.quantity,
    // isDelivery ? -0.1 : 0
    0
  );

  if (isDelivery) {
    totalNumericPrice += distancePrice;
  }
  console.log("orderDetails ARVE", orderDetails);
  console.log("TOTAL ", totalNumericPrice);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.overlay}>
      <Modal animationType="slide" transparent={true}>
        <>
          <Text
            style={
              {
                backgroundColor: COLORS.yellow,
                paddingTop: 35,
                paddingBottom: 50,
                paddingHorizontal: 150,
                color: COLORS.darknessGray,
                ...FONTS.h1,
                top: 60,
                textAlign: "center",
                position: "absolute",
                left: 0,
                right: 0,
              } as StyleProp<TextStyle>
            }
          >
            ARVE
          </Text>
          {/* Black Horizontal Line */}
          <View
            style={{
              width: "100%",
              // borderBottomWidth: 2,
              borderBottomColor: COLORS.gray,
              marginVertical: 80,
            }}
          />

          <View style={styles.overlayContainer}>
            <ScrollView
              style={{
                borderRadius: 10,
                width: "100%",
                backgroundColor: COLORS.white,
                maxHeight: "100%",
              }}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              showsVerticalScrollIndicator={false}
            >
              {orderDetails.cartData.map((item, index) => (
                <View
                  key={index}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    key={index}
                    style={
                      {
                        ...FONTS.h4,
                        color: COLORS.darknessGray,
                      } as StyleProp<TextStyle>
                    }
                  >
                    {item.name} {item.quantity} tk. -{" "}
                    {formatPrice(item.totalPrice)}
                  </Text>
                </View>
              ))}
              {isDelivery && (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={
                      {
                        ...FONTS.h4,
                        color: COLORS.darknessGray,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Kohaletoimetamine - {formatPrice(distancePrice)}
                  </Text>
                </View>
              )}
            </ScrollView>
            {/* Black Horizontal Line */}
            <View
              style={{
                width: "100%",
                borderBottomWidth: 2,
                borderBottomColor: COLORS.gray,
                marginVertical: 20,
              }}
            />
            <View
              style={{ alignItems: "center", backgroundColor: COLORS.white }}
            >
              <Text
                style={
                  {
                    ...FONTS.h3,

                    color: COLORS.darknessGray,
                  } as StyleProp<TextStyle>
                }
              >
                SUMMA KM-TA:{" "}
                {formatPrice(
                  totalNumericPrice -
                    (totalNumericPrice / 100) * restoranWorkData[0].countryTax
                )}
              </Text>
              <Text
                style={
                  {
                    ...FONTS.h3,

                    color: COLORS.darknessGray,
                  } as StyleProp<TextStyle>
                }
              >
                KÄIBEMAKS:{" "}
                {formatPrice(
                  (totalNumericPrice / 100) * restoranWorkData[0].countryTax
                )}
              </Text>
              <Text
                style={
                  {
                    ...FONTS.h1,
                    marginTop: 10,
                    marginBottom: 30,
                    color: COLORS.darknessGray,
                  } as StyleProp<TextStyle>
                }
              >
                KOKKU: {formatPrice(totalNumericPrice)}
              </Text>
            </View>
          </View>
        </>

        {/* Close Button */}
        <TouchableOpacity
          style={[styles.buttonBack, styles.absolute]}
          onPress={() => setOpenRecieve(false)}
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Set the background color here
  },

  overlayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: COLORS.white,
    maxHeight: "100%", // Adjust the maximum height as needed
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 15,
  },
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
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Recieve;
