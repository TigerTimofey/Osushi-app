import React, { useState } from "react";

import DatePicker from "react-native-date-picker";
import {
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  View,
  Text,
  TextStyle,
  TouchableOpacity,
  TextInput,
  StyleProp,
  Button,
} from "react-native";

import { COLORS, SIZES, FONTS, images } from "../../../../constants";

const Takeaway = ({ cartData, onClose, setShowTakeAway }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const chosenDate = new Date();
  const isToday = chosenDate.toDateString() === date.toDateString();
  const adjustedTime = new Date(date);
  adjustedTime.setHours(date.getHours() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);

  console.log("cartData TAKEAWAY", cartData);
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
          <View style={styles.container}>
            <Text style={styles.infoText}>
              {" "}
              {isToday
                ? `VALMIS TÄNA ${adjustedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : `${date.getDate()}.${date.getMonth() + 1} `}
            </Text>
            {/* <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.textStyle}>
                {`Päev: ${date.getDate()}.${
                  date.getMonth() + 1
                } \n Aeg: ${date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.buttonInText}>Muuta</Text>
            </TouchableOpacity>
          </View>

          <DatePicker
            locale="et"
            mode="datetime"
            modal={true}
            minimumDate={date}
            maximumDate={maxDate}
            minuteInterval={30}
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

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
            <View style={styles.container}></View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your existing styles here

  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  positionStyle: {
    padding: 10,
    // marginHorizontal: 40,
    color: COLORS.darknessGray,
    ...FONTS.h3,
    textAlign: "center",
  },

  dateTimeText: {
    padding: 10,
    backgroundColor: COLORS.darkGray,
    marginHorizontal: 40,
    color: COLORS.lightGray,
    ...FONTS.h2,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
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
  textStyle: {
    backgroundColor: COLORS.mediumGray,
    padding: 10,

    color: COLORS.darknessGray,
    ...FONTS.h3,
    textAlign: "center",
  },
  buttonInText: {
    backgroundColor: COLORS.yellow,
    padding: 10,

    color: COLORS.darknessGray,
    ...FONTS.h3,
    textAlign: "center",
  },
  infoText: {
    padding: 10,

    color: COLORS.darknessGray,
    ...FONTS.h2,
    textAlign: "center",
  },
});

export default Takeaway;
