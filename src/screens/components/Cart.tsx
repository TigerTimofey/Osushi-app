import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextStyle,
  StyleProp,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Avatar, Badge } from "@rneui/themed";
import { COLORS, SIZES, FONTS, images } from "../../constants";
import QuantityPicker from "./Quantity";
import { lisad } from "../../constants/menu/menuData";
import OrderConfirmationModal from "./takeawayOption/OrderConfirmationModal";

import Forgot from "./forgot/Forgot";
import restoranWorkData from "../../constants/menu/timeStatesData";

export default function Cart({
  cartData,
  setCartData,
  setSelectedMenu,
  showCartModal,
  setShowCartModal,
}) {
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    React.useState(false);
  const [showMissingLisadSection, setShowMissingLisadSection] =
    React.useState(true);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: restoranWorkData[0].countryCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const calculateTotal = () => {
    return cartData.reduce(
      (total: any, item: any) => total + item.totalPrice,
      0
    );
  };
  const totalAmount = calculateTotal();
  const removeItem = (index) => {
    const updatedCartData = [...cartData];
    updatedCartData.splice(index, 1);
    setCartData(updatedCartData);
  };
  const updateCartItemQuantity = (index, newQuantity) => {
    const updatedCartData = [...cartData];

    const item = updatedCartData[index];

    const totalPrice = item.numericPrice * newQuantity;

    updatedCartData[index] = {
      ...item,
      quantity: newQuantity,
      totalPrice: totalPrice,
    };

    setCartData(updatedCartData);
  };
  const forgotLisad = () => {
    setShowCartModal(false);
    setSelectedMenu(lisad);
  };
  const shouldShowLisadButton = () => {
    const missingLisadItems = lisad.filter(
      (item) => !cartData.some((cartItem) => cartItem.id === item.id)
    );
    const missingItemNames = missingLisadItems.map((item) => item.name);
    return {
      showButton: missingItemNames.length > 0,
      missingItemNames: missingItemNames.join(", "),
    };
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: -312,
          right: 25,
        }}
      >
        <TouchableOpacity onPress={() => setShowCartModal(true)}>
          <Avatar source={images.cart} size={40} />

          <Badge
            value={formatPrice(calculateTotal())}
            containerStyle={{
              position: "absolute",
              top: 10,
              right: 35,
              width: 60,
            }}
            badgeStyle={{ backgroundColor: COLORS.lightGray }}
            textStyle={{ color: COLORS.darkGray }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.absolute}
        onPress={() => {
          setShowCartModal(false);
        }}
      ></TouchableOpacity>

      {/* Cart Modal */}
      <Modal animationType="slide" transparent={true} visible={showCartModal}>
        <BlurView style={styles.blur} tint="light" intensity={20}>
          <TouchableOpacity
            style={styles.absolute}
            onPress={() => {
              setShowCartModal(false);
            }}
          ></TouchableOpacity>
          {/* Modal content */}
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
            <TouchableOpacity
              style={[styles.buttonBack, styles.absoluteChoose]}
              onPress={() => setShowCartModal(false)}
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

            <View style={{ display: "flex", margin: 20 }}>
              {cartData.map((item, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 8 }}
                >
                  <QuantityPicker
                    quantity={item.quantity || 0}
                    min={1}
                    max={99}
                    onQuantityChange={(newQuantity) =>
                      updateCartItemQuantity(index, newQuantity)
                    }
                  />
                  <Text
                    style={
                      {
                        marginTop: 4,
                        marginLeft: 10,
                        color: COLORS.black,
                        ...FONTS.h4,
                      } as StyleProp<TextStyle>
                    }
                  >
                    {item.name} - {formatPrice(item.totalPrice)}
                  </Text>

                  <TouchableOpacity onPress={() => removeItem(index)}>
                    <Text
                      style={
                        {
                          marginLeft: 5,
                          marginTop: 10,
                          color: COLORS.red,
                          ...FONTS.h3,
                        } as StyleProp<TextStyle>
                      }
                    >
                      <Image
                        source={images.x}
                        style={{
                          width: 15,
                          height: 15,
                        }}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                  marginHorizontal: SIZES.padding,
                }}
              >
                <View>
                  <Text
                    style={
                      {
                        marginBottom: 20,
                        color: COLORS.black,
                        ...FONTS.h2,
                      } as StyleProp<TextStyle>
                    }
                  >
                    {totalAmount === 0 ? (
                      <Text>Ostukorv on tühi</Text>
                    ) : (
                      <Text>KOKKU: {formatPrice(calculateTotal())}</Text>
                    )}
                  </Text>
                  {shouldShowLisadButton().showButton &&
                    showMissingLisadSection && (
                      <View>
                        {totalAmount === 0 ? (
                          <Text></Text>
                        ) : (
                          <Forgot
                            forgotLisad={forgotLisad}
                            shouldShowLisadButton={shouldShowLisadButton}
                            setShowMissingLisadSection={
                              setShowMissingLisadSection
                            }
                          />
                        )}
                      </View>
                    )}
                </View>
              </View>
            </View>
            {totalAmount === 0 ? (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.shopButton}
                  onPress={() => {
                    setShowCartModal(false);
                  }}
                >
                  <Text
                    style={
                      {
                        color: COLORS.white,
                        ...FONTS.h3,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Menüüsse
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.buttonConfirm}
                  onPress={() => {
                    setShowOrderConfirmationModal(true);
                  }}
                >
                  {showOrderConfirmationModal && (
                    <OrderConfirmationModal
                      cartData={cartData}
                      setCartData={setCartData}
                      onClose={() => setShowOrderConfirmationModal(false)}
                      setShowOrderConfirmationModal={
                        setShowOrderConfirmationModal
                      }
                      showCartModal={showCartModal}
                      setShowCartModal={setShowCartModal}
                    />
                  )}
                  <Text
                    style={
                      {
                        color: COLORS.white,
                        ...FONTS.h3,
                      } as StyleProp<TextStyle>
                    }
                  >
                    Kinnita tellimus
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  absoluteChoose: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
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
    marginBottom: 20,
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
  },
  shopButton: {
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.red,
    borderRadius: 16,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
