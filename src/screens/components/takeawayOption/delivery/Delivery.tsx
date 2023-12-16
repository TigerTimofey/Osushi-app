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
  Alert,
} from "react-native";

import { COLORS, FONTS, images } from "../../../../constants";
import Time from "../timeDate/Time";
import DateChoose from "../timeDate/DateChoose";

import SuccessModal from "../orderPlaced/SuccessModal";
import restoranWorkData from "../../../../constants/menu/timeStatesData";

import { REACT_PUBLIC_API_KEY } from "@env";
import AdressChooose from "./adressChoose";
import MontonioPayment from "../montonio/MontonioPayment";

const Delivery = ({
  cartData,
  setCartData,
  setShowDelivery,
  setShowOrderConfirmationModal,
  isDelivery,
}) => {
  const countries = ["Tallinn", "Maardu", "Muuga"];
  const [openTime, setOpenTime] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [userCity, setUserCity] = React.useState(countries);
  const [userAdress, setUserAdress] = React.useState("");
  const [userApartment, setUserApartment] = React.useState("");
  const [userNumber, setUserNumber] = React.useState("");
  const [order, setOrder] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState("VALI AEG");
  const [selectedDate, setSelectedDate] = React.useState("VALI PÄEV");
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    React.useState(false);
  const [userClicked, setUserClicked] = React.useState(false);
  const [adressChooose, setAdressChooose] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState(null);
  const [totalNumericPrice, setTotalNumericPrice] = React.useState(null);
  const [montonioOpen, setMontonioOpen] = React.useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: restoranWorkData[0].countryCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const distancePrice = Number(
    (
      Math.round(
        (restoranWorkData[0].minimumOrderFeeEur +
          (distance / 1000) * restoranWorkData[0].centsPerKilometer) *
          20
      ) / 20
    ).toFixed(2)
  );

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

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setOpenTime(false);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setOpenDate(false);
    setOpenTime(true);
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Oops!", "Palun sisesta õige aadress", [
      {
        text: "SELGE",
        onPress: () => {
          setUserClicked(false);
          setUserAdress("");
          setUserApartment("");
          setAdressChooose(true);
        },
      },
    ]);

  const handlePriceForDelivery = async () => {
    const orderDetails = {
      userCity,
      userAdress,
      userNumber,
      selectedDate,
      selectedTime,
      cartData,
      distance,
    };

    const origin = encodeURIComponent(orderDetails.userAdress + userCity);
    const destination = encodeURIComponent(restoranWorkData[0].restoranAdress);
    const apiKey = REACT_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Distance Matrix API Full Response:", data);

      if (data.status === "OK" && data.rows[0].elements[0].distance) {
        const distanceValue = data.rows[0].elements[0].distance.value;

        if (isDelivery) {
          const [hours, minutes] = selectedTime.split(":");
          const newHours = String(Number(hours) + 1).padStart(2, "0");
          const adjustedTime = `${newHours}:${minutes}`;
          orderDetails.selectedTime = adjustedTime;
        }

        orderDetails.distance = distanceValue;
        console.log("Distance Value (in meters):", distanceValue);

        setDistance(distanceValue);
        const totalNumericPrice = orderDetails.cartData.reduce(
          (sum, item) => sum + item.numericPrice * item.quantity,
          0
        );
        if (isDelivery) {
          setOrder(orderDetails);
          setUserClicked(true);
        } else {
          console.error("This logic is specific to handleSendData");
        }

        console.log("Order", orderDetails);
        setTotalNumericPrice(totalNumericPrice);
        console.log("totalNumericPrice", totalNumericPrice);
      } else {
        console.error("Google Maps Distance Matrix API error:", data.status);
        createTwoButtonAlert();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

            <View style={styles.containerGetPrice}>
              <TouchableOpacity onPress={() => setAdressChooose(true)}>
                <Text
                  style={
                    {
                      backgroundColor: COLORS.yellow,
                      padding: 10,
                      position: "absolute",
                      bottom: -20,
                      width: 175,
                      color: COLORS.darknessGray,
                      ...FONTS.h3,
                      textAlign: "center",
                    } as StyleProp<TextStyle>
                  }
                >
                  {userClicked && userAdress !== ""
                    ? `TARNEHIND ${formatPrice(distancePrice)}`
                    : "VALI AADRESS"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date and Time Selection */}
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setOpenDate(true)}>
                <Text
                  style={
                    {
                      backgroundColor: COLORS.yellow,
                      position: "absolute",
                      left: 115,
                      padding: 10,
                      width: 175,
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
                isDelivery={isDelivery}
              />
              <DateChoose
                openDate={openDate}
                onSelectDate={(selectedDate) =>
                  handleDateSelection(selectedDate)
                }
              />
              <AdressChooose
                adressChooose={adressChooose}
                setAdressChooose={setAdressChooose}
                handlePriceForDelivery={handlePriceForDelivery}
                setUserCity={setUserCity}
                setUserAdress={setUserAdress}
                setUserApartment={setUserApartment}
                userAdress={userAdress}
                userApartment={userApartment}
                userCity={userCity}
              />
              <MontonioPayment
                // orderDetails={orderDetails}
                cartData={cartData}
                montonioOpen={montonioOpen}
                setMontonioOpen={setMontonioOpen}
                totalNumericPrice={totalNumericPrice}
              />
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  console.log("MAKSAN SULARAHA clicked");
                  setSelectedPaymentMethod("MAKSAN SULARAHA");
                }}
              >
                <Text
                  style={
                    {
                      backgroundColor:
                        selectedPaymentMethod === "MAKSAN SULARAHA"
                          ? "green"
                          : COLORS.yellow,
                      marginTop: 10,
                      padding: 5,
                      minWidth: 165,
                      color:
                        selectedPaymentMethod === "MAKSAN SULARAHA"
                          ? COLORS.white
                          : COLORS.darknessGray,
                      ...FONTS.h4,
                      textAlign: "center",
                    } as StyleProp<TextStyle>
                  }
                >
                  MAKSAN SULARAHA
                </Text>
              </TouchableOpacity>
              <Text
                style={
                  {
                    color: COLORS.darknessGray,
                    opacity: 0.7,
                    ...FONTS.h2,
                    marginTop: 8,
                  } as StyleProp<TextStyle>
                }
              >
                &
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.log("MAKSAN KAARDIGA clicked");
                  setSelectedPaymentMethod("MAKSAN KAARDIGA");
                  setMontonioOpen(true);
                }}
              >
                <Text
                  style={
                    {
                      backgroundColor:
                        selectedPaymentMethod === "MAKSAN KAARDIGA"
                          ? "green"
                          : COLORS.yellow,
                      marginTop: 10,
                      padding: 5,
                      minWidth: 165,
                      color:
                        selectedPaymentMethod === "MAKSAN KAARDIGA"
                          ? COLORS.white
                          : COLORS.darknessGray,
                      ...FONTS.h4,
                      textAlign: "center",
                    } as StyleProp<TextStyle>
                  }
                >
                  MAKSAN KAARDIGA
                </Text>
              </TouchableOpacity>
            </View>
          </>

          {/* Lottie */}
          {isSuccessModalVisible && (
            <SuccessModal
              isDelivery={isDelivery}
              cartData={cartData}
              setCartData={setCartData}
              setShowOrderConfirmationModal={setShowOrderConfirmationModal}
              setIsSuccessModalVisible={setIsSuccessModalVisible}
              orderDetails={order}
              distance={distance}
            />
          )}

          <>
            {/* Button to Send Data */}
            <TouchableOpacity
              onPress={() => setIsSuccessModalVisible(true)}
              style={[
                styles.buttonConfirm,
                (!userAdress ||
                  !userNumber ||
                  !userClicked ||
                  selectedDate === "VALI PÄEV" ||
                  selectedTime === "VALI KELL" ||
                  userNumber.length < 8) &&
                  styles.disabledButtonStyle,
              ]}
              disabled={
                !userAdress ||
                !userNumber ||
                !userClicked ||
                selectedDate === "VALI PÄEV" ||
                selectedTime === "VALI KELL" ||
                userNumber.length < 8
              }
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
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    width: 280,
  },
  containerGetPrice: {
    position: "absolute",
    top: 460,
    left: 115,
    alignItems: "center",
    marginVertical: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 15,
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

export default Delivery;
