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

import SuccessModal from "../orderPlaced/SuccessModal";
import restoranWorkData from "../../../../constants/menu/timeStatesData";

import SelectDropdown from "react-native-select-dropdown";
import { REACT_PUBLIC_API_KEY } from "@env";

const Delivery = ({
  showCartModal,
  cartData,
  setCartData,
  onClose,
  setShowDelivery,
  setShowOrderConfirmationModal,
  setShowCartModal,
  isDelivery,
  setIsDelivery,
}) => {
  const countries = ["Tallinn", "Maardu", "Muuga"];
  const [openTime, setOpenTime] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [userCity, setUserCity] = useState(countries);
  const [userAdress, setUserAdress] = useState("");
  const [userApartment, setUserApartment] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [distance, setDistance] = useState(null);
  const [selectedTime, setSelectedTime] = useState("VALI AEG");
  const [selectedDate, setSelectedDate] = useState("VALI PÄEV");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(
    "Daada kohaletoimetamise tasu"
  );
  const [userClicked, setUserClicked] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
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
  // const apiKey = REACT_PUBLIC_API_KEY;
  // console.log("apikey", apiKey);
  // console.log(typeof apiKey);

  const handleSendData = async () => {
    const orderDetails = {
      userCity,
      userAdress,
      userNumber,
      selectedDate,
      selectedTime,
      cartData,
      distance,
    };

    console.log("Order Details:", orderDetails);

    const origin = encodeURIComponent(orderDetails.userAdress + userCity);
    const destination = encodeURIComponent("Punane 56, 13619 Tallinn");
    const apiKey = REACT_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Distance Matrix API Full Response:", data);

      if (data.status === "OK" && data.rows[0].elements[0].distance) {
        const distanceText = data.rows[0].elements[0].distance.text;
        const distanceValue = data.rows[0].elements[0].distance.value;

        console.log("Distance:", distanceText); // Logs the distance in text format (e.g., "5.2 km")
        console.log("Distance Value (in meters):", distanceValue);

        const totalNumericPrice = orderDetails.cartData.reduce(
          (sum, item) => sum + item.numericPrice * item.quantity,
          0
        );

        if (isDelivery) {
          const [hours, minutes] = selectedTime.split(":");
          const newHours = String(Number(hours) + 1).padStart(2, "0");
          const adjustedTime = `${newHours}:${minutes}`;
          orderDetails.selectedTime = adjustedTime;
        }

        orderDetails.distance = distanceValue;
        console.log("Order", orderDetails);
        console.log("totalNumericPrice", totalNumericPrice);

        setOrder(orderDetails);
        setIsSuccessModalVisible(true);
      } else {
        console.error("Google Maps Distance Matrix API error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    const destination = encodeURIComponent("Punane 56, 13619 Tallinn");
    const apiKey = REACT_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Distance Matrix API Full Response:", data);

      if (data.status === "OK" && data.rows[0].elements[0].distance) {
        const distanceText = data.rows[0].elements[0].distance.text;
        const distanceValue = data.rows[0].elements[0].distance.value;
        orderDetails.distance;
        console.log("Distance Value (in meters):", distanceValue);

        if (isDelivery) {
          const [hours, minutes] = selectedTime.split(":");
          const newHours = String(Number(hours) + 1).padStart(2, "0");
          const adjustedTime = `${newHours}:${minutes}`;
          orderDetails.selectedTime = adjustedTime;
        }

        orderDetails.distance = distanceValue;
        setDistance(distanceValue);
      } else {
        console.error("Google Maps Distance Matrix API error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setUserClicked(true);
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

            {/* Form for User's Number */}
            <View style={styles.formContainer}>
              <SelectDropdown
                buttonStyle={styles.inputCity}
                buttonTextStyle={styles.inputCityText}
                // dropdownStyle={{ backgroundColor: "white", borderRadius: 10,  }}

                dropdownStyle={styles.dropdownCity}
                dropdownIconPosition="left"
                defaultButtonText="Vali linn"
                data={countries}
                selectedRowTextStyle={{ color: COLORS.darknessGray }}
                rowTextStyle={styles.dropdownCity}
                rowStyle={styles.dropdownCity}
                onSelect={(selectedItem) => {
                  setUserCity(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <TextInput
                style={styles.inputAdress}
                placeholder="Aadress"
                placeholderTextColor={COLORS.darkGray}
                textAlign="center"
                value={userAdress}
                onChangeText={(text) => setUserAdress(text)}
              />
              <TextInput
                style={styles.inputApartment}
                placeholder="Korter"
                placeholderTextColor={COLORS.darkGray}
                textAlign="center"
                value={userApartment}
                onChangeText={(text) => setUserApartment(text)}
              />
            </View>
            {userCity && userAdress && userApartment && (
              <View style={styles.containerGetPrice}>
                <TouchableOpacity onPress={() => handlePriceForDelivery()}>
                  <Text
                    style={
                      {
                        backgroundColor: COLORS.yellow,
                        padding: 10,
                        minWidth: 165,
                        color: COLORS.darknessGray,
                        ...FONTS.h3,
                        textAlign: "center",
                      } as StyleProp<TextStyle>
                    }
                  >
                    {userClicked
                      ? formatPrice(distancePrice)
                      : "KINNITA AADRESS"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Date and Time Selection */}
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setOpenDate(true)}>
                <Text
                  style={
                    {
                      backgroundColor: COLORS.yellow,
                      marginTop: 10,
                      padding: 10,
                      minWidth: 165,
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
            </View>
          </>

          {/* Lottie */}
          {isSuccessModalVisible && (
            <SuccessModal
              isDelivery={isDelivery}
              // showCartModal={showCartModal}
              cartData={cartData}
              setCartData={setCartData}
              // onClose={onClose}
              // setShowDelivery={setShowDelivery}
              setShowOrderConfirmationModal={setShowOrderConfirmationModal}
              // setShowCartModal={setShowCartModal}
              setIsSuccessModalVisible={setIsSuccessModalVisible}
              orderDetails={order}
              distance={distance}
            />
          )}

          <>
            {/* Button to Send Data */}
            <TouchableOpacity
              onPress={handleSendData}
              style={[
                styles.buttonConfirm,
                (!userAdress ||
                  !userNumber ||
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
    marginBottom: 15,
    width: 280,
  },
  inputCity: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    // padding: 10,
    marginBottom: 15,
    marginLeft: 40,
    width: 90,
    height: 40,
  },
  inputCityText: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  dropdownCity: {
    fontSize: 14,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    color: COLORS.darknessGray,
  },
  inputAdress: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    width: 120,
  },
  inputApartment: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    marginRight: 45,
    width: 65,
  },
  containerGetPrice: {
    position: "absolute",
    top: 500,
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
