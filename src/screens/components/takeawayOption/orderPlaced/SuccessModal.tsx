import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextStyle,
  StyleProp,
  Linking,
} from "react-native";

import LottieView from "lottie-react-native";
import Success from "../../../../../assets/success/done.json";
import Congratuations from "../../../../../assets/success/cong.json";
import { COLORS, FONTS } from "../../../../constants";
import Recieve from "./Recieve";

import restoranWorkData from "../../../../constants/menu/timeStatesData";

const SuccessModal = ({
  isDelivery,
  // showCartModal,
  cartData,
  setCartData,
  // onClose,
  // setShowTakeAway,
  // setShowDelivery,
  setShowOrderConfirmationModal,
  // setShowCartModal,
  setIsSuccessModalVisible,
  orderDetails,
  distance,
}) => {
  const [lottieAnimationFinished, setLottieAnimationFinished] = useState(false);
  const [openRecieve, setOpenRecieve] = useState(false);

  const handleCloseModal = () => {
    const updatedCartData = [];
    setCartData(updatedCartData);
    setIsSuccessModalVisible(false);
    setShowOrderConfirmationModal(false);
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
          {/* Lottie */}

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              source={Congratuations}
              autoPlay
              loop={false}
              style={{
                width: "130%",
                height: 900,
                position: "absolute",
                bottom: -600,
              }}
            />
            <LottieView
              source={Success}
              autoPlay
              loop={false}
              style={{
                width: "100%",
                height: 200,
                position: "absolute",
              }}
              onAnimationFinish={() => setLottieAnimationFinished(true)}
            />
          </View>

          {/* {lottieAnimationFinished && ( */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* Info text */}
            <Text
              style={
                {
                  ...FONTS.h1,
                  color: COLORS.darknessGray,
                  top: 50,
                  position: "absolute",
                } as StyleProp<TextStyle>
              }
            >
              Tellimus vastu võetud
            </Text>

            <View style={styles.container}>
              {!openRecieve && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      const phoneNumberString = `+${restoranWorkData[0].placePhoneNumberEstonia}`;
                      const phoneNumberNum = parseInt(
                        phoneNumberString.replace(/\D/g, ""),
                        10
                      );
                      Linking.openURL(`tel:${phoneNumberNum}`).catch((err) =>
                        console.error("An error occurred", err)
                      );
                    }}
                  >
                    <Text
                      style={
                        {
                          backgroundColor: COLORS.yellow,
                          padding: 10,
                          color: COLORS.darknessGray,
                          ...FONTS.h3,
                          textAlign: "center",
                          // position: "absolute",
                          // left: 152,
                          // top: 150,
                          top: 150,
                        } as StyleProp<TextStyle>
                      }
                    >
                      Helista meile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenRecieve(true);
                    }}
                  >
                    <Text
                      style={
                        {
                          backgroundColor: COLORS.yellow,
                          padding: 10,
                          color: COLORS.darknessGray,
                          ...FONTS.h3,
                          textAlign: "center",
                          // position: "absolute",
                          // left: 112,
                          top: 150,
                          marginLeft: 10,
                        } as StyleProp<TextStyle>
                      }
                    >
                      Vaata arve
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const googleMapsLink =
                        "https://goo.gl/maps/Eb2gLiVVzdKZ7U2F6";

                      // Use Linking to open the Google Maps link
                      Linking.openURL(googleMapsLink).catch((err) =>
                        console.error("An error occurred", err)
                      );
                    }}
                  >
                    <Text
                      style={
                        {
                          backgroundColor: COLORS.yellow,
                          padding: 10,
                          color: COLORS.darknessGray,
                          ...FONTS.h3,
                          textAlign: "center",
                          // position: "absolute",

                          // top: 200,
                          top: 150,
                          marginLeft: 10,
                        } as StyleProp<TextStyle>
                      }
                    >
                      Tee meieni
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {openRecieve && (
                <Recieve
                  isDelivery={isDelivery}
                  openRecieve={openRecieve}
                  orderDetails={orderDetails}
                  cartData={cartData}
                  setOpenRecieve={setOpenRecieve}
                  distance={distance}
                />
              )}
            </View>

            {/* Close Button */}
            {!openRecieve && (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.gray,
                  marginTop: 600,
                  borderRadius: 10,
                  position: "absolute",
                  bottom: -350,
                }}
                onPress={handleCloseModal}
              >
                <Text
                  style={
                    {
                      backgroundColor: COLORS.darkGray,
                      color: COLORS.white,
                      ...FONTS.h1,
                      alignContent: "center",
                      position: "absolute",
                      padding: 10,

                      bottom: 50,
                      left: -50,
                    } as StyleProp<TextStyle>
                  }
                >
                  SULGE
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* )} */}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonConfirm: {
    marginTop: 20,
    flex: 2,
    marginHorizontal: 10,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
    color: COLORS.white,
    ...FONTS.h3,
  },
  disabledButtonStyle: {
    marginTop: 20,
    flex: 2,
    marginHorizontal: 10,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    color: COLORS.white,
    ...FONTS.h3,
  },
  formContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    width: 280,
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

export default SuccessModal;
