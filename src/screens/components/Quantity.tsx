import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

interface QuantityPickerProps {
  min: number;
  max: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  min,
  max,
  quantity,
  onQuantityChange,
}) => {
  const [value, setValue] = useState(quantity);
  const [disableDec, setDisableDec] = useState(quantity <= min);
  const [disableInc, setDisableInc] = useState(quantity >= max);

  useEffect(() => {
    setValue(quantity);
    setDisableDec(quantity <= min);
    setDisableInc(quantity >= max);
  }, [quantity, min, max]);

  const increment = () => {
    const newValue = value + 1;
    if (newValue <= max) {
      setValue(newValue);
      onQuantityChange(newValue);
      setDisableDec(false);
    }
    if (newValue === max) {
      setDisableInc(true);
    }
  };

  const decrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      setValue(newValue);
      onQuantityChange(newValue);
      setDisableInc(false);
    } else {
      setValue(min);
      setDisableDec(true);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity
        style={{
          margin: 5,
          borderRadius: 10,
          backgroundColor: disableDec && COLORS.gray,
        }}
        onPress={decrement}
        disabled={disableDec}
      >
        <Text
          style={
            {
              paddingHorizontal: 6,
              color: COLORS.darknessGray,
              fontSize: SIZES.h3,
              ...FONTS.h3,
            } as StyleProp<TextStyle>
          }
        >
          -
        </Text>
      </TouchableOpacity>
      <Text
        style={
          {
            marginHorizontal: 13,
            fontSize: SIZES.h2,
            ...FONTS.h3,
          } as StyleProp<TextStyle>
        }
      >
        {value}
      </Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 6,
          margin: 5,
          borderRadius: 10,
          backgroundColor: disableDec && COLORS.gray,
        }}
        onPress={increment}
        disabled={disableInc}
      >
        <Text
          style={
            {
              color: COLORS.darknessGray,
              fontSize: SIZES.h3,
              marginBottom: 1,
              ...FONTS.h3,
            } as StyleProp<TextStyle>
          }
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityPicker;
