import React, { useState, useEffect } from "react";
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
import OrderConfirmationModal from "./delivery/OrderConfirmationModal";

import Forgot from "./forgot/Forgot";

export default function Cart({
  quantity,
  cartData,
  setCartData,
  selectedItem,
  setSelectedMenu,
}) {
  const [showAddToCartModal, setShowCartModal] = useState(false);
  const [cartQuantities, setCartQuantities] = useState({});
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  const [showMissingLisadSection, setShowMissingLisadSection] = useState(true);

  // Callback function to update cart quantities
  const updateCartQuantities = (itemId, newQuantity) => {
    setCartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
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
    // Check if any lisad item is missing in the cart
    const missingLisadItems = lisad.filter(
      (item) => !cartData.some((cartItem) => cartItem.id === item.id)
    );

    // Return an array of missing item names
    const missingItemNames = missingLisadItems.map((item) => item.name);

    return {
      showButton: missingItemNames.length > 0,
      missingItemNames: missingItemNames.join(", "), // Join the names for display
    };
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: -316,
          right: 25,
        }}
      >
        <TouchableOpacity onPress={() => setShowCartModal(true)}>
          <Avatar source={images.cart} size={40} />
        </TouchableOpacity>
        <Badge
          value={formatPrice(calculateTotal())}
          containerStyle={{ position: "absolute", top: 10, right: 35 }}
          badgeStyle={{ backgroundColor: COLORS.lightGray }}
          textStyle={{ color: COLORS.darkGray }}
        />
      </View>
      <TouchableOpacity
        style={styles.absolute}
        onPress={() => {
          setShowCartModal(false);
        }}
      ></TouchableOpacity>

      {/* Cart Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddToCartModal}
      >
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
              {/* {lisad.map((item, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 8 }}
                >
                  <QuantityPicker
                    quantity={cartQuantities[item.id] || 0}
                    min={0}
                    max={99}
                    onQuantityChange={(newQuantity) =>
                      updateCartQuantities(item.id, newQuantity)
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
                    {item.name} -{" "}
                    {formatPrice(
                      item.numericPrice * (cartQuantities[item.id] || 0)
                    )}
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
              ))} */}
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

                          // <>
                          //   <Text
                          //     style={
                          //       {
                          //         backgroundColor: COLORS.yellow,
                          //         padding: 10,
                          //         // marginBottom: 10,

                          //         color: COLORS.black,
                          //         ...FONTS.h5,
                          //       } as StyleProp<TextStyle>
                          //     }
                          //   >
                          //     <Text>
                          //       Kas teil on vaja{" "}
                          //       {shouldShowLisadButton().missingItemNames}?
                          //     </Text>
                          //   </Text>
                          //   <View style={{ flexDirection: "row" }}>
                          //     <TouchableOpacity
                          //       style={{
                          //         marginLeft: 0,
                          //         backgroundColor: COLORS.gray,
                          //         padding: 10,
                          //       }}
                          //       onPress={() => {
                          //         setShowMissingLisadSection(false);
                          //       }}
                          //     >
                          //       <Text
                          //         style={
                          //           {
                          //             color: COLORS.black,
                          //             ...FONTS.h5,
                          //           } as StyleProp<TextStyle>
                          //         }
                          //       >
                          //         Ei!
                          //       </Text>
                          //     </TouchableOpacity>
                          //     <TouchableOpacity
                          //       style={{
                          //         marginLeft: 250,

                          //         backgroundColor: COLORS.gray,
                          //         padding: 10,
                          //       }}
                          //       onPress={() => {
                          //         forgotLisad();
                          //       }}
                          //     >
                          //       <Text
                          //         style={
                          //           {
                          //             color: COLORS.black,
                          //             ...FONTS.h5,
                          //           } as StyleProp<TextStyle>
                          //         }
                          //       >
                          //         Jah!
                          //       </Text>
                          //     </TouchableOpacity>
                          //   </View>
                          // </>
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
                    Tagasi menüüsse
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
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
                    Menüüs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonConfirm}
                  onPress={() => {
                    // order logic
                    // setShowCartModal(false);
                    setShowOrderConfirmationModal(true);
                  }}
                >
                  {showOrderConfirmationModal && (
                    <OrderConfirmationModal
                      cartData={cartData}
                      onClose={() => setShowOrderConfirmationModal(false)}
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
  buttonConfirm: {
    marginTop: 20,
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 180, 37, 0.58)",
    borderRadius: 16,
  },
  shopButton: {
    marginTop: 20,
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
