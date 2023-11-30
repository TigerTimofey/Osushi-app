import React from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
  View,
  Text,
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
}) => {
  const generateTimeIntervals = () => {
    if (formattedDate === selectedDate) {
      // Use existing logic if the dates are the same
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const nextWholeHour =
        currentMinute >= 30 ? currentHour + 2 : currentHour + 1;
      const timeIntervals = [];
      for (
        let hour = nextWholeHour;
        hour <= restoranWorkData[0].wordEndTime;
        hour++
      ) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (!(hour === 22 && minute === 30)) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            timeIntervals.push(`${formattedHour}:${formattedMinute}`);
          }
        }
      }
      return timeIntervals;
    } else {
      // If the dates are different, set time intervals between 10:00 and 22:00
      const timeIntervals = [];
      for (let hour = 10; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour.toString().padStart(2, "0");
          const formattedMinute = minute.toString().padStart(2, "0");
          timeIntervals.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return timeIntervals;
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
                <Text style={styles.noTimeText}>
                  Oleme täna suletud, palun valige mõni muu päev
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    onSelectTime("");
                    setOpenDate(true);
                  }}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>VALI PÄEV</Text>
                </TouchableOpacity>
              </>
            ) : (
              timeIntervals.map((time, index) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => onSelectTime(time)}
                  style={styles.timeButton}
                >
                  <Text style={styles.timeButtonText}>{time}</Text>
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
    marginTop: 350,
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
  timeButtonText: {
    color: COLORS.darknessGray,
    ...FONTS.h3,
    padding: 0,
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noTimeText: {
    color: COLORS.red,
    ...FONTS.h3,
    padding: 10,
    textAlign: "center",
    marginLeft: 30,
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
  closeButtonText: {
    color: COLORS.darknessGray,
    ...FONTS.h3,
    padding: 0,
  },
});

export default Time;
