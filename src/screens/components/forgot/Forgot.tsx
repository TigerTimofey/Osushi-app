import React from "react";
import {
  StyleSheet,
  Image,
  Modal,
  TextStyle,
  StyleProp,
  ScrollView,
} from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES, images } from "../../../constants";
import { BlurView } from "expo-blur";

const Forgot = ({
  setShowMissingLisadSection,
  shouldShowLisadButton,
  forgotLisad,
}) => {
  // Your modal content here

  return (
    <View>
      {/* Modal content */}
      {/* ... */}
      <TouchableOpacity onPress={() => console.log("test")}>
        <Modal animationType="slide" transparent={true}>
          {/* Modal content */}
          <BlurView style={styles.blur} tint="light" intensity={20}>
            <ScrollView
              style={{
                marginTop: 140,

                borderRadius: 10,
                width: 380,
                backgroundColor: COLORS.yellow,
                maxHeight: 280,
              }}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <Image
                  source={images.logoQuestion}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                    margin: 10,
                    marginLeft: 175,
                    alignItems: "center",
                  }}
                />
              </View>

              <Text
                style={
                  {
                    backgroundColor: COLORS.yellow,
                    padding: 10,
                    marginBottom: 15,

                    color: COLORS.darknessGray,
                    ...FONTS.h2,
                  } as StyleProp<TextStyle>
                }
              >
                <Text style={{ textAlign: "center" }}>
                  Kas soovite tellimusele lisada{" "}
                  {shouldShowLisadButton().missingItemNames}?
                </Text>
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 115,
                    borderRadius: 12,
                    backgroundColor: COLORS.gray,
                    padding: 10,
                  }}
                  onPress={() => {
                    setShowMissingLisadSection(false);
                  }}
                >
                  <Text
                    style={
                      {
                        marginHorizontal: 11,
                        color: COLORS.darknessGray,

                        ...FONTS.h2,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Ei
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 50,
                    borderRadius: 12,
                    backgroundColor: COLORS.gray,
                    padding: 10,
                  }}
                  onPress={() => {
                    forgotLisad();
                  }}
                >
                  <Text
                    style={
                      {
                        color: COLORS.darknessGray,
                        ...FONTS.h2,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Jah
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BlurView>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonConfirm: {
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
  },
  shopButton: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.red,
    borderRadius: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  closeButton: {
    marginTop: 20,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recentSearchShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  recentSearches: {
    width: "100%",
    transform: [{ rotateY: "180deg" }],
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Forgot;
