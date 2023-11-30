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

const Takeaway = ({ cartData, onClose, setShowTakeAway }) => {
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

  const [selectedTime, setSelectedTime] = useState("VALI KELL");
  const [selectedDate, setSelectedDate] = useState("VALI PÄEV");

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setOpenTime(false);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setOpenDate(false);
  };

  const handleSendData = () => {
    if (!userName || !userNumber || !selectedDate || !selectedTime) {
      // Validate that all fields are filled
      alert("Please fill in all fields.");
      return;
    }

    const orderDetails = {
      userName,
      userNumber,
      selectedDate,
      selectedTime,
      cartData,
    };

    // Log the order details to the console
    console.log("Order", orderDetails);

    // You can further use or send the orderDetails as needed

    // Set the order state for UI or other purposes
    setOrder(orderDetails);
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
          {/* Form for User's Name */}
          <View style={styles.formContainer}>
            <Text style={styles.infoText}>NIMI</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>

          {/* Form for User's Number */}
          <View style={styles.formContainer}>
            <Text style={styles.infoText}>TELEFOON</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your number"
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
              <Text style={styles.buttonInText}>
                {selectedDate === "VALI PÄEV"
                  ? "VALI PÄEV"
                  : selectedDate === formattedDate
                  ? "TÄNA"
                  : ` ${selectedDate}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <Text style={styles.buttonInText}>
                {" "}
                {selectedTime === "VALI KELL"
                  ? "VALI KELL"
                  : `KELL ${selectedTime}`}
              </Text>
            </TouchableOpacity>

            <Time
              openTime={openTime}
              onSelectTime={(selectedTime) => handleTimeSelection(selectedTime)}
              selectedDate={selectedDate}
              formattedDate={formattedDate}
              setOpenDate={setOpenDate}
            />
            <DateChoose
              formattedDate={formattedDate}
              openDate={openDate}
              onSelectDate={(selectedDate) => handleDateSelection(selectedDate)}
            />
          </View>
          {/* Button to Send Data */}
          <TouchableOpacity
            onPress={handleSendData}
            style={[
              styles.buttonConfirm,
              // Apply disabledButtonStyle if the button is disabled
              !userName ||
              !userNumber ||
              selectedDate === "VALI PÄEV" ||
              selectedTime === "VALI KELL"
                ? styles.disabledButtonStyle
                : null,
            ]}
            disabled={
              !userName ||
              !userNumber ||
              selectedDate === "VALI PÄEV" ||
              selectedTime === "VALI KELL"
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
            {/* <View style={styles.container}></View> */}
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
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  infoText: {
    padding: 10,
    color: COLORS.darknessGray,
    ...FONTS.h2,
    textAlign: "center",
  },
  buttonInText: {
    backgroundColor: COLORS.yellow,
    padding: 10,
    color: COLORS.darknessGray,
    ...FONTS.h3,
    textAlign: "center",
  },
});

export default Takeaway;
