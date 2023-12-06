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
} from "react-native";

import LottieView from "lottie-react-native";
import Success from "../../../../../assets/success/done.json";
import Congratuations from "../../../../../assets/success/cong.json";
import { COLORS, FONTS } from "../../../../constants";
import Recieve from "./Recieve";

const SuccessModal = ({
  showCartModal,
  cartData,
  setCartData,
  onClose,
  setShowTakeAway,
  setShowOrderConfirmationModal,
  setShowCartModal,
  setIsSuccessModalVisible,
  orderDetails,
}) => {
  const [lottieAnimationFinished, setLottieAnimationFinished] = useState(false);
  const [openRecieve, setOpenRecieve] = useState(false);

  const handleCloseModal = () => {
    const updatedCartData = [];
    setCartData(updatedCartData);
    setIsSuccessModalVisible(false);
    // setShowTakeAway(false);
    setShowOrderConfirmationModal(false);
    // setShowCartModal(false);
    // Additional logic to reset any other relevant state variables
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
              source={Success}
              autoPlay
              loop={false}
              style={{
                width: "100%",
                height: 300,
                bottom: 5,
                position: "absolute",
              }}
              onAnimationFinish={() => setLottieAnimationFinished(true)}
            />
            <LottieView
              source={Congratuations}
              autoPlay
              loop={false}
              style={{ width: "160%", height: 2000, position: "absolute" }}
            />
          </View>

          {lottieAnimationFinished && (
            // Show additional button and message
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
                <TouchableOpacity
                  onPress={() => {
                    // setIsSuccessModalVisible(false);
                    setOpenRecieve(true);
                  }}
                >
                  <Text
                    style={
                      {
                        backgroundColor: COLORS.yellow,
                        padding: 10,
                        color: COLORS.darknessGray,
                        ...FONTS.h2,
                        textAlign: "center",
                        position: "absolute",
                        left: 135,
                        top: 150,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Vaata arve
                  </Text>
                </TouchableOpacity>
                {openRecieve && (
                  <Recieve
                    openRecieve={openRecieve}
                    orderDetails={orderDetails}
                    cartData={cartData}
                    setOpenRecieve={setOpenRecieve}
                  />
                )}
              </View>

              {/* Close Button */}
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
                      color: COLORS.white,
                      ...FONTS.h1,
                      alignContent: "center",
                      margin: 10,
                    } as StyleProp<TextStyle>
                  }
                >
                  SULGE
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
