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

const DateComponent = ({ openDate, onSelectDate }) => {
  const generateDateOptions = () => {
    const currentDate = new Date();
    const dateOptions = [];

    let startDay = 0;

    if (isTimeBetween22And00()) {
      startDay = 1;
    }

    for (let i = startDay; i < restoranWorkData[0].preOrderDays; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      const formattedDate = `${String(nextDate.getDate()).padStart(
        2,
        "0"
      )}.${String(nextDate.getMonth() + 1).padStart(2, "0")}.${String(
        nextDate.getFullYear()
      ).slice(2)}`;

      const isToday = nextDate.toDateString() === currentDate.toDateString();
      dateOptions.push({
        date: formattedDate,
        isToday: isToday,
      });
    }

    return dateOptions;
  };

  const isTimeBetween22And00 = () => {
    const currentHour = new Date().getHours();
    return (
      currentHour >= restoranWorkData[0].closeForOrderTimeStart ||
      currentHour < restoranWorkData[0].closeForOrderTimeEnd
    );
  };

  const dateOptions = generateDateOptions();

  return (
    <Modal animationType="fade" transparent={true} visible={openDate}>
      <BlurView style={styles.blur} tint="light" intensity={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {dateOptions.map((option, index) => (
              <TouchableOpacity
                key={option.date}
                onPress={() => onSelectDate(option.date)}
                style={styles.dateButton}
              >
                <Text style={[styles.dateButtonText, option.isToday]}>
                  {option.isToday ? "TÄNA" : option.date}
                </Text>
              </TouchableOpacity>
            ))}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.yellow,
    marginTop: 480,
    padding: 50,
  },
  dateButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 30,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  dateButtonText: {
    padding: 0,
    color: COLORS.darknessGray,
    ...FONTS.h3,
  },

  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DateComponent;
