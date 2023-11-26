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

export default function Cart({
  quantity,
  cartData,
  setCartData,
  selectedItem,
}) {
  const [showAddToCartModal, setShowCartModal] = useState(false);
  const [cartQuantities, setCartQuantities] = useState({});

  // ... (existing functions)

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

    if (index < 0 || index >= updatedCartData.length) {
      console.error("Invalid index:", index);
      return;
    }

    const item = updatedCartData[index];

    if (!item || typeof item.numericPrice !== "number") {
      console.error("Invalid item or numericPrice:", item);
      return;
    }

    const totalPrice = item.numericPrice * newQuantity;

    updatedCartData[index] = {
      ...item,
      quantity: newQuantity,
      totalPrice: totalPrice,
    };

    setCartData(updatedCartData);
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
              maxHeight: 700,
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
              {lisad.map((item, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 8 }}
                >
                  <QuantityPicker
                    quantity={cartQuantities[item.id] || 0}
                    min={1}
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
              ))}
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
                    KOKKU: {formatPrice(calculateTotal())}
                  </Text>
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
