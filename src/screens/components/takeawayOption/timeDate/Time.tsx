import React from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
  View,
  Text,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { COLORS, SIZES, FONTS } from "../../../../constants";
import restoranWorkData from "../../../../constants/menu/timeStatesData";

const Time = ({
  openTime,
  onSelectTime,
  formattedDate,
  selectedDate,
  setOpenDate,
  isDelivery,
}) => {
  const generateTimeIntervals = () => {
    const isSameDate = selectedDate === formattedDate;

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (
      isSameDate &&
      !(currentHour >= 22 && currentMinute >= 30) &&
      !(currentHour < 10)
    ) {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const nextWholeHour =
        currentMinute >= 30 ? currentHour + 2 : currentHour + 1;

      const addDeliveryTime = (hour) => {
        return isDelivery
          ? hour + restoranWorkData[0].timeForDeliveryExtraHours
          : hour;
      };

      const timeIntervals = [];
      for (
        let hour = addDeliveryTime(nextWholeHour);
        hour <= restoranWorkData[0].workEndTime;
        hour++
      ) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour.toString().padStart(2, "0");
          const formattedMinute = minute.toString().padStart(2, "0");
          timeIntervals.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return timeIntervals;
    } else {
      const allTimeIntervals = [];
      for (let hour = 10; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour.toString().padStart(2, "0");
          const formattedMinute = minute.toString().padStart(2, "0");
          allTimeIntervals.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return allTimeIntervals;
    }
  };

  const timeIntervals = generateTimeIntervals();

  return (
    <Modal animationType="fade" transparent={true} visible={openTime}>
      <BlurView style={styles.blur} tint="light" intensity={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {timeIntervals.length === 0 ? (
              <>
                <Text
                  style={
                    {
                      color: COLORS.darknessGray,
                      ...FONTS.h3,
                      padding: 0,
                    } as StyleProp<TextStyle>
                  }
                >
                  Oleme täna suletud, palun valige mõni muu päev
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    onSelectTime("");
                    setOpenDate(true);
                  }}
                  style={styles.closeButton}
                >
                  <Text
                    style={
                      {
                        color: COLORS.darknessGray,
                        ...FONTS.h3,
                        padding: 0,
                      } as StyleProp<TextStyle>
                    }
                  >
                    VALI PÄEV
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              timeIntervals.map((time, index) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => onSelectTime(time)}
                  style={styles.timeButton}
                >
                  <Text
                    style={
                      {
                        color: COLORS.darknessGray,
                        ...FONTS.h3,
                        padding: 0,
                      } as StyleProp<TextStyle>
                    }
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",

    backgroundColor: COLORS.yellow,
    marginTop: 280,
    padding: 50,
  },
  timeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    color: COLORS.red,
  },

  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 30,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    marginLeft: 70,
  },
});

export default Time;
