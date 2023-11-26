import React from "react";

import ShowMenuPlace from "../products/ShowMenuPlace";
import Cart from "../components/Cart";

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
  Button,
} from "react-native";
import { BlurView } from "expo-blur";
import { images, COLORS, SIZES, FONTS } from "../../constants";
import campaignData from "../../constants/menu/campaignData";
import {
  assortii,
  uraMaki,
  nigiri,
  hosoMaki,
  hotMaki,
  tempuraMaki,
  supisted,
  joogid,
  lisad,
} from "../../constants/menu/menuData";

const CampaignSlider = () => {
  const [selectedMenu, setSelectedMenu] = React.useState(assortii);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [showAddToCartModal, setShowAddToCartModal] = React.useState(false);
  const [featured, setFeatured] = React.useState(campaignData);

  const [cartData, setCartData] = React.useState([]);
  const [itemQuantities, setItemQuantities] = React.useState({});

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const menuItems = [
    { menuType: assortii, label: "Assortii" },
    { menuType: hotMaki, label: "Küpsetatud" },
    { menuType: tempuraMaki, label: "Tempurad" },
    { menuType: uraMaki, label: "Esindus" },
    { menuType: hosoMaki, label: "Hoso" },
    { menuType: nigiri, label: "Nigiri" },
    { menuType: supisted, label: "Supisted" },
    { menuType: joogid, label: "Joogid" },
    { menuType: lisad, label: "Lisad" },

    // Add more menu items as needed
  ];

  // const [quantity, setQuantity] = React.useState(0);
  const handleAddToCart = () => {
    if (selectedItem) {
      const updatedCartData = [...cartData];

      const existingCartItemIndex = updatedCartData.findIndex(
        (cartItem) => cartItem.id === selectedItem.id
      );

      const newQuantity = itemQuantities[selectedItem.id] || 1;
      const totalPrice = selectedItem.numericPrice;

      if (existingCartItemIndex !== -1) {
        // Если товар уже есть в корзине, обновим его количество
      } else {
        // Если товара нет в корзине, добавим новый элемент
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
      setShowAddToCartModal(false);
    }
  };

  function renderFeaturedItems(item, index) {
    return (
      <TouchableOpacity
        style={{
          height: 200,
          width: 200,
          justifyContent: "center",
          marginHorizontal: SIZES.base,
          paddingBottom: 20,
        }}
        onPress={() => {
          setSelectedItem(item);
          setShowAddToCartModal(true);
        }}
      >
        <Text
          style={{ color: COLORS.gray, ...FONTS.h5 } as StyleProp<TextStyle>}
        >
          {item.type}
        </Text>
        <View
          style={[
            {
              flex: 1,
              justifyContent: "flex-end",
              marginTop: SIZES.base,
              borderRadius: 10,
              marginRight: SIZES.padding,
              backgroundColor: item.bgColor,
              paddingRight: SIZES.padding,
              paddingBottom: SIZES.radius,
            },
            style.featuredShadow,
          ]}
        >
          <View style={style.featuredDetails}>
            <Text
              style={
                {
                  color: COLORS.white,
                  ...FONTS.h3,
                } as StyleProp<TextStyle>
              }
            >
              {item.name}
            </Text>
          </View>
        </View>
        <Image
          source={item.img}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 38,
            right: 32,
            width: "80%",
            height: "55%",
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={style.container}>
      {/* Featured */}
      <View style={{ height: 200, marginTop: SIZES.radius }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featured}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderFeaturedItems(item, index)}
        />
      </View>

      {/* Recent Searches */}

      <View style={style.buttonContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                setSelectedMenu(item.menuType);
              }}
            >
              <Text
                style={
                  {
                    padding: 7,
                    backgroundColor: COLORS.lightGray,
                    color: COLORS.darkGray,
                    ...FONTS.h5,
                    borderRadius: 10,
                  } as StyleProp<TextStyle>
                }
              >
                {item.label}
              </Text>
              {/* <Text style={style.textButton}> {item.label}</Text> */}
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <Cart quantity={quantity} /> */}
      <ShowMenuPlace
        selectedMenu={selectedMenu}
        cartData={cartData}
        setCartData={setCartData}
        itemQuantities={itemQuantities}
        setItemQuantities={setItemQuantities}
      />

      {/* Modal */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddToCartModal}
        >
          <BlurView style={style.blur} tint="light" intensity={20}>
            <TouchableOpacity
              style={style.absolute}
              onPress={() => {
                setSelectedItem(null);
                setSelectedSize("");
                setShowAddToCartModal(false);
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
                  // resizeMode="contain"
                  style={{
                    width: "100%",
                    height: 300,
                    marginBottom: 10,
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
                      color: COLORS.white,
                      ...FONTS.h2,
                    } as StyleProp<TextStyle>
                  }
                >
                  {selectedItem.name}
                </Text>
                <Text
                  style={
                    {
                      textAlign: "center",
                      marginTop: SIZES.base / 2,
                      marginHorizontal: SIZES.padding,
                      color: COLORS.white,
                      ...FONTS.h3,
                    } as StyleProp<TextStyle>
                  }
                >
                  {selectedItem.info}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.base / 2,
                    marginHorizontal: SIZES.padding,
                    color: COLORS.white,
                    ...FONTS.body5,
                  }}
                >
                  {selectedItem?.extraInfo}
                </Text>
                <Text
                  style={
                    {
                      marginTop: SIZES.radius,
                      marginHorizontal: SIZES.padding,
                      color: COLORS.white,
                      ...FONTS.h1,
                    } as StyleProp<TextStyle>
                  }
                >
                  {formatPrice(selectedItem?.numericPrice)}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                  }}
                >
                  <View></View>
                </View>
              </View>
              {selectedItem.cost !== false && (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: SIZES.base,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  onPress={() => {
                    setSelectedItem(null);
                    setSelectedSize("");
                    setShowAddToCartModal(false);
                    handleAddToCart();
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.largeTitleBold,
                    }}
                  >
                    Add To Cart
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </BlurView>
        </Modal>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
    padding: 0,
  },
  button: {
    borderRadius: 50,
    elevation: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 3,
  },

  featuredShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  featuredDetails: {
    // position: "absolute",
    // top: 130,
    // left: 45,
    flexDirection: "column",
    display: "flex",
    textAlign: "center",
    marginLeft: 45,
    marginBottom: 8,
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
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CampaignSlider;
