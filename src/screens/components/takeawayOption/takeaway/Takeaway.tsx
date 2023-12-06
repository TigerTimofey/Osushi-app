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

import { COLORS, FONTS, images } from "../../../../constants";
import Time from "../timeDate/Time";
import DateChoose from "../timeDate/DateChoose";
import LottieView from "lottie-react-native";
import Success from "../../../../../assets/success/done.json";
import Congratuations from "../../../../../assets/success/cong.json";
import SuccessModal from "./SuccessModal";

const Takeaway = ({
  showCartModal,
  cartData,
  setCartData,
  onClose,
  setShowTakeAway,
  setShowOrderConfirmationModal,
  setShowCartModal,
}) => {
  const [openTime, setOpenTime] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [order, setOrder] = useState(null);

  const currentDate = new Date();
  const formattedTime = `${String(currentDate.getHours()).padStart(
    2,
    "0"
  )}:${String(currentDate.getMinutes()).padStart(2, "0")}`;
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}.${String(currentDate.getMonth() + 1).padStart(2, "0")}.${String(
    currentDate.getFullYear()
  ).slice(-2)}`;

  const [selectedTime, setSelectedTime] = useState("VALI AEG");
  const [selectedDate, setSelectedDate] = useState("VALI PÄEV");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setOpenTime(false);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setOpenDate(false);
    setOpenTime(true);
  };

  const handleSendData = () => {
    const orderDetails = {
      userName,
      userNumber,
      selectedDate,
      selectedTime,
      cartData,
    };

    //Order
    console.log("Order", orderDetails);
    // Total price of order
    const totalNumericPrice = orderDetails.cartData.reduce(
      (sum, item) => sum + item.numericPrice * item.quantity,
      0
    );

    console.log("totalNumericPrice", totalNumericPrice);

    setOrder(orderDetails);
    setIsSuccessModalVisible(true);
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

          <>
            {/* Form for User's Name */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Teie nimi"
                placeholderTextColor={COLORS.darkGray}
                autoCapitalize="words"
                textAlign="center"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>

            {/* Form for User's Number */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Telefoninumber"
                placeholderTextColor={COLORS.darkGray}
                textAlign="center"
                autoComplete="tel"
                maxLength={8}
                keyboardType="numeric"
                value={userNumber}
                onChangeText={(text) =>
                  setUserNumber(text.replace(/[^0-9]/g, ""))
                }
              />
            </View>

            {/* Date and Time Selection */}
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setOpenDate(true)}>
                <Text
                  style={
                    {
                      backgroundColor: COLORS.yellow,
                      padding: 10,
                      color: COLORS.darknessGray,
                      ...FONTS.h3,
                      textAlign: "center",
                    } as StyleProp<TextStyle>
                  }
                >
                  {selectedDate === "VALI PÄEV"
                    ? "VALI PÄEV"
                    : selectedDate === formattedDate
                    ? `TÄNA KELL ${selectedTime}`
                    : ` ${selectedDate} KELL ${selectedTime}`}
                </Text>
              </TouchableOpacity>

              <Time
                openTime={openTime}
                onSelectTime={(selectedTime) =>
                  handleTimeSelection(selectedTime)
                }
                selectedDate={selectedDate}
                formattedDate={formattedDate}
                setOpenDate={setOpenDate}
              />
              <DateChoose
                openDate={openDate}
                onSelectDate={(selectedDate) =>
                  handleDateSelection(selectedDate)
                }
              />
            </View>
          </>

          {/* Lottie */}
          {isSuccessModalVisible && (
            <SuccessModal
              showCartModal={showCartModal}
              cartData={cartData}
              setCartData={setCartData}
              onClose={onClose}
              setShowTakeAway={setShowTakeAway}
              setShowOrderConfirmationModal={setShowOrderConfirmationModal}
              setShowCartModal={setShowCartModal}
              setIsSuccessModalVisible={setIsSuccessModalVisible}
              orderDetails={order}
            />
          )}

          <>
            {/* Button to Send Data */}
            <TouchableOpacity
              onPress={handleSendData}
              style={[
                styles.buttonConfirm,
                (!userName ||
                  !userNumber ||
                  selectedDate === "VALI PÄEV" ||
                  selectedTime === "VALI KELL" ||
                  userNumber.length < 8) &&
                  styles.disabledButtonStyle,
              ]}
              // disabled={
              //   !userName ||
              //   !userNumber ||
              //   selectedDate === "VALI PÄEV" ||
              //   selectedTime === "VALI KELL" ||
              //   userNumber.length < 8
              // }
            >
              <Text
                style={
                  {
                    color: COLORS.white,
                    ...FONTS.h2,
                  } as StyleProp<TextStyle>
                }
              >
                SAADA TELLIMUS
              </Text>
            </TouchableOpacity>
          </>

          {/* Close button */}

          <TouchableOpacity
            style={[styles.buttonBack, styles.absolute]}
            onPress={() => setShowTakeAway(false)}
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

export default Takeaway;
