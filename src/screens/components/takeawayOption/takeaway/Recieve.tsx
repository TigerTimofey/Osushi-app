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

const Recieve = ({ openRecieve, orderDetails, cartData, setOpenRecieve }) => {
  const totalNumericPrice = orderDetails.cartData.reduce(
    (sum, item) => sum + item.numericPrice * item.quantity,
    0
  );
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
    <View>
      <Modal animationType="slide" transparent={true}>
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
          <Text
            style={
              {
                backgroundColor: COLORS.yellow,
                paddingTop: 30,
                paddingBottom: 30,
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
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
            {/* Black Horizontal Line */}
            <View
              style={{
                width: "100%",
                borderBottomWidth: 2,
                borderBottomColor: COLORS.gray,
                marginVertical: 30,
              }}
            />
            <View style={{ alignItems: "center" }}>
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
                    marginTop: 40,
                    color: COLORS.darknessGray,
                  } as StyleProp<TextStyle>
                }
              >
                KOKKU: {formatPrice(totalNumericPrice)}
              </Text>
            </View>
          </View>
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
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
