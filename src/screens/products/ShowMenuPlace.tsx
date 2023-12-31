import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextStyle,
  StyleProp,
} from "react-native";
import { BlurView } from "expo-blur";
import Cart from "../components/Cart";
import QuantityPicker from "../components/Quantity";

import { COLORS, SIZES, FONTS } from "../../constants";
import restoranWorkData from "../../constants/menu/timeStatesData";

const ShowMenuPlace = ({
  selectedMenu,
  setSelectedMenu,
  cartData,
  setCartData,
  itemQuantities,
  setItemQuantities,
}) => {
  const flatListRef = React.useRef(null);

  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [selectedMenu]);

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showItemCartModal, setShowItemCartModal] = React.useState(false);
  const [showCartModal, setShowCartModal] = React.useState(false);

  React.useEffect(() => {
    if (selectedMenu) {
      setItemQuantities(
        selectedMenu.reduce((quantities: number, item: any) => {
          quantities[item.id] = 1;
          return quantities;
        }, {})
      );
    }
  }, [selectedMenu]);

  const handleQuantityChange = (newQuantity, itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };
  const handleAddToCart = () => {
    if (selectedItem) {
      const updatedCartData = [...cartData];

      const existingCartItemIndex = updatedCartData.findIndex(
        (cartItem) => cartItem.id === selectedItem.id
      );

      const newQuantity = itemQuantities[selectedItem.id] || 0;
      const totalPrice = selectedItem.numericPrice * newQuantity;

      if (existingCartItemIndex !== -1) {
        const existingCartItem = updatedCartData[existingCartItemIndex];
        existingCartItem.quantity = newQuantity;
        existingCartItem.totalPrice = totalPrice;
      } else {
        const cartItem = {
          id: selectedItem.id,
          name: selectedItem.name,
          numericPrice: selectedItem.numericPrice,
          totalPrice: totalPrice,
          quantity: newQuantity,
        };

        updatedCartData.push(cartItem);
      }

      setCartData(updatedCartData);
      setShowItemCartModal(false);
    }
  };
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: restoranWorkData[0].countryCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  function renderRecentSearches(item, index) {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={() => {
          setSelectedItem(item);
          setShowItemCartModal(true);
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={item.img}
            resizeMode="contain"
            style={{
              width: 290,
              height: 140,
              marginLeft: 80,
            }}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            marginLeft: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={
              {
                color: COLORS.darknessGray,
                ...FONTS.h3,
              } as StyleProp<TextStyle>
            }
          >
            {item.name}
          </Text>

          <Text
            style={
              { color: COLORS.darkGray, ...FONTS.h4 } as StyleProp<TextStyle>
            }
          >
            {formatPrice(item.numericPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View>
        <Cart
          cartData={cartData}
          setCartData={setCartData}
          setSelectedMenu={setSelectedMenu}
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
        />
      </View>
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            marginTop: SIZES.padding,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            marginHorizontal: 7,
            backgroundColor: COLORS.white,
          },
          style.recentSearchShadow,
        ]}
      >
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={selectedMenu}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderRecentSearches(item, index)}
          />
        </View>
      </View>

      {/* Modal */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showItemCartModal}
        >
          <BlurView style={style.blur} tint="light" intensity={20}>
            <TouchableOpacity
              style={style.absolute}
              onPress={() => {
                setSelectedItem(null);
                setShowItemCartModal(false);
              }}
            ></TouchableOpacity>
            {/* Modal content */}
            <View
              style={{
                borderRadius: 10,
                justifyContent: "center",
                width: "85%",
                backgroundColor: selectedItem.bgColor,
              }}
            >
              <View>
                <Image
                  source={selectedItem.img}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: 300,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={
                    {
                      marginHorizontal: SIZES.padding,
                      color: COLORS.black,
                      ...FONTS.h2,
                    } as StyleProp<TextStyle>
                  }
                >
                  {selectedItem.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.base / 2,
                    marginHorizontal: SIZES.padding,
                    color: COLORS.black,
                    ...FONTS.body4,
                  }}
                >
                  {selectedItem.type}
                </Text>
                <Text
                  style={
                    {
                      marginTop: SIZES.radius,
                      marginHorizontal: SIZES.padding,
                      color: COLORS.black,
                      ...FONTS.h1,
                    } as StyleProp<TextStyle>
                  }
                >
                  {formatPrice(
                    selectedItem.numericPrice *
                      itemQuantities[selectedItem.id] || 0
                  )}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                  }}
                >
                  <View>
                    <QuantityPicker
                      quantity={itemQuantities[selectedItem.id] || 0}
                      min={1}
                      max={99}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(newQuantity, selectedItem.id)
                      }
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: SIZES.base,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
                onPress={handleAddToCart}
              >
                <Text style={{ color: COLORS.white, ...FONTS.largeTitleBold }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      )}
    </>
  );
};
const style = StyleSheet.create({
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

  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ShowMenuPlace;
