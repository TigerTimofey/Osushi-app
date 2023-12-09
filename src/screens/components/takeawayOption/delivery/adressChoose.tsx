// Date.js
import React from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextStyle,
  StyleProp,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { BlurView } from "expo-blur";
import { COLORS, SIZES, FONTS, images } from "../../../../constants";
import restoranWorkData from "../../../../constants/menu/timeStatesData";

const AdressChooose = ({
  adressChooose,
  setAdressChooose,
  handlePriceForDelivery,
  setUserCity,
  userClicked,
  setUserAdress,
  userAdress,
  userApartment,
  userCity,
  formatPrice,
  distancePrice,
  setUserApartment,
}) => {
  const [showCityDropdown, setShowCityDropdown] = React.useState(true);
  const countries = ["Tallinn", "Maardu", "Muuga"];
  return (
    <Modal animationType="fade" transparent={true} visible={adressChooose}>
      <BlurView style={styles.blur} tint="light" intensity={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.infoText}>AADRESSI VALIMINE</Text>
              {showCityDropdown ? (
                <>
                  <TouchableOpacity
                    style={[styles.buttonBack, styles.absolute]}
                    onPress={() => setAdressChooose(false)}
                  >
                    <View>
                      <Image
                        source={images.back}
                        resizeMode="contain"
                        style={{
                          width: 40,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
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
                      setShowCityDropdown(false);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.buttonBack, styles.absolute]}
                    onPress={() => {
                      setShowCityDropdown(true);
                      setUserAdress("");
                      setUserApartment("");
                    }}
                  >
                    <View>
                      <Image
                        source={images.back}
                        resizeMode="contain"
                        style={{
                          width: 40,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.inputAdress}
                    placeholder="Aadress"
                    placeholderTextColor={COLORS.darknessGray}
                    textAlign="center"
                    value={userAdress}
                    onChangeText={(text) => setUserAdress(text)}
                  />
                  <TextInput
                    style={styles.inputApartment}
                    placeholder="Korter"
                    placeholderTextColor={COLORS.darknessGray}
                    textAlign="center"
                    value={userApartment}
                    onChangeText={(text) => setUserApartment(text)}
                  />
                </>
              )}
            </View>

            {userCity && userAdress && userApartment && (
              <View style={styles.containerGetPrice}>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    handlePriceForDelivery();
                  }}
                  onPress={() => {
                    setAdressChooose(false);
                    handlePriceForDelivery();
                  }}
                >
                  <Text
                    style={
                      [
                        styles.buttonConfirm,
                        {
                          padding: 6,
                        },
                      ] as StyleProp<TextStyle>
                    }
                  >
                    SAADA TARNEHIND
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </ScrollView>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  infoText: {
    position: "absolute",
    top: -10,
    right: -10,
    color: COLORS.darknessGray,
    opacity: 0.7,

    ...FONTS.h1,
  },
  absolute: {
    position: "absolute",
    top: -50,
    right: 270,
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
  buttonConfirm: {
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
    bottom: 5,
    right: 25,
    minWidth: 150,

    marginTop: 60,
    color: COLORS.white,
    ...FONTS.h2,
  },
  formContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    height: 150,
  },

  inputCity: {
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    width: 200,
    height: 40,
  },
  inputCityText: {
    color: COLORS.darknessGray,
    fontSize: SIZES.h3,
  },
  dropdownCity: {
    fontSize: 14,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    color: COLORS.darknessGray,
  },
  inputAdress: {
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 10,
    fontSize: SIZES.h3,
    marginRight: 50,
    width: 200,
  },
  inputApartment: {
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 10,
    marginRight: -15,
    fontSize: SIZES.h3,

    width: 85,
  },
  containerGetPrice: {
    position: "absolute",
    top: 145,
    left: 110,
    alignItems: "center",
    // marginVertical: 15,
  },

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
export default AdressChooose;
